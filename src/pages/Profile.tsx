import { useEffect, useState } from 'react';
import { parts, allTopics, totalProgress, partProgress } from '../data';
import { getProgress, getNotes, getFavorites, getMistakes, clearAllProgress, getRecent } from '../lib/storage';

export default function Profile() {
  const [, force] = useState(0);
  useEffect(() => { force(x => x + 1); }, []);
  const progress = getProgress();
  const total = totalProgress(progress);
  const notes = getNotes();
  const favorites = getFavorites();
  const mistakes = getMistakes();
  const recent = getRecent();

  function reset() {
    if (window.confirm('确定要清空所有学习进度、笔记和收藏吗？此操作不可恢复。')) {
      clearAllProgress();
      force(x => x + 1);
    }
  }

  return (
    <div className="container">
      <div style={{ padding: '10px 0 4px' }}>
        <div className="hero"><div className="eyebrow">Profile</div><h1 style={{ fontSize: 28 }}>我的学习</h1></div>
      </div>

      <div className="stat-grid">
        <div className="stat-box"><div className="v">{total.pct}%</div><div className="k">总进度</div></div>
        <div className="stat-box"><div className="v">{total.done}</div><div className="k">已学知识点</div></div>
        <div className="stat-box"><div className="v">{notes.length}</div><div className="k">笔记</div></div>
      </div>

      <div className="section-title"><span className="bar" />各篇进度</div>
      <div className="card" style={{ padding: '6px 14px' }}>
        {parts.map((p, i) => {
          const pr = partProgress(p.id, progress);
          return (
            <div key={p.id} style={{ padding: '11px 0', borderBottom: i < parts.length - 1 ? '1px solid var(--line-2)' : '' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>第{p.number}篇 · {p.title}</span>
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{pr.done}/{pr.total}</span>
              </div>
              <div className="progress-track" style={{ marginTop: 7, background: 'var(--line)', height: 5 }}>
                <div className="progress-fill" style={{ width: `${pr.pct}%`, background: '#2563a6' }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-title"><span className="bar" />学习数据</div>
      <div className="card">
        <div className="list-row"><div className="lr-main"><div className="lr-t">公式收藏</div></div><span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{favorites.length}</span></div>
        <div className="list-row"><div className="lr-main"><div className="lr-t">易错知识点</div></div><span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{mistakes.length}</span></div>
        <div className="list-row"><div className="lr-main"><div className="lr-t">浏览记录</div></div><span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{recent.length}</span></div>
        <div className="list-row"><div className="lr-main"><div className="lr-t">课程知识点总数</div></div><span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{allTopics.length}</span></div>
      </div>

      <div className="section-title"><span className="bar" />数据管理</div>
      <div className="card" style={{ padding: 14 }}>
        <p className="hint" style={{ marginTop: 0 }}>
          所有学习数据（进度、笔记、收藏、易错点）都保存在这台设备的浏览器里，刷新或重新打开不会丢失。不需要账号，也不上传云端。
        </p>
        <button className="cta-btn ghost" style={{ color: '#c6524b', borderColor: '#f0c9c6' }} onClick={reset}>清空所有学习数据</button>
      </div>

      <div style={{ height: 20 }} />
      <div className="hint" style={{ textAlign: 'center' }}>CALCULUS LAB · 从数学基础到人工智能数学</div>
    </div>
  );
}
