import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { parts, partProgress } from '../data';
import { getProgress } from '../lib/storage';

export default function Courses() {
  const { partId } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [, force] = useState(0);
  useEffect(() => { force(x => x + 1); }, []);
  const progress = getProgress();

  const activePart = partId || parts[0].id;

  return (
    <div className="container">
      {/* 篇切换 tabs */}
      <div className="part-tabs">
        {parts.map(p => (
          <button key={p.id} className={`part-tab ${activePart === p.id ? 'active' : ''}`}
            onClick={() => navigate(`/courses/${p.id}`)}>
            第{p.number}篇
          </button>
        ))}
      </div>

      {parts.filter(p => p.id === activePart).map(part => {
        const pr = partProgress(part.id, progress);
        return (
          <div key={part.id}>
            <div className="part-head">
              <div className="num">PART {String(part.number).padStart(2, '0')} · {part.source}</div>
              <h1>{part.title}</h1>
              <p>{part.intro}</p>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="progress-track" style={{ flex: 1, background: 'var(--line)', height: 6 }}>
                  <div className="progress-fill" style={{ width: `${pr.pct}%`, background: 'var(--cyan)' }} />
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{pr.done}/{pr.total}</span>
              </div>
              <div className="objective-chip" style={{ marginTop: 10 }}>目标：{part.goal}</div>
            </div>

            <div className="section-title"><span className="bar" />章节目录（{part.chapters.length} 章）</div>
            {part.chapters.map(chapter => {
              const topicIds = chapter.topics.map(t => t.id);
              const done = topicIds.filter(id => progress[id]?.status === 'done').length;
              const isOpen = expanded[chapter.id] ?? (done > 0 && done < topicIds.length ? true : false);
              return (
                <div className="card chapter-card" key={chapter.id}>
                  <div className="chapter-head" onClick={() => setExpanded(e => ({ ...e, [chapter.id]: !isOpen }))}>
                    <div className="cnum">{chapter.number}</div>
                    <div style={{ flex: 1 }}>
                      <div className="ctitle">{chapter.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{chapter.topics.length} 个知识点</div>
                    </div>
                    <span className="cfrac">{done}/{topicIds.length}</span>
                    <span className="cchev" style={{ transform: isOpen ? 'rotate(90deg)' : '' }}>›</span>
                  </div>
                  {isOpen && (
                    <div className="topic-list">
                      <div style={{ padding: '11px 16px', fontSize: 12, color: 'var(--ink-2)', background: 'var(--surface-2)' }}>
                        {chapter.intro}
                      </div>
                      {chapter.topics.map(topic => {
                        const isDone = progress[topic.id]?.status === 'done';
                        return (
                          <div className="topic-row" key={topic.id} onClick={() => navigate(`/lesson/${topic.id}`)}>
                            <div className={`topic-check ${isDone ? 'done' : ''}`}>✓</div>
                            <div className="tt">{topic.title}<span className="obj">{topic.objective}</span></div>
                            <span className="tmin">{topic.minutes || 15}′</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      <div style={{ height: 20 }} />
    </div>
  );
}
