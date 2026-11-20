import { useEffect, useRef, useState } from 'react';
import { loadPlotly, makeFn, sampleX, baseLayout, config, numericalDerivative, numericalIntegral } from '../../lib/plot';
import MathText from '../MathText';
import type { LabRef } from '../../types/course';

/** 通用 Plotly 画布 */
function Plot({ data, layout, onUpdate }: { data: any[]; layout: any; onUpdate?: (fn: any) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const plotRef = useRef<any>(null);
  useEffect(() => {
    let alive = true;
    loadPlotly().then(Plotly => {
      if (!alive || !ref.current) return;
      plotRef.current = Plotly.newPlot(ref.current, data, baseLayout(layout), config).then(() => {
        onUpdate?.(Plotly);
      });
    });
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    if (!plotRef.current || !ref.current) return;
    loadPlotly().then(Plotly => {
      if (ref.current) Plotly.react(ref.current, data, baseLayout(layout), config);
    });
  }, [data, layout]);
  return <div className="lab-canvas" ref={ref} />;
}

/* ============ 1. 函数图像实验室 ============ */
export function FunctionLab({ lab }: { lab: LabRef }) {
  const [expr, setExpr] = useState(lab.initialFn || 'x^2');
  const [range, setRange] = useState(6);
  const fn = makeFn(expr);
  const xs = sampleX(-range, range);
  const ys = fn ? xs.map(fn) : [];
  const data = [{
    type: 'scatter', mode: 'lines', x: xs, y: ys,
    line: { color: '#2563a6', width: 2.5 },
    name: 'f(x)', hovertemplate: 'x=%{x:.2f}<br>f(x)=%{y:.2f}<extra></extra>',
  }];
  const layout = {
    xaxis: { range: [-range, range], title: 'x' },
    yaxis: { range: [-10, 10], title: 'y' },
    shapes: [
      { type: 'line', x0: -range, x1: range, y0: 0, y1: 0, line: { color: '#c9d4e2', width: 1 } },
    ],
  };
  return (
    <div className="lab-box">
      <div className="lab-head"><span className="dot" />函数图像实验室</div>
      <div style={{ padding: '12px 14px' }}>
        <div className="field" style={{ marginBottom: 8 }}>
          <label>输入函数 f(x)（支持 x^2、sin(x)、log(x)、exp(x)、sqrt(x) 等）</label>
          <input value={expr} onChange={e => setExpr(e.target.value)} placeholder="例如 x^2" />
          {!fn && <div className="hint" style={{ color: '#c6524b' }}>表达式无法识别，请检查语法</div>}
        </div>
        <div className="field" style={{ marginBottom: 4 }}>
          <label>横轴范围：±{range}</label>
          <input type="range" min={2} max={12} value={range} onChange={e => setRange(+e.target.value)} />
        </div>
      </div>
      <Plot data={data} layout={layout} />
      <div className="lab-caption"><MathText text={lab.caption} as="span" /></div>
    </div>
  );
}

/* ============ 2. 极限演示 ============ */
export function LimitLab({ lab }: { lab: LabRef }) {
  const [expr, setExpr] = useState(lab.initialFn || 'sin(x)/x');
  const [target] = useState(lab.params?.target ?? 0);
  const [x, setX] = useState(target + 1);
  const fn = makeFn(expr);
  const xs = sampleX(target - 3, target + 3);
  const ys = fn ? xs.map(fn) : [];
  const yv = fn ? fn(x) : NaN;
  const data: any[] = [{
    type: 'scatter', mode: 'lines', x: xs, y: ys, line: { color: '#2563a6', width: 2.5 }, name: 'f(x)',
  }];
  if (fn && isFinite(yv)) {
    data.push({ type: 'scatter', mode: 'markers', x: [x], y: [yv], marker: { color: '#d98324', size: 11 }, name: '当前点' });
    data.push({ type: 'scatter', mode: 'lines', x: [x, x], y: [Math.min(...ys.filter(isFinite)), yv], line: { color: '#d98324', width: 1, dash: 'dot' } });
  }
  const layout = {
    xaxis: { range: [target - 3, target + 3], title: 'x' },
    yaxis: { title: 'f(x)' },
    shapes: [{ type: 'line', x0: target, x1: target, y0: -10, y1: 10, line: { color: '#0e9aa7', width: 1, dash: 'dash' } }],
  };
  return (
    <div className="lab-box">
      <div className="lab-head"><span className="dot" />极限演示 · 观察趋近过程</div>
      <div style={{ padding: '12px 14px' }}>
        <div className="field" style={{ marginBottom: 8 }}>
          <label>函数 f(x)</label>
          <input value={expr} onChange={e => setExpr(e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 4 }}>
          <label>拖动 x 趋近 {target}：x = {x.toFixed(3)}，f(x) = {isFinite(yv) ? yv.toFixed(4) : '无定义'}</label>
          <input type="range" min={target - 3} max={target + 3} step={0.01} value={x} onChange={e => setX(+e.target.value)} />
          <div className="hint">试试从左侧（小于 {target}）和右侧（大于 {target}）分别靠近，看看 f(x) 是否趋向同一个值。</div>
        </div>
      </div>
      <Plot data={data} layout={layout} />
      <div className="lab-caption"><MathText text={lab.caption} as="span" /></div>
    </div>
  );
}

/* ============ 3. 导数与切线演示 ============ */
export function DerivativeLab({ lab }: { lab: LabRef }) {
  const [expr, setExpr] = useState(lab.initialFn || 'x^2');
  const [x0, setX0] = useState(1);
  const fn = makeFn(expr);
  const xs = sampleX(-5, 5);
  const ys = fn ? xs.map(fn) : [];
  const y0 = fn ? fn(x0) : NaN;
  const slope = fn ? numericalDerivative(fn, x0) : NaN;
  const tx = [x0 - 1.5, x0 + 1.5];
  const ty = tx.map(t => y0 + slope * (t - x0));
  const data: any[] = [{
    type: 'scatter', mode: 'lines', x: xs, y: ys, line: { color: '#2563a6', width: 2.5 }, name: 'f(x)',
  }];
  if (fn && isFinite(y0) && isFinite(slope)) {
    data.push({ type: 'scatter', mode: 'lines', x: tx, y: ty, line: { color: '#d98324', width: 2.5 }, name: '切线' });
    data.push({ type: 'scatter', mode: 'markers', x: [x0], y: [y0], marker: { color: '#0e9aa7', size: 11 }, name: '切点' });
  }
  const layout = {
    xaxis: { range: [-5, 5], title: 'x' }, yaxis: { range: [-8, 12], title: 'y' },
  };
  return (
    <div className="lab-box">
      <div className="lab-head"><span className="dot" />导数演示 · 拖动切点看斜率</div>
      <div style={{ padding: '12px 14px' }}>
        <div className="field" style={{ marginBottom: 8 }}>
          <label>函数 f(x)</label>
          <input value={expr} onChange={e => setExpr(e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 4 }}>
          <label>切点 x = {x0.toFixed(2)}，切线斜率 f′(x) ≈ {isFinite(slope) ? slope.toFixed(3) : '—'}</label>
          <input type="range" min={-4} max={4} step={0.05} value={x0} onChange={e => setX0(+e.target.value)} />
          <div className="hint">橙色是切线，青色是切点。拖动切点，观察斜率怎么随位置变化——这正是导数 f′(x)。</div>
        </div>
      </div>
      <Plot data={data} layout={layout} />
      <div className="lab-caption"><MathText text={lab.caption} as="span" /></div>
    </div>
  );
}

/* ============ 4. 积分与黎曼和演示 ============ */
export function IntegralLab({ lab }: { lab: LabRef }) {
  const [expr, setExpr] = useState(lab.initialFn || 'x^2');
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [n, setN] = useState(8);
  const fn = makeFn(expr);
  const xs = sampleX(-1, 4);
  const ys = fn ? xs.map(fn) : [];
  const dx = (b - a) / n;
  const rects: any[] = [];
  if (fn && b > a) {
    for (let i = 0; i < n; i++) {
      const xa = a + i * dx;
      const xb = xa + dx;
      const h = fn(xa + dx / 2);
      if (isFinite(h)) {
        rects.push({ type: 'scatter', mode: 'lines', fill: 'toself',
          x: [xa, xb, xb, xa], y: [0, 0, h, h],
          fillcolor: 'rgba(14,154,167,0.25)', line: { color: 'rgba(14,154,167,0.5)', width: 1 }, hoverinfo: 'skip' });
      }
    }
  }
  const area = fn ? numericalIntegral(fn, a, b) : NaN;
  const data: any[] = [...rects, {
    type: 'scatter', mode: 'lines', x: xs, y: ys, line: { color: '#2563a6', width: 2.5 }, name: 'f(x)',
  }];
  const layout = { xaxis: { range: [-1, 4], title: 'x' }, yaxis: { title: 'y' } };
  return (
    <div className="lab-box">
      <div className="lab-head"><span className="dot" />积分演示 · 黎曼和逼近面积</div>
      <div style={{ padding: '12px 14px' }}>
        <div className="field" style={{ marginBottom: 8 }}>
          <label>函数 f(x)</label>
          <input value={expr} onChange={e => setExpr(e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 6 }}>
          <label>积分下限 a = {a.toFixed(1)}</label>
          <input type="range" min={-1} max={3} step={0.1} value={a} onChange={e => setA(Math.min(+e.target.value, b - 0.1))} />
        </div>
        <div className="field" style={{ marginBottom: 6 }}>
          <label>积分上限 b = {b.toFixed(1)}</label>
          <input type="range" min={0} max={4} step={0.1} value={b} onChange={e => setB(Math.max(+e.target.value, a + 0.1))} />
        </div>
        <div className="field" style={{ marginBottom: 4 }}>
          <label>矩形数量 n = {n}（越多越接近真实面积）</label>
          <input type="range" min={2} max={60} step={1} value={n} onChange={e => setN(+e.target.value)} />
          <div className="hint">阴影是所有小矩形的面积和 ≈ {isFinite(area) ? area.toFixed(4) : '—'}。拖动 n，看它如何逼近曲线下的真实面积。</div>
        </div>
      </div>
      <Plot data={data} layout={layout} />
      <div className="lab-caption"><MathText text={lab.caption} as="span" /></div>
    </div>
  );
}

/* ============ 5. 梯度下降演示 ============ */
export function GradientLab({ lab }: { lab: LabRef }) {
  const [expr, setExpr] = useState('(x-3)^2');
  const [lr, setLr] = useState(0.15);
  const [start, setStart] = useState(-1);
  const [step, setStep] = useState(6);
  const fn = makeFn(expr);
  const xs = sampleX(-2, 8);
  const ys = fn ? xs.map(fn) : [];
  // 迭代
  const path: { x: number; y: number }[] = [];
  if (fn) {
    let x = start;
    for (let i = 0; i <= step; i++) {
      const y = fn(x);
      if (!isFinite(x) || !isFinite(y) || Math.abs(x) > 1e6) break;
      path.push({ x, y });
      const grad = numericalDerivative(fn, x);
      x = x - lr * grad;
    }
  }
  const data: any[] = [{
    type: 'scatter', mode: 'lines', x: xs, y: ys, line: { color: '#2563a6', width: 2.5 }, name: '损失函数',
  }];
  if (path.length) {
    data.push({ type: 'scatter', mode: 'lines+markers', x: path.map(p => p.x), y: path.map(p => p.y),
      line: { color: '#d98324', width: 2, dash: 'dot' }, marker: { color: '#d98324', size: 7 }, name: '下降路径' });
  }
  const layout = { xaxis: { range: [-2, 8], title: '参数 x' }, yaxis: { range: [-2, 20], title: '损失 L(x)' } };
  const last = path[path.length - 1];
  return (
    <div className="lab-box">
      <div className="lab-head"><span className="dot" />梯度下降演示 · 走到损失最小处</div>
      <div style={{ padding: '12px 14px' }}>
        <div className="field" style={{ marginBottom: 8 }}>
          <label>损失函数 L(x)</label>
          <input value={expr} onChange={e => setExpr(e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 6 }}>
          <label>起点 x = {start.toFixed(1)}</label>
          <input type="range" min={-2} max={7} step={0.1} value={start} onChange={e => setStart(+e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 6 }}>
          <label>学习率 = {lr.toFixed(2)}（太大可能震荡，太小走得很慢）</label>
          <input type="range" min={0.01} max={0.9} step={0.01} value={lr} onChange={e => setLr(+e.target.value)} />
        </div>
        <div className="field" style={{ marginBottom: 4 }}>
          <label>迭代步数 = {step}　当前 x ≈ {last ? last.x.toFixed(3) : '—'}</label>
          <input type="range" min={0} max={20} step={1} value={step} onChange={e => setStep(+e.target.value)} />
          <div className="hint">橙色路径是参数更新的轨迹，目标是滚到曲线最低点。改学习率试试：太小走不动，太大会来回震荡甚至发散。</div>
        </div>
      </div>
      <Plot data={data} layout={layout} />
      <div className="lab-caption"><MathText text={lab.caption} as="span" /></div>
    </div>
  );
}

/** 根据 lab.kind 分发 */
export default function Lab({ lab }: { lab: LabRef }) {
  switch (lab.kind) {
    case 'function': return <FunctionLab lab={lab} />;
    case 'limit': return <LimitLab lab={lab} />;
    case 'derivative': return <DerivativeLab lab={lab} />;
    case 'integral': return <IntegralLab lab={lab} />;
    case 'gradient': return <GradientLab lab={lab} />;
    default: return null;
  }
}
