/** Plotly 封装：懒加载 plotly，提供统一的浅色主题布局与求值工具 */
import { compile } from 'mathjs';

let plotlyPromise: Promise<any> | null = null;

export function loadPlotly(): Promise<any> {
  if (!plotlyPromise) {
    plotlyPromise = import('plotly.js-dist-min').then(m => (m as any).default || m);
  }
  return plotlyPromise;
}

/** 把用户输入的字符串编译成可求值的函数，失败返回 null */
export function makeFn(expr: string): ((x: number) => number) | null {
  try {
    const compiled = compile(expr);
    return (x: number) => {
      try {
        const v = compiled.evaluate({ x });
        return typeof v === 'number' && isFinite(v) ? v : NaN;
      } catch {
        return NaN;
      }
    };
  } catch {
    return null;
  }
}

/** 生成 x 采样点 */
export function sampleX(min: number, max: number, n = 300): number[] {
  const xs: number[] = [];
  for (let i = 0; i < n; i++) xs.push(min + (max - min) * i / (n - 1));
  return xs;
}

/** 浅色学术风布局 */
export function baseLayout(overrides: Record<string, any> = {}): Record<string, any> {
  return {
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#fbfcfe',
    font: { family: '-apple-system, PingFang SC, Microsoft YaHei, sans-serif', size: 11, color: '#4a586b' },
    margin: { l: 42, r: 16, t: 16, b: 38 },
    hovermode: 'closest',
    showlegend: false,
    xaxis: {
      gridcolor: '#eef2f7', zerolinecolor: '#c9d4e2', zerolinewidth: 1.5,
      linecolor: '#dbe3ec', ticks: 'outside', tickcolor: '#dbe3ec',
      fixedrange: false,
    },
    yaxis: {
      gridcolor: '#eef2f7', zerolinecolor: '#c9d4e2', zerolinewidth: 1.5,
      linecolor: '#dbe3ec', ticks: 'outside', tickcolor: '#dbe3ec',
      scaleanchor: undefined,
    },
    ...overrides,
  };
}

export const config = {
  responsive: true,
  displayModeBar: false,
  scrollZoom: false,
  doubleClick: false,
} as any;

/** 数值导数（中心差分） */
export function numericalDerivative(f: (x: number) => number, x: number, h = 1e-5): number {
  return (f(x + h) - f(x - h)) / (2 * h);
}

/** 数值积分（复合梯形） */
export function numericalIntegral(f: (x: number) => number, a: number, b: number, n = 1000): number {
  if (b <= a) return 0;
  const h = (b - a) / n;
  let s = 0.5 * (f(a) + f(b));
  for (let i = 1; i < n; i++) s += f(a + i * h);
  return s * h;
}
