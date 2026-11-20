import MathText, { Formula } from './MathText';
import Lab from './labs/Labs';
import type { TeachingBlock, Prose, Example, Derivation, Formula as FormulaT } from '../types/course';

const BLOCK_META: Record<string, { title: string; ico: string; kind: string }> = {
  background: { title: '知识背景 · 为什么要学它', ico: '◈', kind: 'background' },
  plain: { title: '通俗理解 · 说人话', ico: '✦', kind: 'plain' },
  definition: { title: '数学定义 · 严谨表述', ico: '▣', kind: 'definition' },
  symbols: { title: '符号拆解 · 每个记号的意思', ico: '⌗', kind: 'definition' },
  figure: { title: '图形演示 · 用眼睛理解', ico: '◇', kind: 'figure' },
  derivation: { title: '逐步推导 · 从哪来到哪去', ico: '⟶', kind: 'derivation' },
  examplesBasic: { title: '基础例题 · 从最简单的开始', ico: '✎', kind: 'example' },
  examplesAdvanced: { title: '进阶例题 · 再上一步', ico: '✎✎', kind: 'example' },
  application: { title: '实际应用 · 现实里在哪用', ico: '⬡', kind: 'application' },
  ai: { title: 'AI 中的应用 · 连接机器学习', ico: '◉', kind: 'ai' },
  mistakes: { title: '常见错误 · 别踩这些坑', ico: '⚠', kind: 'mistakes' },
  summary: { title: '本节总结 · 真正要记住的', ico: '★', kind: 'summary' },
  keyFormulas: { title: '关键公式', ico: '∑', kind: 'formula' },
};

function ProseList({ items }: { items: Prose[] }) {
  return <>{items.map((p, i) => (
    <div className="para" key={i}>
      {p.title && <span className="pt">{p.title}</span>}
      <MathText text={p.text} as="span" />
    </div>
  ))}</>;
}

function FormulaCards({ items }: { items: FormulaT[] }) {
  return <>{items.map((f, i) => (
    <div className="formula-card" key={i}>
      <div className="fml"><Formula latex={f.latex} display={f.display === 'block' || f.display === undefined} /></div>
      {f.meaning && <div className="fmean">{f.meaning}</div>}
      {f.note && <div className="fnote">注意：{f.note}</div>}
    </div>
  ))}</>;
}

function DerivationView({ d }: { d: Derivation }) {
  return <div className="block-card">
    {d.intro && <MathText text={d.intro} className="para" />}
    {d.steps.map((s, i) => (
      <div className="deriv-step" key={i}>
        <div className="step-n">{i + 1}</div>
        <div className="step-body">
          <div className="step-action"><MathText text={s.action} as="span" /></div>
          {s.latex && <div className="step-latex"><Formula latex={s.latex} display /></div>}
          <div className="step-why"><MathText text={s.why} as="span" /></div>
        </div>
      </div>
    ))}
    {d.conclusion && <MathText text={d.conclusion} className="para" />}
  </div>;
}

function ExampleView({ ex }: { ex: Example }) {
  return <div className="example">
    <div className="example-head">
      <span className={`lvl ${ex.level}`}>{ex.level === 'basic' ? '基础' : '进阶'}</span>
      <span className="etitle">{ex.title}</span>
    </div>
    <div className="example-body">
      <div className="ex-field"><span className="lbl">这题在问什么</span><MathText text={ex.asking} as="span" /></div>
      <div className="ex-field">
        <span className="lbl">已知条件</span>
        <ul>{ex.given.map((g, i) => <li key={i}><MathText text={g} as="span" /></li>)}</ul>
      </div>
      <div className="ex-field">
        <span className="lbl">用什么知识</span>
        <ul>{ex.method.map((m, i) => <li key={i}><MathText text={m} as="span" /></li>)}</ul>
      </div>
      <div className="ex-steps">
        {ex.steps.map((s, i) => (
          <div className="deriv-step" key={i}>
            <div className="step-n" style={{ background: 'var(--blue)' }}>{i + 1}</div>
            <div className="step-body">
              <div className="step-action"><MathText text={s.action} as="span" /></div>
              {s.latex && <div className="step-latex"><Formula latex={s.latex} display /></div>}
              <div className="step-why"><MathText text={s.why} as="span" /></div>
            </div>
          </div>
        ))}
      </div>
      <div className="ex-result"><Formula latex={ex.result} /></div>
      {ex.check && <div className="ex-check"><MathText text={ex.check} as="span" /></div>}
      {ex.pitfall && <div className="ex-pitfall"><MathText text={ex.pitfall} as="span" /></div>}
    </div>
  </div>;
}

/** 按固定顺序渲染 12 要素 */
const ORDER: (keyof TeachingBlock)[] = [
  'background', 'plain', 'definition', 'symbols', 'keyFormulas', 'figure',
  'derivation', 'examplesBasic', 'examplesAdvanced', 'application', 'ai', 'mistakes', 'summary',
];

export default function LessonView({ blocks }: { blocks: TeachingBlock }) {
  return <div>
    {ORDER.map(key => {
      const val = (blocks as any)[key];
      if (!val) return null;
      const meta = BLOCK_META[key];
      if (key === 'figure') {
        return <div className="block" data-kind="figure" key={key}>
          <Lab lab={val} />
        </div>;
      }
      if (key === 'keyFormulas') {
        return <div className="block" key={key}>
          <div className="block-title"><span className="ico">{meta.ico}</span>{meta.title}</div>
          <FormulaCards items={val} />
        </div>;
      }
      if (key === 'derivation') {
        return <div className="block" key={key}>
          <div className="block-title"><span className="ico">{meta.ico}</span>{meta.title}</div>
          <DerivationView d={val} />
        </div>;
      }
      if (key === 'examplesBasic' || key === 'examplesAdvanced') {
        return <div className="block" key={key}>
          <div className="block-title"><span className="ico">{meta.ico}</span>{meta.title}</div>
          {val.map((ex: Example, i: number) => <ExampleView ex={ex} key={i} />)}
        </div>;
      }
      // prose 类
      return <div className="block" data-kind={meta.kind} key={key}>
        <div className="block-card">
          <div className="block-title"><span className="ico">{meta.ico}</span>{meta.title}</div>
          <ProseList items={val} />
        </div>
      </div>;
    })}
  </div>;
}
