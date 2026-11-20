import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchTopics } from '../data';

export default function Search() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const results = searchTopics(q);

  return (
    <div className="container">
      <div style={{ padding: '10px 0 4px' }}>
        <div className="hero"><div className="eyebrow">Search</div><h1 style={{ fontSize: 28 }}>搜索知识点</h1><p className="lead">在全部课程内容中检索。</p></div>
      </div>
      <div className="search-bar">
        <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="输入关键词，如：极限、导数、链式法则、log…" />
      </div>
      {q.trim() && (
        <div className="hint" style={{ marginBottom: 10 }}>找到 {results.length} 个相关知识点</div>
      )}
      {results.length > 0 && (
        <div className="card">
          {results.map(({ part, chapter, topic }) => (
            <div className="list-row" key={topic.id} onClick={() => navigate(`/lesson/${topic.id}`)}>
              <div className="lr-main">
                <div className="lr-t">{topic.title}</div>
                <div className="lr-s">第{part.number}篇 {part.title} · 第{chapter.number}章 {chapter.title}</div>
                <div className="lr-s" style={{ marginTop: 2 }}>{topic.objective}</div>
              </div>
              <span style={{ color: 'var(--muted)' }}>›</span>
            </div>
          ))}
        </div>
      )}
      {q.trim() && results.length === 0 && <div className="card empty-state"><div className="es-ico">⌕</div><p>没有找到相关内容，换个关键词试试</p></div>}
      {!q.trim() && <div className="card empty-state"><div className="es-ico">⌕</div><p>输入关键词开始搜索</p></div>}
      <div style={{ height: 20 }} />
    </div>
  );
}
