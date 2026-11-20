import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotes, getFavorites, getMistakes, deleteNote, saveNote, Note } from '../lib/storage';
import { Formula } from '../components/MathText';

type Tab = 'notes' | 'favorites' | 'mistakes';

export default function Notes() {
  const [tab, setTab] = useState<Tab>('notes');
  const [, force] = useState(0);
  useEffect(() => { force(x => x + 1); }, []);
  const notes = getNotes();
  const favorites = getFavorites();
  const mistakes = getMistakes();

  return (
    <div className="container">
      <div style={{ padding: '10px 0 4px' }}>
        <div className="hero"><div className="eyebrow">Notebook</div><h1 style={{ fontSize: 28 }}>我的笔记</h1><p className="lead">笔记、公式收藏与易错点，都保存在本机。</p></div>
      </div>
      <div className="part-tabs">
        <button className={`part-tab ${tab === 'notes' ? 'active' : ''}`} onClick={() => setTab('notes')}>笔记 ({notes.length})</button>
        <button className={`part-tab ${tab === 'favorites' ? 'active' : ''}`} onClick={() => setTab('favorites')}>公式收藏 ({favorites.length})</button>
        <button className={`part-tab ${tab === 'mistakes' ? 'active' : ''}`} onClick={() => setTab('mistakes')}>易错本 ({mistakes.length})</button>
      </div>

      {tab === 'notes' && (
        <>
          <div className="card" style={{ padding: 14, marginBottom: 14 }}>
            <NewNote onAdd={() => { force(x => x + 1); }} />
          </div>
          {notes.length === 0 ? <Empty ico="✎" text="还没有笔记，在上面写一条吧" /> :
            notes.map(n => (
              <div className="card note-card" key={n.id}>
                <div className="nc-head">
                  <div>
                    {n.topicTitle && <div className="nc-topic">关联：{n.topicTitle}</div>}
                    <div className="nc-time">{new Date(n.updated).toLocaleString('zh-CN')}</div>
                  </div>
                  <button className="del-btn" onClick={() => { deleteNote(n.id); force(x => x + 1); }}>✕</button>
                </div>
                <div className="nc-body">{n.content}</div>
                {n.topicId && <Link to={`/lesson/${n.topicId}`} style={{ fontSize: 12 }}>查看知识点 →</Link>}
              </div>
            ))}
        </>
      )}

      {tab === 'favorites' && (
        favorites.length === 0 ? <Empty ico="☆" text="还没有收藏公式，在课程页点星标收藏" /> :
          <div className="card" style={{ padding: '4px 14px' }}>
            {favorites.map((f, i) => (
              <div key={f.id} style={{ padding: '12px 0', borderBottom: i < favorites.length - 1 ? '1px solid var(--line-2)' : '' }}>
                <div style={{ overflowX: 'auto', fontSize: 14 }}><Formula latex={f.latex} display /></div>
                <div className="hint">{f.label}</div>
              </div>
            ))}
          </div>
      )}

      {tab === 'mistakes' && (
        mistakes.length === 0 ? <Empty ico="⚠" text="易错本是空的，在课程页可标记易错点" /> :
          <div className="card">
            {mistakes.map(m => (
              <div className="list-row" key={m.id} onClick={() => { if (m.topicId) location.hash = `/lesson/${m.topicId}`; }}>
                <span style={{ color: '#c6524b' }}>⚠</span>
                <div className="lr-main"><div className="lr-t">{m.topicTitle || '易错点'}</div><div className="lr-s">{m.note}</div></div>
                <button className="del-btn" onClick={e => { e.stopPropagation(); import('../lib/storage').then(s => s.removeMistake(m.id)); force(x => x + 1); }}>✕</button>
              </div>
            ))}
          </div>
      )}
      <div style={{ height: 20 }} />
    </div>
  );
}

function NewNote({ onAdd }: { onAdd: () => void }) {
  const [text, setText] = useState('');
  return <div>
    <div className="field" style={{ marginBottom: 8 }}>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="快速记一条笔记…" style={{ minHeight: 70 }} />
    </div>
    <button className="cta-btn ghost" onClick={() => {
      if (!text.trim()) return;
      saveNote({ id: `note-${Date.now()}`, content: text.trim(), created: Date.now(), updated: Date.now() });
      setText(''); onAdd();
    }}>+ 添加笔记</button>
  </div>;
}

function Empty({ ico, text }: { ico: string; text: string }) {
  return <div className="card empty-state"><div className="es-ico">{ico}</div><p>{text}</p></div>;
}
