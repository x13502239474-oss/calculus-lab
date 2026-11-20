import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { parts, allTopics, partProgress, totalProgress, findTopic } from '../data';
import { getProgress, getLastVisited, getRecent, getNotes } from '../lib/storage';

const PART_COLORS = ['#2563a6', '#0e9aa7', '#3b82a8', '#d98324', '#5c6fc4', '#7c5cc4'];
const PART_BG = ['#e8f1fa', '#e2f6f7', '#e9f0f5', '#fdf1e2', '#eef0fb', '#f3effb'];

export default function Home() {
  const [, force] = useState(0);
  useEffect(() => { force(x => x + 1); }, []);
  const progress = getProgress();
  const total = totalProgress(progress);
  const last = getLastVisited();
  const recent = getRecent();
  const notes = getNotes();

  // 当前阶段：第一个未完成的篇
  const currentPart = parts.find(p => partProgress(p.id, progress).pct < 100) || parts[parts.length - 1];
  const currentPct = partProgress(currentPart.id, progress).pct;

  // 推荐下一步：当前篇第一个未完成知识点
  const nextTopic = allTopics.find(x => x.part.id === currentPart.id && progress[x.topic.id]?.status !== 'done') || allTopics[0];

  // 今日内容：最近学习的下一条 或 推荐
  const todayTopic = last ? (findTopic(last.topicId)?.topic || nextTopic.topic) : nextTopic.topic;

  return (
    <div className="container">
      <section className="hero">
        <div className="eyebrow">Personal Mathematics Workbench</div>
        <h1>CALCULUS LAB</h1>
        <p className="lead">从数学基础到微积分，再到人工智能数学。</p>
      </section>

      {/* 当前学习阶段 */}
      <div className="stage-banner">
        <div className="lbl">当前学习阶段</div>
        <div className="stage-name">第{currentPart.number}篇 · {currentPart.title}</div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${currentPct}%` }} /></div>
        <div className="meta"><span>本篇进度 {currentPct}%</span><span>总进度 {total.pct}% · {total.done}/{total.total} 知识点</span></div>
      </div>

      {/* 今日学习内容 */}
      <div className="section-title"><span className="bar" />今日学习内容</div>
      <div className="card today-card">
        <div className="row">
          <span className="tag">继续 · {todayTopic.minutes || 15} 分钟</span>
        </div>
        <h3>{todayTopic.title}</h3>
        <p>{todayTopic.objective}</p>
        <div style={{ marginTop: 14 }}>
          <Link to={`/lesson/${todayTopic.id}`} className="cta-btn">进入学习 →</Link>
        </div>
      </div>

      {/* 数学知识地图 */}
      <div className="section-title"><span className="bar" />数学知识地图</div>
      <div className="km-wrap">
        {parts.map((p, i) => {
          const pr = partProgress(p.id, progress);
          return (
            <Link to={`/courses/${p.id}`} className="km-node" key={p.id}>
              <div className="km-num" style={{ background: PART_BG[i], color: PART_COLORS[i] }}>{String(p.number).padStart(2, '0')}</div>
              <div className="km-body">
                <div className="t">{p.title}</div>
                <div className="s">{p.subtitle} · {p.chapters.length} 章</div>
              </div>
              <div className="km-pct">{pr.pct}%</div>
              <div className="mini-track"><div className="mini-fill" style={{ width: `${pr.pct}%`, background: PART_COLORS[i] }} /></div>
            </Link>
          );
        })}
      </div>
      <div className="hint" style={{ marginTop: 4, textAlign: 'center' }}>从基础数学 → 微积分 → 人工智能数学，循序渐进</div>

      {/* 最近学习 */}
      {recent.length > 0 && (
        <>
          <div className="section-title"><span className="bar" />最近学习</div>
          <div className="card">
            {recent.slice(0, 4).map(r => (
              <div className="list-row" key={r.topicId} onClick={() => location.hash = `/lesson/${r.topicId}`}>
                <div className="lr-main">
                  <div className="lr-t">{r.topicTitle}</div>
                  <div className="lr-s">第{r.partId.slice(-1)}篇 · {new Date(r.at).toLocaleDateString('zh-CN')}</div>
                </div>
                <span style={{ color: 'var(--muted)' }}>›</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 推荐下一步 */}
      <div className="section-title"><span className="bar" />推荐下一步</div>
      <div className="card today-card">
        <div className="row"><span className="tag" style={{ background: 'var(--cyan-soft)', color: '#0a7a84' }}>{nextPartLabel(nextTopic.part.number)}</span></div>
        <h3>{nextTopic.topic.title}</h3>
        <p>{nextTopic.part.title} · {nextTopic.chapter.title}</p>
        <div style={{ marginTop: 14 }}>
          <Link to={`/lesson/${nextTopic.topic.id}`} className="cta-btn ghost">去看看 →</Link>
        </div>
      </div>

      <div style={{ height: 20 }} />
      <div className="hint" style={{ textAlign: 'center' }}>
        已记录 {notes.length} 条笔记 · 所有学习数据保存在本机
      </div>
    </div>
  );
}

function nextPartLabel(n: number) {
  return ['', '数学基础', '微积分直觉', '极限连续', '微分学', '积分学', 'AI 衔接'][n] || '课程';
}
