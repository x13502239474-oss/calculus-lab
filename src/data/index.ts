import type { Part, Topic, Chapter, Question } from '../types/course';
import { part1 } from './part1';
import { part2 } from './part2';
import { part3 } from './part3';
import { part4 } from './part4';
import { part5 } from './part5';
import { part6 } from './part6';

export const parts: Part[] = [part1, part2, part3, part4, part5, part6];

/** 所有章节的扁平列表 */
export const allChapters: { part: Part; chapter: Chapter }[] = parts.flatMap(part =>
  part.chapters.map(chapter => ({ part, chapter }))
);

/** 所有知识点的扁平列表 */
export const allTopics: { part: Part; chapter: Chapter; topic: Topic }[] = parts.flatMap(part =>
  part.chapters.flatMap(chapter => chapter.topics.map(topic => ({ part, chapter, topic })))
);

/** 按 id 找一个知识点及其上下文 */
export function findTopic(id: string) {
  return allTopics.find(x => x.topic.id === id);
}

/** 按 id 找章 */
export function findChapter(id: string) {
  return allChapters.find(x => x.chapter.id === id);
}

/** 按 id 找篇 */
export function findPart(id: string) {
  return parts.find(p => p.id === id);
}

/** 某篇的进度（已完成知识点数 / 总数） */
export function partProgress(partId: string, progress: Record<string, { status: string }>) {
  const part = parts.find(p => p.id === partId);
  if (!part) return { done: 0, total: 0, pct: 0 };
  const topicIds = part.chapters.flatMap(c => c.topics.map(t => t.id));
  const done = topicIds.filter(id => progress[id]?.status === 'done').length;
  return { done, total: topicIds.length, pct: topicIds.length ? Math.round((done / topicIds.length) * 100) : 0 };
}

/** 全站总进度 */
export function totalProgress(progress: Record<string, { status: string }>) {
  const total = allTopics.length;
  const done = allTopics.filter(x => progress[x.topic.id]?.status === 'done').length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

/** 搜索知识点（标题、目标、正文文本） */
export function searchTopics(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allTopics.filter(({ part, chapter, topic }) => {
    const haystack = [part.title, chapter.title, topic.title, topic.objective,
      JSON.stringify(topic.blocks)].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}
