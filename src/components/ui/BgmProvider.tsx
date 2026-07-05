"use client";

// 전역 배경음악 provider — 오디오 상태(재생/정지/트랙)를 context로 공유해
// 플로팅 컨트롤과 랜딩의 제니 브랜드 히어로가 같은 음악을 제어/반영한다.
// 서비스 로드 시 제니 곡 먼저 재생(자동재생 차단 시 첫 제스처에 시작).
// 리스닝/몸풀기/진단 등 자체 음원 경로에선 자동 음소거(TTS 충돌 방지).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export interface Track {
  id: string;
  by: string;
  label: string;
  src: string;
  emoji: string;
  grad: string;
}

export const TRACKS: Track[] = [
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

const MUTE_PREFIXES = ["/listening", "/lc-match", "/warmup", "/tts", "/diagnostic"];
const KEY = "toeic-bgm";
const VOLUME = 0.32;

interface BgmValue {
  ready: boolean;
  playing: boolean;
  muted: boolean;
  trackId: string;
  track: Track;
  /** 재생/정지 토글 */
  toggle: () => void;
  /** 트랙 선택(+재생) */
  setTrack: (id: string) => void;
}

const Ctx = createContext<BgmValue | null>(null);
export function useBgm() {
  return useContext(Ctx);
}

export default function BgmProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [trackId, setTrackId] = useState("jennie");
  const [playing, setPlaying] = useState(false);

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

  // 재생/정지 토글 (제스처 컨텍스트라 즉시 재생 가능)
  const toggle = useCallback(() => {
    if (muted) return;
    const el = audioRef.current;
    const next = !(enabled && playing);
    setEnabled(next);
    if (!el) return;
    if (next) {
      el.volume = VOLUME;
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [muted, enabled, playing]);

  const setTrack = useCallback(
    (id: string) => {
      setTrackId(id);
      setEnabled(true);
    },
    [],
  );

  const value: BgmValue = {
    ready,
    playing: playing && !muted,
    muted,
    trackId,
    track,
    toggle,
    setTrack,
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      <audio ref={audioRef} loop preload="none" className="hidden" />
      {ready && <FloatingControl />}
    </Ctx.Provider>
  );
}

/* ───────────────── 좌하단 플로팅 컨트롤 (명확한 재생/정지) ───────────────── */

function FloatingControl() {
  const bgm = useBgm()!;
  const [open, setOpen] = useState(false);
  const { playing, muted, track, toggle, setTrack } = bgm;

  return (
    <div className="fixed bottom-4 left-4 z-[60] pb-safe">
      {/* 트랙 선택 팝오버 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="mb-2 w-56 overflow-hidden rounded-2xl bg-neutral-900/95 p-2 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md"
          >
            <p className="px-2 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-white/40">
              배경음악 선택
            </p>
            {TRACKS.map((t) => {
              const active = t.id === track.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTrack(t.id);
                    setOpen(false);
                  }}
                  className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-left transition ${
                    active ? "text-white" : "text-white/70 hover:bg-white/[0.06]"
                  }`}
                >
                  {active && (
                    <span className={`absolute inset-0 rounded-xl bg-gradient-to-r ${t.grad} opacity-90`} />
                  )}
                  <span className="relative text-[18px]">{t.emoji}</span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold">{t.label}</span>
                    <span className={`block text-[11px] ${active ? "text-white/80" : "text-white/40"}`}>
                      {t.by}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 컨트롤 pill: [재생/정지] + [트랙칩→선택] */}
      <div className="flex items-center gap-1 rounded-full bg-neutral-900/95 p-1.5 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
        <button
          type="button"
          onClick={toggle}
          disabled={muted}
          aria-label={playing ? "음악 정지" : "음악 재생"}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition disabled:opacity-40 ${
            playing ? `bg-gradient-to-br ${track.grad}` : "bg-white/10 hover:bg-white/15"
          }`}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full px-2.5 py-1.5 pr-3 text-left text-white transition hover:bg-white/[0.06]"
        >
          <span className="text-[15px]">{track.emoji}</span>
          <span className="leading-tight">
            <span className="block text-[12px] font-bold">{track.label}</span>
            <span className="block text-[10px] text-white/45">
              {muted ? "학습 중 음소거" : playing ? "재생 중" : "일시정지"}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6.5" y="5" width="4" height="14" rx="1.4" />
      <rect x="13.5" y="5" width="4" height="14" rx="1.4" />
    </svg>
  );
}
