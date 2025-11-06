import { Outlet, Link } from 'react-router';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="app-container">
      <header className="topbar">トップバー</header>
      <div className="row justify-content-start">
        
        <div className="sidebar">
          <nav>
            <ul>
              <li><Link to="/">ホーム</Link></li>
              <li><Link to="/project">アバウト</Link></li>
              <li><Link to="/home">コンタクト</Link></li>
            </ul>
          </nav>
        </div>
        <div className="content">
          <Outlet /> {/* ここが切り替わる */}
        </div>
      </div>
    </div>
  );
}