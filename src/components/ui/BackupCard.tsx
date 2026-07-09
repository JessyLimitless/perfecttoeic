"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  backupItemCount,
  downloadBackup,
  getLastBackupAt,
  getPersistState,
  importBackup,
  peekBackup,
  readFileText,
  requestPersistentStorage,
  type BackupMeta,
  type PersistState,
} from "@/game/backup";

type Feedback = { kind: "ok" | "err"; text: string } | null;
type Pending = { text: string; meta: BackupMeta } | null;

const STALE_DAYS = 14;

function relTime(iso: string | null): string {
  if (!iso) return "아직 없음";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "아직 없음";
  const min = Math.floor((Date.now() - t) / 60000);
  if (min < 1) return "방금 전";
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}일 전`;
  return new Date(iso).toISOString().slice(0, 10);
}

function daysSince(iso: string | null): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / 86400000);
}

function fmtDate(iso: string): string {
  if (!iso) return "알 수 없음";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "알 수 없음";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/**
 * 기기 내 저장(localStorage) 기록을 파일로 백업/복원하는 카드.
 * 서버·계정 없이 이 기기(태블릿)에서만 동작한다. 개선 UX:
 *  - 마지막 백업 시각 노출 + 오래되면 넛지
 *  - 불러오기 전 확인 모달(파일 날짜·항목수 보여주고 덮어쓰기 확인) → 실수 덮어쓰기 방지
 */
export default function BackupCard() {
  const [mounted, setMounted] = useState(false);
  const [persist, setPersist] = useState<PersistState>("unsupported");
  const [count, setCount] = useState(0);
  const [lastAt, setLastAt] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [pending, setPending] = useState<Pending>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setCount(backupItemCount());
    setLastAt(getLastBackupAt());
    void getPersistState().then(setPersist);
  }, []);

  useEffect(() => {
    if (!pending) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPending(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pending]);

  if (!mounted) return null;

  function handleExport() {
    try {
      const n = downloadBackup();
      setLastAt(getLastBackupAt());
      setFeedback({
        kind: "ok",
        text: `백업 파일을 내려받았어요 (${n}개 항목). 이 태블릿의 다운로드 폴더에 저장됩니다.`,
      });
    } catch {
      setFeedback({ kind: "err", text: "내보내기에 실패했어요. 다시 시도해 주세요." });
    }
  }

  function doImport(text: string) {
    try {
      const { imported } = importBackup(text);
      setFeedback({
        kind: "ok",
        text: `복원 완료 (${imported}개 항목). 잠시 후 새로고침해 반영합니다…`,
      });
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      setFeedback({ kind: "err", text: err instanceof Error ? err.message : "복원에 실패했어요." });
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const text = await readFileText(file);
      const meta = peekBackup(text); // 형식 검증 + 미리보기(쓰지 않음)
      if (count === 0) {
        doImport(text); // 덮어쓸 기록이 없으면 바로 복원
      } else {
        setPending({ text, meta }); // 기록이 있으면 확인 모달
      }
    } catch (err) {
      setFeedback({ kind: "err", text: err instanceof Error ? err.message : "복원에 실패했어요." });
    }
  }

  async function handleEnablePersist() {
    const s = await requestPersistentStorage();
    setPersist(s);
    if (s === "persisted") {
      setFeedback({ kind: "ok", text: "영구 저장을 켰어요. 이제 자동 삭제로부터 보호됩니다." });
    } else if (s === "not-persisted") {
      setFeedback({
        kind: "err",
        text: "브라우저가 아직 영구 저장을 승인하지 않았어요. 홈 화면에 추가하거나 며칠 사용하면 승인될 수 있어요. 그동안 백업을 내려받아 두세요.",
      });
    }
  }

  const stale = count > 0 && (() => {
    const d = daysSince(lastAt);
    return d === null || d >= STALE_DAYS;
  })();

  const persistBadge =
    persist === "persisted"
      ? { dot: "bg-emerald-500", text: "🛡️ 영구 저장 켜짐 · 자동 삭제로부터 보호 중", tone: "text-emerald-700" }
      : persist === "not-persisted"
      ? { dot: "bg-amber-500", text: "이 기기에 저장 중 · 아래로 백업해 두면 안전해요", tone: "text-amber-700" }
      : { dot: "bg-neutral-400", text: "이 기기에 저장 중", tone: "text-neutral-500" };

  return (
    <div className="card-elevated relative overflow-hidden p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">기록 지키기 · BACKUP</p>
          <h3 className="mt-1 text-[17px] font-extrabold tracking-tight text-neutral-900 sm:text-[19px]">
            내 정복도, 이 태블릿에 안전하게
          </h3>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-neutral-500">
            진도는 서버가 아니라 <b>이 기기 안</b>에 저장돼요. 브라우저 데이터를 지우면
            사라질 수 있으니, 가끔 <b>백업 파일</b>로 내려받아 두면 언제든 되살릴 수 있어요.
          </p>
        </div>
        <span className="hidden shrink-0 text-3xl sm:block" aria-hidden>
          💾
        </span>
      </div>

      {/* 상태 배지 행 */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-neutral-50 px-3 py-1.5 text-[11.5px] font-semibold ring-1 ring-neutral-900/[0.05] ${persistBadge.tone}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${persistBadge.dot}`} />
          {persistBadge.text}
        </span>
        {persist === "not-persisted" && (
          <button
            type="button"
            onClick={handleEnablePersist}
            className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11.5px] font-bold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100"
          >
            영구 저장 켜기
          </button>
        )}
      </div>

      {/* 마지막 백업 + 넛지 */}
      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11.5px]">
        <span className="text-neutral-400">
          마지막 백업 <b className="font-bold text-neutral-600">{relTime(lastAt)}</b>
        </span>
        {stale && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-bold text-amber-700 ring-1 ring-amber-200">
            ⚠️ {lastAt ? "백업한 지 오래됐어요" : "아직 백업 전이에요"} — 지금 내려받으세요
          </span>
        )}
      </div>

      {/* 버튼 */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <motion.button
          type="button"
          onClick={handleExport}
          whileTap={{ scale: 0.97 }}
          className={`inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-[13.5px] font-bold text-white shadow-[0_10px_24px_-12px_rgba(16,185,129,0.8)] transition hover:shadow-[0_14px_28px_-12px_rgba(16,185,129,0.9)] ${
            stale ? "ring-2 ring-amber-300 ring-offset-1" : ""
          }`}
        >
          <span aria-hidden>📤</span> 백업 내보내기
        </motion.button>
        <motion.button
          type="button"
          onClick={() => fileRef.current?.click()}
          whileTap={{ scale: 0.97 }}
          className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-2xl bg-white text-[13.5px] font-bold text-neutral-700 ring-1 ring-neutral-200 transition hover:bg-neutral-50"
        >
          <span aria-hidden>📥</span> 백업 불러오기
        </motion.button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      <p className="mt-2.5 text-[11px] leading-relaxed text-neutral-400">
        현재 저장된 항목 {count}개 · 불러오면 이 기기의 기록을 백업 파일 내용으로 덮어씁니다.
      </p>

      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 rounded-xl px-3.5 py-2.5 text-[12px] font-medium leading-relaxed ${
            feedback.kind === "ok"
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
              : "bg-rose-50 text-rose-600 ring-1 ring-rose-100"
          }`}
        >
          {feedback.text}
        </motion.p>
      )}

      {/* 불러오기 확인 모달 */}
      {createPortal(
        <AnimatePresence>
          {pending && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setPending(null)}
                className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[3px]"
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="card-elevated relative w-full max-w-[21rem] overflow-hidden px-6 pb-6 pt-8 text-center"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400" />
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-2xl text-white shadow-[0_12px_28px_-10px_rgba(245,158,11,0.8)]">
                  📥
                </div>
                <h3 className="mt-4 text-[17px] font-black tracking-[-0.01em] text-neutral-900">
                  이 백업으로 복원할까요?
                </h3>
                <div className="mx-auto mt-3 max-w-[17rem] space-y-1.5 rounded-2xl bg-neutral-50 px-4 py-3 text-left text-[12.5px] ring-1 ring-neutral-900/[0.05]">
                  <div className="flex justify-between gap-3">
                    <span className="text-neutral-400">백업 시점</span>
                    <b className="text-neutral-700">{pending && fmtDate(pending.meta.exportedAt)}</b>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-neutral-400">담긴 항목</span>
                    <b className="text-neutral-700">{pending?.meta.keys}개</b>
                  </div>
                </div>
                <p className="mx-auto mt-3 max-w-[18rem] text-[12px] leading-relaxed text-neutral-500">
                  지금 이 기기의 기록(<b>{count}개 항목</b>)을 <b>덮어씁니다.</b> 되돌릴 수 없으니,
                  현재 진도가 더 최신이면 <b>먼저 내보내기</b>로 백업해 두세요.
                </p>
                <div className="mt-6 flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPending(null)}
                    className="min-h-[48px] flex-1 rounded-2xl text-[14px] font-bold text-neutral-600 ring-1 ring-neutral-200 transition hover:bg-neutral-50 active:scale-[0.98]"
                  >
                    취소
                  </button>
                  <motion.button
                    type="button"
                    onClick={() => {
                      const t = pending?.text;
                      setPending(null);
                      if (t) doImport(t);
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="min-h-[48px] flex-1 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-[14px] font-black text-white shadow-[0_12px_28px_-10px_rgba(245,158,11,0.75)] transition hover:shadow-[0_16px_32px_-10px_rgba(245,158,11,0.85)]"
                  >
                    덮어쓰고 복원
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
