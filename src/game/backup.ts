// 기기 내 저장(localStorage) 백업·복원 + 영구 저장 요청.
//
// ⚠️ 서버 통신 없음 — 전부 브라우저 안에서 처리한다. 내보낸 파일은 이 기기(태블릿)의
// 다운로드 폴더에만 저장되며 EC2/외부로 나가지 않는다. 태블릿 한 대만 쓰는 사용자가
// "브라우저 데이터 삭제/저장공간 정리로 진도가 날아가는" 유일한 위험을 막기 위한 장치.
//
// 대상: `toeic-` 접두사가 붙은 모든 localStorage 항목(정복도·리스닝 진행·몸풀기·암기·
// 순서·진단·모의고사·대결 아이덴티티·BGM 설정 등). 접두사로 스냅샷하므로 향후 새 키도
// 자동 포함된다.

const PREFIX = "toeic-";
const FORMAT = "perfecttoeic-backup";
const FORMAT_VERSION = 1;

// 백업 자체에 대한 로컬 기록(마지막 내보내기 시각). 진도가 아니라 부기용이라
// 스냅샷·항목수에서는 제외한다.
const META_KEY = "toeic-backup-meta-v1";

export interface BackupFile {
  format: string;
  version: number;
  exportedAt: string;
  app: string;
  keys: number;
  data: Record<string, string>;
}

/** 현재 기기의 모든 toeic-* localStorage 항목을 스냅샷한다. */
export function buildBackup(): BackupFile {
  const data: Record<string, string> = {};
  if (typeof window !== "undefined") {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (!k || !k.startsWith(PREFIX) || k === META_KEY) continue;
      const v = window.localStorage.getItem(k);
      if (v !== null) data[k] = v;
    }
  }
  return {
    format: FORMAT,
    version: FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    app: "perfecttoeic",
    keys: Object.keys(data).length,
    data,
  };
}

/** 백업된 항목이 몇 개인지(내보내기 전에 카드에 표시용). */
export function backupItemCount(): number {
  let n = 0;
  if (typeof window === "undefined") return 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k && k.startsWith(PREFIX) && k !== META_KEY) n++;
  }
  return n;
}

/** 마지막으로 백업을 내려받은 ISO 시각. 없으면 null. */
export function getLastBackupAt(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(META_KEY);
    if (!raw) return null;
    const m = JSON.parse(raw) as { lastExportAt?: unknown };
    return typeof m?.lastExportAt === "string" ? m.lastExportAt : null;
  } catch {
    return null;
  }
}

function markBackedUp() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      META_KEY,
      JSON.stringify({ lastExportAt: new Date().toISOString() }),
    );
  } catch {
    // 무시
  }
}

/** 백업을 파일로 내려받는다(이 기기 다운로드 폴더). 저장한 항목 수 반환. */
export function downloadBackup(): number {
  const backup = buildBackup();
  const json = JSON.stringify(backup, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `perfecttoeic-backup-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  markBackedUp();
  return backup.keys;
}

/** 백업 JSON을 파싱·검증한다. 형식이 아니면 throw. */
function parseValid(jsonText: string): BackupFile {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("파일을 읽을 수 없습니다. 올바른 백업 파일인지 확인하세요.");
  }
  const b = parsed as Partial<BackupFile>;
  if (
    !b ||
    typeof b !== "object" ||
    b.format !== FORMAT ||
    !b.data ||
    typeof b.data !== "object"
  ) {
    throw new Error("퍼펙토익 백업 파일이 아닙니다.");
  }
  return b as BackupFile;
}

export interface BackupMeta {
  /** 백업 파일이 만들어진 ISO 시각 */
  exportedAt: string;
  /** 담긴 항목 수 */
  keys: number;
}

/** 복원 전, 파일을 쓰지 않고 내용(생성 시각·항목 수)만 미리 확인한다. 형식이 아니면 throw. */
export function peekBackup(jsonText: string): BackupMeta {
  const b = parseValid(jsonText);
  return {
    exportedAt: typeof b.exportedAt === "string" ? b.exportedAt : "",
    keys: Object.keys(b.data).length,
  };
}

export interface ImportResult {
  imported: number;
}

/** 백업 JSON 문자열을 localStorage로 복원한다. 형식이 아니면 throw. */
export function importBackup(jsonText: string): ImportResult {
  const b = parseValid(jsonText);
  let imported = 0;
  for (const [k, v] of Object.entries(b.data)) {
    if (!k.startsWith(PREFIX) || typeof v !== "string") continue;
    try {
      window.localStorage.setItem(k, v);
      imported += 1;
    } catch {
      // 저장공간 초과 등은 건너뜀
    }
  }
  return { imported };
}

/** 파일 하나를 읽어 텍스트로 반환(<input type="file"> 용). */
export function readFileText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("파일 읽기 실패"));
    reader.readAsText(file);
  });
}

export type PersistState = "persisted" | "not-persisted" | "unsupported";

/**
 * 브라우저에 "이 기기 저장을 영구 보존(자동 삭제 대상에서 제외)"해달라고 요청한다.
 * 이미 영구 상태면 그대로 반환. 표준 Storage API — 서버 통신 없음.
 */
export async function requestPersistentStorage(): Promise<PersistState> {
  if (typeof navigator === "undefined" || !navigator.storage?.persist) {
    return "unsupported";
  }
  try {
    if (await navigator.storage.persisted()) return "persisted";
    const ok = await navigator.storage.persist();
    return ok ? "persisted" : "not-persisted";
  } catch {
    return "unsupported";
  }
}

/** 요청 없이 현재 영구저장 상태만 조회. */
export async function getPersistState(): Promise<PersistState> {
  if (typeof navigator === "undefined" || !navigator.storage?.persisted) {
    return "unsupported";
  }
  try {
    return (await navigator.storage.persisted()) ? "persisted" : "not-persisted";
  } catch {
    return "unsupported";
  }
}
