import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { findTopic, allTopics } from '../data';
import LessonView from '../components/LessonView';
import { Formula } from '../components/MathText';
import {
  getProgress, toggleTopicDone, setLastVisited, pushRecent,
  saveNote, getNotes, toggleFavorite, getFavorites, addMistake,
} from '../lib/storage';
import type { Formula as FormulaT } from '../types/course';

export default function Lesson() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [, force] = useState(0);
  const [noteDraft, setNoteDraft] = useState('');
  const [toast, setToast] = useState('');
  const [noteLinked, setNoteLinked] = useState(true);
  const [showNote, setShowNote] = useState(false);

  const ctx = topicId ? findTopic(topicId) : undefined;

  useEffect(() => { force(x => x + 1); }, [topicId]);

  useEffect(() => {
    if (!ctx) return;
    setLastVisited({ topicId: ctx.topic.id, topicTitle: ctx.topic.title, chapterId: ctx.chapter.id, partId: ctx.part.id });
    pushRecent({ topicId: ctx.topic.id, topicTitle: ctx.topic.title, chapterId: ctx.chapter.id, partId: ctx.part.id });
  }, [topicId]);

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 1800);
  }

  if (!ctx) {
    return <div className="container"><div className="empty-state"><p>找不到这个知识点</p><Link to="/courses">返回课程目录</Link></div></div>;
  }

  const { part, chapter, topic } = ctx;
  const progress = getProgress();
  const isDone = progress[topic.id]?.status === 'done';
  const idx = allTopics.findIndex(x => x.topic.id === topic.id);
  const prev = idx > 0 ? allTopics[idx - 1] : null;
  const next = idx < allTopics.length - 1 ? allTopics[idx + 1] : null;

  const formulas = (topic.blocks.keyFormulas || []).filter(Boolean) as FormulaT[];

  function handleDone() {
    const nowDone = toggleTopicDone(topic.id);
    force(x => x + 1);
    flash(nowDone ? '✓ 已标记为学完' : '已取消完成标记');
  }

  function handleSaveNote() {
    if (!noteDraft.trim()) { flash('先写点内容吧'); return; }
    saveNote({
      id: `note-${Date.now()}`,
      topicId: noteLinked ? topic.id : undefined,
      topicTitle: noteLinked ? topic.title : undefined,
      content: noteDraft.trim(),
      created: Date.now(), updated: Date.now(),
    });
    setNoteDraft('');
    flash('✓ 笔记已保存');
  }

  function handleFav(f: FormulaT, i: number) {
    const added = toggleFavorite({
      id: `${topic.id}-fav-${i}`,
      latex: f.latex, label: f.meaning || topic.title, topicId: topic.id,
    });
    flash(added ? '✓ 已收藏公式' : '已取消收藏');
  }

  function handleMistake() {
    addMistake({ id: `mist-${topic.id}-${Date.now()}`, topicId: topic.id, topicTitle: topic.title, note: '标记为易错知识点' });
    flash('✓ 已加入易错本');
  }

  return (
    <div className="container">
      <div className="lesson-head">
        <div className="crumb">
          <Link to="/courses">课程</Link> › <Link to={`/courses/${part.id}`}>第{part.number}篇 {part.title}</Link> › 第{chapter.number}章
        </div>
        <h1>{topic.title}</h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="objective-chip">◎ {topic.objective}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>约 {topic.minutes || 15} 分钟</span>
        </div>
      </div>

      <LessonView blocks={topic.blocks} />

      {/* 收藏公式区 */}
      {formulas.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div className="section-title"><span className="bar" />本课公式 · 点收藏</div>
          <div className="card" style={{ padding: '6px 14px' }}>
            {formulas.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < formulas.length - 1 ? '1px solid var(--line-2)' : '' }}>
                <div style={{ flex: 1, overflowX: 'auto', fontSize: 13 }}><Formula latex={f.latex} /></div>
                <button className="icon-btn" style={{ width: 30, height: 30, fontSize: 14 }} onClick={() => handleFav(f, i)} title="收藏公式">
                  {getFavorites().some(x => x.id === `${topic.id}-fav-${i}`) ? '★' : '☆'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 笔记与易错 */}
      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <button className="cta-btn ghost" onClick={() => setShowNote(s => !s)}>✎ 记笔记</button>
        <button className="cta-btn ghost" onClick={handleMistake}>⚠ 标为易错</button>
      </div>
      {showNote && (
        <div className="card" style={{ padding: 14, marginTop: 10 }}>
          <div className="field">
            <label>关于「{topic.title}」的笔记</label>
            <textarea value={noteDraft} onChange={e => setNoteDraft(e.target.value)} placeholder="记下你的疑问、心得或易错点…" />
          </div>
          <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={noteLinked} onChange={e => setNoteLinked(e.target.checked)} />
            关联到本课知识点
          </label>
          <button className="cta-btn" style={{ marginTop: 10 }} onClick={handleSaveNote}>保存笔记</button>
        </div>
      )}

      {/* 完成按钮 */}
      <div style={{ marginTop: 22 }}>
        <button className={`done-btn ${isDone ? 'is-done' : ''}`} onClick={handleDone}>
          {isDone ? '✓ 已学完 · 点此取消' : '标记本课学完'}
        </button>
      </div>

      {/* 上下课翻页 */}
      <div className="lesson-nav">
        {prev ? (
          <Link to={`/lesson/${prev.topic.id}`}><span className="d">← 上一知识点</span>{prev.topic.title}</Link>
        ) : <span className="disabled"><span className="d">← 上一知识点</span>已是第一篇</span>}
        {next ? (
          <Link to={`/lesson/${next.topic.id}`} className="next"><span className="d">下一知识点 →</span>{next.topic.title}</Link>
        ) : <span className="disabled next"><span className="d">下一知识点 →</span>已是最后</span>}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
