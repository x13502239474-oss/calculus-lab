/**
 * Calculus Lab 课程内容数据结构
 *
 * 设计原则：
 * 1. 内容与组件分离——所有教学内容都是纯数据，由组件按类型渲染。
 * 2. 每个知识点用统一的 12 要素教学结构（Blocks）组织。
 * 3. 例题必须完整：读题→已知→所用知识→逐步过程(每步含为什么)→结果→检验。
 * 4. 图形、公式、练习都是可挂载的数据槽，便于后续持续扩充。
 */

/** 数学公式（LaTeX 源码，渲染层用 KaTeX） */
export interface Formula {
  latex: string;
  /** 公式的中文解释 */
  meaning?: string;
  /** 适用条件 / 易混淆提示 */
  note?: string;
  /** 展示方式：行内 / 独立成行 */
  display?: 'inline' | 'block';
}

/** 一个带图文说明的要点段落 */
export interface Prose {
  /** 段落标题（可选） */
  title?: string;
  /** 正文，支持行内 $...$ LaTeX 与 **加粗**、`代码` */
  text: string;
}

/** 逐步推导中的一步 */
export interface DerivStep {
  /** 这一步做什么 */
  action: string;
  /** 这一步的公式（可选） */
  latex?: string;
  /** 为什么这样做（解释） */
  why: string;
}

/** 完整推导 */
export interface Derivation {
  intro?: string;
  steps: DerivStep[];
  conclusion?: string;
}

/** 完整例题（铁律：不省略中间代数步骤） */
export interface Example {
  title: string;
  level: 'basic' | 'advanced';
  /** 题目在问什么 */
  asking: string;
  /** 已知条件列表 */
  given: string[];
  /** 使用什么数学知识 */
  method: string[];
  /** 完整计算过程，每步含动作、公式、原因 */
  steps: DerivStep[];
  /** 最终结果（LaTeX） */
  result: string;
  /** 检查答案是否合理 */
  check: string;
  /** 易错提醒 */
  pitfall?: string;
}

/** 交互图形槽 */
export interface LabRef {
  kind: 'function' | 'limit' | 'derivative' | 'integral' | 'gradient';
  /** 初始函数表达式（mathjs 语法，如 x^2, sin(x)） */
  initialFn?: string;
  /** 初始参数 */
  params?: Record<string, number>;
  /** 图形服务教学目的的中文说明 */
  caption: string;
}

/** 知识点教学块——12 要素采用可选字段，按需组合 */
export interface TeachingBlock {
  /** 1. 知识背景：为什么需要这个概念 */
  background?: Prose[];
  /** 2. 通俗解释：大白话 + 生活化比喻 */
  plain?: Prose[];
  /** 3. 数学定义：规范严谨 */
  definition?: Prose[];
  /** 4. 符号拆解：逐个符号解释 */
  symbols?: Prose[];
  /** 5. 图形演示 */
  figure?: LabRef;
  /** 6. 逐步推导 */
  derivation?: Derivation;
  /** 7. 基础例题 */
  examplesBasic?: Example[];
  /** 8. 进阶例题 */
  examplesAdvanced?: Example[];
  /** 9. 实际应用 */
  application?: Prose[];
  /** 10. AI 应用（不相关时留空） */
  ai?: Prose[];
  /** 11. 常见错误 */
  mistakes?: Prose[];
  /** 12. 本节总结 */
  summary?: Prose[];
  /** 关键公式卡片 */
  keyFormulas?: Formula[];
}

/** 知识点（最小的教学与进度单元） */
export interface Topic {
  id: string;
  /** 知识点标题 */
  title: string;
  /** 一句话学习目标（可观测） */
  objective: string;
  /** 预计学习分钟数 */
  minutes?: number;
  /** 12 要素教学内容 */
  blocks: TeachingBlock;
  /** 关联题库题号 */
  quizIds?: string[];
}

/** 章 */
export interface Chapter {
  id: string;
  /** 章序号（篇内，从 1 开始） */
  number: number;
  title: string;
  /** 本章导读 */
  intro: string;
  /** 学完本章你能（列表） */
  outcomes: string[];
  topics: Topic[];
}

/** 篇（阶段） */
export interface Part {
  id: string;
  /** 篇序号（1-6） */
  number: number;
  title: string;
  subtitle: string;
  /** 本篇使用的主要教材 */
  source: string;
  /** 篇导读 */
  intro: string;
  /** 本篇学习目标 */
  goal: string;
  chapters: Chapter[];
}

/** 题库题目（用于章节小测） */
export interface Question {
  id: string;
  topicId: string;
  qtype: 'choice' | 'judge' | 'blank' | 'short';
  stem: string;
  options?: string[];
  answer: string;
  /** 填空题可接受变体 */
  accepted?: string[];
  /** 简答题判分要点组：每组是同义词数组 */
  keywords?: string[][];
  /** 四段式详解 */
  explanation: {
    answer: string;
    thinking: string;
    steps: string[];
    pitfall: string;
  };
}
