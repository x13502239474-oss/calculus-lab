/**
 * 本地持久化层：学习进度、笔记、公式收藏、错题记录、当前位置。
 * 全部基于 localStorage，刷新与重开网站都不丢失。
 */

const NS = 'calculus-lab:v1:';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(NS + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value));
  } catch {
    /* 存储配额满时静默降级，不影响学习 */
  }
}

/* ---------------- 学习进度 ---------------- */

export type ProgressMap = Record<string, { status: 'learning' | 'done'; updated: number }>;

export function getProgress(): ProgressMap {
  return read<ProgressMap>('progress', {});
}

export function setTopicStatus(topicId: string, status: 'learning' | 'done'): void {
  const p = getProgress();
  p[topicId] = { status, updated: Date.now() };
  write('progress', p);
}

export function toggleTopicDone(topicId: string): boolean {
  const p = getProgress();
  const isDone = p[topicId]?.status === 'done';
  if (isDone) delete p[topicId];
  else p[topicId] = { status: 'done', updated: Date.now() };
  write('progress', p);
  return !isDone;
}

export function clearAllProgress(): void {
  write('progress', {});
  write('lastVisited', null);
}

/* ---------------- 当前学习位置 ---------------- */

export interface LastVisited { topicId: string; topicTitle: string; chapterId: string; partId: string; at: number }

export function getLastVisited(): LastVisited | null {
  return read<LastVisited | null>('lastVisited', null);
}

export function setLastVisited(v: Omit<LastVisited, 'at'>): void {
  write('lastVisited', { ...v, at: Date.now() });
}

/* ---------------- 最近学习（历史列表） ---------------- */

export function getRecent(): LastVisited[] {
  return read<LastVisited[]>('recent', []);
}

export function pushRecent(v: Omit<LastVisited, 'at'>): void {
  const list = getRecent().filter(x => x.topicId !== v.topicId);
  list.unshift({ ...v, at: Date.now() });
  write('recent', list.slice(0, 20));
}

/* ---------------- 个人笔记 ---------------- */

export interface Note {
  id: string;
  topicId?: string;
  topicTitle?: string;
  content: string;
  created: number;
  updated: number;
}

export function getNotes(): Note[] {
  return read<Note[]>('notes', []);
}

export function saveNote(n: Note): void {
  const list = getNotes();
  const i = list.findIndex(x => x.id === n.id);
  if (i >= 0) list[i] = { ...n, updated: Date.now() };
  else list.unshift({ ...n, created: Date.now(), updated: Date.now() });
  write('notes', list);
}

export function deleteNote(id: string): void {
  write('notes', getNotes().filter(x => x.id !== id));
}

/* ---------------- 公式收藏 ---------------- */

export interface FavoriteFormula {
  id: string;
  latex: string;
  label: string;
  topicId?: string;
  created: number;
}

export function getFavorites(): FavoriteFormula[] {
  return read<FavoriteFormula[]>('favorites', []);
}

export function toggleFavorite(f: Omit<FavoriteFormula, 'created'>): boolean {
  const list = getFavorites();
  const i = list.findIndex(x => x.id === f.id);
  if (i >= 0) {
    list.splice(i, 1);
    write('favorites', list);
    return false;
  }
  list.unshift({ ...f, created: Date.now() });
  write('favorites', list);
  return true;
}

/* ---------------- 错题 / 易错点 ---------------- */

export interface Mistake {
  id: string;
  topicId: string;
  topicTitle?: string;
  questionId?: string;
  note: string;
  created: number;
}

export function getMistakes(): Mistake[] {
  return read<Mistake[]>('mistakes', []);
}

export function addMistake(m: Omit<Mistake, 'created'>): void {
  const list = getMistakes();
  if (list.some(x => x.id === m.id)) return;
  list.unshift({ ...m, created: Date.now() });
  write('mistakes', list);
}

export function removeMistake(id: string): void {
  write('mistakes', getMistakes().filter(x => x.id !== id));
}

/* ---------------- 答题记录（先练后讲：提交后才解锁答案） ---------------- */

export interface AnswerRecord {
  questionId: string;
  correct: boolean;
  answer: string;
  at: number;
}

export function getAnswers(): Record<string, AnswerRecord> {
  return read<Record<string, AnswerRecord>>('answers', {});
}

export function recordAnswer(r: Omit<AnswerRecord, 'at'>): void {
  const a = getAnswers();
  a[r.questionId] = { ...r, at: Date.now() };
  write('answers', a);
}
