import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * 轻量文本渲染器：把正文中的行内 $...$、独立 $$...$$ 用 KaTeX 渲染，
 * 并支持 **加粗** 与 `代码`。内容是纯字符串，避免 dangerouslySetInnerHTML 滥用。
 */
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return out;
}

/** 把一段可能含 $...$ / $$...$$ 的文本转为 HTML 字符串 */
export function renderMath(text: string): string {
  const parts: string[] = [];
  // 先按 $$...$$ 切，再对每段按 $...$ 切
  const blockRe = /\$\$([\s\S]+?)\$\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  const flushInline = (seg: string) => {
    let p = 0;
    let im: RegExpExecArray | null;
    const re = /\$([^$\n]+?)\$/g;
    while ((im = re.exec(seg))) {
      parts.push(inline(seg.slice(p, im.index)));
      try {
        parts.push(katex.renderToString(im[1], { throwOnError: false, displayMode: false }));
      } catch {
        parts.push('$' + escapeHtml(im[1]) + '$');
      }
      p = im.index + im[0].length;
    }
    parts.push(inline(seg.slice(p)));
  };
  while ((m = blockRe.exec(text))) {
    flushInline(text.slice(last, m.index));
    try {
      parts.push(
        '<div class="math-block">' +
          katex.renderToString(m[1], { throwOnError: false, displayMode: true }) +
          '</div>'
      );
    } catch {
      parts.push('<div class="math-block">$$' + escapeHtml(m[1]) + '$$</div>');
    }
    last = m.index + m[0].length;
  }
  flushInline(text.slice(last));
  return parts.join('');
}

interface Props {
  text: string;
  className?: string;
  as?: 'span' | 'div' | 'p';
}

export default function MathText({ text, className = '', as = 'div' }: Props) {
  const html = useMemo(() => renderMath(text), [text]);
  const Tag = as;
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** 只渲染一段 LaTeX 公式 */
export function Formula({ latex, display = false, className = '' }: { latex: string; display?: boolean; className?: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, { throwOnError: false, displayMode: display });
    } catch {
      return escapeHtml(latex);
    }
  }, [latex, display]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
