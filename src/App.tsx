import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Lesson from './pages/Lesson';
import Tools from './pages/Tools';
import Notes from './pages/Notes';
import Profile from './pages/Profile';
import Search from './pages/Search';

function BottomNav() {
  const { pathname } = useLocation();
  const items = [
    { to: '/', ico: '⌂', label: '首页', match: (p: string) => p === '/' },
    { to: '/courses', ico: '▤', label: '课程', match: (p: string) => p.startsWith('/courses') || p.startsWith('/lesson') },
    { to: '/tools', ico: '∑', label: '数学工具', match: (p: string) => p.startsWith('/tools') },
    { to: '/notes', ico: '✎', label: '笔记', match: (p: string) => p.startsWith('/notes') },
    { to: '/profile', ico: '◎', label: '我的', match: (p: string) => p.startsWith('/profile') },
  ];
  return (
    <nav className="bottom-nav">
      {items.map(it => (
        <Link key={it.to} to={it.to} className={it.match(pathname) ? 'active' : ''}>
          <span className="nav-ico">{it.ico}</span>
          <span>{it.label}</span>
        </Link>
      ))}
    </nav>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">∫</span>
          <span className="brand-name">CALCULUS LAB<small>从基础到微积分与 AI</small></span>
        </Link>
        <span className="topbar-spacer" />
        <Link to="/search" className="icon-btn" aria-label="搜索">⌕</Link>
      </div>
    </header>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isLesson = pathname.startsWith('/lesson');
  return (
    <div className="app-shell">
      <ScrollToTop />
      {!isLesson && <Topbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:partId" element={<Courses />} />
        <Route path="/lesson/:topicId" element={<Lesson />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
