import { useState } from 'react';
import { evalExpr } from '../lib/calculator';
import { FunctionLab, DerivativeLab, IntegralLab } from '../components/labs/Labs';
import { Formula } from '../components/MathText';

type ToolId = 'home' | 'calc' | 'plot' | 'deriv' | 'integ' | 'formulas' | 'symbols' | 'dict';

const TOOLS: { id: ToolId; ico: string; title: string; desc: string; bg: string; color: string }[] = [
  { id: 'calc', ico: '计算器'.slice(0, 2), title: '科学计算器', desc: '含三角/对数/幂', bg: '#e8f1fa', color: '#2563a6' },
  { id: 'plot', ico: '⌁', title: '函数绘图', desc: '输入表达式看图', bg: '#e2f6f7', color: '#0e9aa7' },
  { id: 'deriv', ico: '⊿', title: '导数可视化', desc: '拖动看切线斜率', bg: '#fdf1e2', color: '#d98324' },
  { id: 'integ', ico: '∫', title: '积分可视化', desc: '黎曼和逼近面积', bg: '#eef0fb', color: '#5c6fc4' },
  { id: 'formulas', ico: '∑', title: '公式速查', desc: '高频公式一览', bg: '#f3effb', color: '#7c5cc4' },
  { id: 'symbols', ico: '⌗', title: '数学符号', desc: '符号读法与含义', bg: '#e9f0f5', color: '#3b82a8' },
  { id: 'dict', ico: '⇄', title: '术语词典', desc: '中英术语对照', bg: '#fbefee', color: '#c6524b' },
];

export default function Tools() {
  const [tool, setTool] = useState<ToolId>('home');
  const active = TOOLS.find(t => t.id === tool);

  return (
    <div className="container">
      {tool === 'home' && (
        <>
          <div style={{ padding: '10px 0 4px' }}>
            <div className="hero"><div className="eyebrow">Toolbox</div><h1 style={{ fontSize: 28 }}>数学工具箱</h1><p className="lead">随手可用的计算与可视化工具，都配了中文说明。</p></div>
          </div>
          <div className="tool-grid">
            {TOOLS.map(t => (
              <div className="tool-tile" key={t.id} onClick={() => setTool(t.id)}>
                <div className="tico" style={{ background: t.bg, color: t.color, fontWeight: 800, fontSize: 14 }}>{t.ico}</div>
                <div className="tt">{t.title}</div>
                <div className="td">{t.desc}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {tool !== 'home' && (
        <>
          <button className="cta-btn ghost" style={{ width: 'auto', margin: '10px 0', padding: '8px 16px' }} onClick={() => setTool('home')}>← 工具箱</button>
          <div className="part-head"><h1 style={{ fontSize: 24 }}>{active?.title}</h1></div>
        </>
      )}

      {tool === 'calc' && <Calculator />}
      {tool === 'plot' && <PlotTool />}
      {tool === 'deriv' && <DerivTool />}
      {tool === 'integ' && <IntegTool />}
      {tool === 'formulas' && <FormulasTool />}
      {tool === 'symbols' && <SymbolsTool />}
      {tool === 'dict' && <DictTool />}
    </div>
  );
}

/* ---------------- 科学计算器 ---------------- */
function Calculator() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('0');
  const [error, setError] = useState(false);
  const keys = [
    ['7', '8', '9', '÷'], ['4', '5', '6', '×'], ['1', '2', '3', '−'], ['0', '.', '+', '='],
    ['(', ')', 'sin(', 'cos('], ['tan(', '√', 'ln(', 'log('], ['x^', 'π', '⌫', 'C'],
  ];
  function press(k: string) {
    if (k === 'C') { setExpr(''); setResult('0'); setError(false); return; }
    if (k === '⌫') { setExpr(e => e.slice(0, -1)); return; }
    if (k === '=') {
      const r = evalExpr(expr);
      if (r.ok) { setResult(r.value); setError(false); }
      else { setResult('错误'); setError(true); }
      return;
    }
    const disp: Record<string, string> = { '÷': '/', '×': '*', '−': '-', 'π': 'pi', '√': 'sqrt(' };
    setExpr(e => e + (disp[k] ?? k));
  }
  return (
    <div className="card" style={{ padding: 16, marginTop: 12 }}>
      <p className="hint" style={{ marginBottom: 10 }}>直接输入表达式（如 sin(pi/6)），或点按键。支持 + − × ÷、括号、sin/cos/tan、ln/log、sqrt、幂 ^、常数 pi 和 e。</p>
      <div className="calc-display">
        <div className="expr">{expr || '输入表达式…'}</div>
        <div className="val" style={error ? { color: '#ff9a9a' } : {}}>{result}</div>
      </div>
      <div className="calc-keys">
        {keys.flat().map((k, i) => k === '' ? <span key={i} /> : (
          <button key={i}
            className={`calc-key ${['÷','×','−','+','='].includes(k) ? 'eq' : ''} ${['sin(','cos(','tan(','ln(','log(','x^','√','π'].includes(k) ? 'fn' : ''} ${k==='C'?'op':''}`}
            onClick={() => press(k)}>{k}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- 函数绘图 ---------------- */
function PlotTool() {
  return <div style={{ marginTop: 12 }}>
    <p className="hint">输入函数表达式，实时绘图。可拖动横轴范围滑块。支持 x^2、sin(x)、log(x)、exp(x)、sqrt(x)、abs(x) 等。</p>
    <FunctionLab lab={{ kind: 'function', initialFn: 'sin(x)', caption: '函数图像会随输入实时更新。试着改成 x^2 或 log(x) 看看形状。' }} />
  </div>;
}
function DerivTool() {
  return <div style={{ marginTop: 12 }}>
    <p className="hint">拖动切点，观察切线斜率如何变化——这就是导数 f′(x) 的几何意义。</p>
    <DerivativeLab lab={{ kind: 'derivative', initialFn: 'x^2', caption: '橙色切线的斜率就是该点的导数值。' }} />
  </div>;
}
function IntegTool() {
  return <div style={{ marginTop: 12 }}>
    <p className="hint">调整积分上下限 a、b 和矩形数量 n，看黎曼和如何逼近曲线下的真实面积。</p>
    <IntegralLab lab={{ kind: 'integral', initialFn: 'x^2', caption: '阴影面积 ≈ 定积分的值，矩形越多越精确。' }} />
  </div>;
}

/* ---------------- 公式速查 ---------------- */
const FORMULA_GROUPS = [
  { title: '代数', items: [
    { latex: '(a+b)^2=a^2+2ab+b^2', meaning: '完全平方和' },
    { latex: 'a^2-b^2=(a+b)(a-b)', meaning: '平方差' },
    { latex: 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}', meaning: '一元二次求根公式' },
  ]},
  { title: '指数与对数', items: [
    { latex: 'a^m a^n=a^{m+n}', meaning: '同底数幂相乘' },
    { latex: '\\log_a(xy)=\\log_a x+\\log_a y', meaning: '对数乘法' },
    { latex: '\\ln x=\\log_e x', meaning: '自然对数' },
  ]},
  { title: '求导', items: [
    { latex: '\\frac{d}{dx}x^n=nx^{n-1}', meaning: '幂函数求导' },
    { latex: "(fg)'=f'g+fg'", meaning: '乘积法则' },
    { latex: '\\frac{d}{dx}f(g(x))=f\'(g(x))g\'(x)', meaning: '链式法则' },
    { latex: '(\\sin x)\'=\\cos x,\\quad (\\ln x)\'=\\frac1x', meaning: '三角与对数求导' },
  ]},
  { title: '积分', items: [
    { latex: '\\int x^n dx=\\frac{x^{n+1}}{n+1}+C\\ (n\\neq-1)', meaning: '幂函数积分' },
    { latex: '\\int_a^b f(x)dx=F(b)-F(a)', meaning: '微积分基本定理' },
    { latex: '\\int u\\,dv=uv-\\int v\\,du', meaning: '分部积分' },
  ]},
];
function FormulasTool() {
  return <div style={{ marginTop: 12 }}>
    {FORMULA_GROUPS.map(g => (
      <div key={g.title}>
        <div className="section-title"><span className="bar" />{g.title}</div>
        <div className="card" style={{ padding: '6px 14px' }}>
          {g.items.map((it, i) => (
            <div className="formula-card" key={i}>
              <div className="fml"><Formula latex={it.latex} display /></div>
              <div className="fmean">{it.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>;
}

/* ---------------- 数学符号 ---------------- */
const SYMBOLS = [
  { s: '∈', name: '属于', desc: '$3\\in\\mathbb{N}$ 表示 3 属于自然数集' },
  { s: 'ℝ', name: '实数集', desc: '所有实数组成的集合' },
  { s: 'Δ', name: 'Delta / 变化量', desc: '$\\Delta x$ 表示 x 的变化量' },
  { s: '∑', name: 'Sigma / 求和', desc: '$\\sum_{i=1}^{n}$ 表示从 i=1 加到 n' },
  { s: '∫', name: '积分号', desc: '拉长的 S，表示连续求和' },
  { s: 'lim', name: '极限', desc: '$\\lim_{x\\to a}f(x)$ 表示 x 趋近 a 时的极限' },
  { s: '→', name: '趋近于', desc: '$x\\to0$ 表示 x 趋近 0' },
  { s: '∞', name: '无穷大', desc: '表示无限增大的趋势' },
  { s: 'f′(x)', name: '导数', desc: '函数 f 在 x 处的导数（变化率）' },
  { s: 'df/dx', name: '导数（莱布尼茨记号）', desc: '与 f′(x) 含义相同' },
  { s: '∂', name: '偏导符号', desc: '$\\frac{\\partial f}{\\partial x}$ 表示多元函数对 x 的偏导数' },
  { s: '√', name: '根号', desc: '$\\sqrt{x}$ 是 x 的平方根' },
  { s: 'π', name: '圆周率', desc: '约 3.14159，圆周长与直径之比' },
  { s: 'e', name: '自然常数', desc: '约 2.71828，自然对数的底' },
];
function SymbolsTool() {
  return <div className="card" style={{ marginTop: 12 }}>
    {SYMBOLS.map((s, i) => (
      <div className="dict-item" key={i}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontSize: 22, fontFamily: 'var(--mono)', color: 'var(--blue)', minWidth: 44 }}>{s.s}</span>
          <div><div className="dict-term">{s.name}</div><div className="dict-def"><Formula latex={s.desc.replace(/\$/g, '')} /></div></div>
        </div>
      </div>
    ))}
  </div>;
}

/* ---------------- 术语词典 ---------------- */
const DICT = [
  { en: 'Function', zh: '函数', def: '每个输入对应唯一输出的对应规则' },
  { en: 'Domain / Range', zh: '定义域 / 值域', def: '输入允许取值的集合 / 输出所有可能的集合' },
  { en: 'Limit', zh: '极限', def: '变量趋近某点时函数值趋近的目标' },
  { en: 'Continuity', zh: '连续性', def: '图像不断开，极限值等于函数值' },
  { en: 'Derivative', zh: '导数', def: '瞬时变化率，几何上是切线斜率' },
  { en: 'Differentiation', zh: '微分（求导）', def: '求导数的方法与过程' },
  { en: 'Integral', zh: '积分', def: '累积量，几何上是曲线下的面积' },
  { en: 'Antiderivative', zh: '原函数', def: '导数等于给定函数的函数' },
  { en: 'Riemann Sum', zh: '黎曼和', def: '用小矩形面积逼近曲线下面积的和' },
  { en: 'Fundamental Theorem of Calculus', zh: '微积分基本定理', def: '连接微分与积分的定理' },
  { en: 'Chain Rule', zh: '链式法则', def: '求复合函数导数的法则' },
  { en: 'Gradient', zh: '梯度', def: '多元函数变化最快的方向与速率' },
  { en: 'Gradient Descent', zh: '梯度下降', def: '沿梯度反方向迭代以最小化函数的方法' },
  { en: 'Loss Function', zh: '损失函数', def: '衡量模型预测误差的函数' },
  { en: 'Backpropagation', zh: '反向传播', def: '用链式法则高效计算神经网络梯度的方法' },
];
function DictTool() {
  const [q, setQ] = useState('');
  const list = DICT.filter(d => (d.en + d.zh + d.def).toLowerCase().includes(q.toLowerCase()));
  return <div style={{ marginTop: 12 }}>
    <div className="search-bar"><input value={q} onChange={e => setQ(e.target.value)} placeholder="搜索术语（中英文均可）" /></div>
    <div className="card">
      {list.map((d, i) => (
        <div className="dict-item" key={i}>
          <div className="dict-term">{d.zh} <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}>{d.en}</span></div>
          <div className="dict-def">{d.def}</div>
        </div>
      ))}
      {list.length === 0 && <div className="empty-state"><p>没有匹配的术语</p></div>}
    </div>
  </div>;
}
