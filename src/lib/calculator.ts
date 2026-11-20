import { evaluate } from 'mathjs';

/** 科学计算器求值：把界面符号转成 mathjs 表达式 */
export function evalExpr(input: string): { ok: boolean; value: string } {
  const expr = input.trim();
  if (!expr) return { ok: false, value: '空' };
  try {
    // mathjs 支持 sin/cos/tan/ln/log/sqrt/pi/e/^ 等
    const result = evaluate(expr);
    let v: number;
    if (typeof result === 'number') v = result;
    else if (result && typeof (result as any).toNumber === 'function') v = (result as any).toNumber();
    else return { ok: false, value: '不支持的结果类型' };
    if (!isFinite(v)) return { ok: false, value: '结果无穷' };
    // 保留合理精度
    const rounded = Math.abs(v) >= 1e10 || (v !== 0 && Math.abs(v) < 1e-6)
      ? v.toExponential(6)
      : parseFloat(v.toFixed(10)).toString();
    return { ok: true, value: rounded };
  } catch {
    return { ok: false, value: '表达式有误' };
  }
}
