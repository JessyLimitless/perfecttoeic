"use client";

// 전역 배경음악 플레이어 — 서비스 로드 시 제니 곡 먼저 재생(자동재생 차단 시 첫 제스처에 시작),
// 록키 곡으로 전환 가능. 리스닝/몸풀기/진단 등 자체 음원이 있는 화면에선 자동 음소거(충돌 방지).
// layout에 한 번 마운트 → 라우트 전환에도 재생 유지(App Router가 layout을 유지).

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface Track {
  id: string;
  by: string;
  label: string;
  src: string;
  emoji: string;
  grad: string;
}

const TRACKS: Track[] = [
  {
    id: "jennie",
    by: "제니",
    label: "Like Jennie",
    src: "/music/jennie.mp3",
    emoji: "💗",
    grad: "from-fuchsia-500 to-rose-500",
  },
  {
    id: "rocky",
    by: "록키",
    label: "Gonna Fly Now",
    src: "/music/rocky.mp3",
    emoji: "🥊",
    grad: "from-amber-500 to-orange-600",
  },
];

/** 자체 음원(TTS)이 있어 배경음악을 자동 음소거할 경로들 */
const MUTE_PREFIXES = ["/listening", "/lc-match", "/warmup", "/tts", "/diagnostic"];

const KEY = "toeic-bgm";
const VOLUME = 0.32;

export default function BackgroundMusic() {
  const pathname = usePathname() || "/";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [trackId, setTrackId] = useState("jennie");
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);

  const track = TRACKS.find((t) => t.id === trackId) ?? TRACKS[0];
  const muted = MUTE_PREFIXES.some((p) => pathname.startsWith(p));

  // 설정 로드 (기본: 켜짐 · 제니)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw) as { enabled?: boolean; track?: string };
        setEnabled(p.enabled !== false);
        setTrackId(p.track === "rocky" ? "rocky" : "jennie");
      } else {
        setEnabled(true);
      }
    } catch {
      setEnabled(true);
    }
    setReady(true);
  }, []);

  // 설정 저장
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ enabled, track: trackId }));
    } catch {
      /* 무시 */
    }
  }, [enabled, trackId, ready]);

  const tryPlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = VOLUME;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  // 코어: 트랙 로드 + enabled·라우트에 따른 재생/정지
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !ready) return;
    if (el.dataset.track !== trackId) {
      el.src = track.src;
      el.dataset.track = trackId;
      el.load();
    }
    if (enabled && !muted) {
      tryPlay();
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [ready, enabled, muted, trackId, track.src, tryPlay]);

  // 자동재생 차단 대비 — 첫 사용자 제스처에 재생 시도
  useEffect(() => {
    if (!ready || !enabled || muted || playing) return;
    const onGesture = () => tryPlay();
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [ready, enabled, muted, playing, tryPlay]);

  const toggleEnabled = () => setEnabled((v) => !v);
  const pickTrack = (id: string) => {
    setTrackId(id);
    setEnabled(true);
  };

  if (!ready) return null;

  return (
    <>
      <audio ref={audioRef} loop preload="none" className="hidden" />

      <div className="fixed bottom-4 left-4 z-[60] pb-safe">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="mb-2 w-60 overflow-hidden rounded-2xl bg-neutral-900/95 p-3 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md"
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-white/40">
                  배경음악
                </span>
                <button
                  type="button"
                  onClick={toggleEnabled}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
                    enabled && playing
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {muted ? "학습 중 음소거" : enabled && playing ? "재생 중" : "꺼짐"}
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {TRACKS.map((t) => {
                  const active = t.id === trackId && enabled;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => pickTrack(t.id)}
                      className={`relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-left transition ${
                        active ? "text-white" : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="bgm-active"
                          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${t.grad} opacity-90`}
                          transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        />
                      )}
                      <span className="relative text-[18px]">{t.emoji}</span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-bold">{t.label}</span>
                        <span className={`block text-[11px] ${active ? "text-white/80" : "text-white/40"}`}>
                          {t.by}
                        </span>
                      </span>
                      {active && !muted && playing && <Equalizer />}
                    </button>
                  );
                })}
              </div>

              {muted && (
                <p className="mt-2 px-1 text-[11px] leading-snug text-white/40">
                  듣기·발음 학습 중엔 배경음악이 자동으로 꺼져요.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 플로팅 토글 버튼 */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.92 }}
          aria-label="배경음악"
          className={`relative grid h-12 w-12 place-items-center rounded-full text-white shadow-xl ring-1 ring-white/20 transition ${
            enabled && playing && !muted
              ? `bg-gradient-to-br ${track.grad}`
              : "bg-neutral-800"
          }`}
        >
          {enabled && playing && !muted ? (
            <Equalizer big />
          ) : (
            <span className="text-[18px]">{enabled ? "🎵" : "🔇"}</span>
          )}
          {/* 재생 중 은은한 펄스 링 */}
          {enabled && playing && !muted && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/40"
              animate={{ scale: [1, 1.25], opacity: [0.5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.button>
      </div>
    </>
  );
}

/** 재생 중 이퀄라이저 바 애니메이션 */
function Equalizer({ big = false }: { big?: boolean }) {
  const bars = big ? [0, 1, 2, 3] : [0, 1, 2];
  return (
    <span className={`relative flex items-end gap-[3px] ${big ? "h-4" : "h-3.5"}`}>
      {bars.map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-white"
          animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
          transition={{
            duration: 0.9 + i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
          style={{ height: "40%" }}
        />
      ))}
    </span>
  );
}
