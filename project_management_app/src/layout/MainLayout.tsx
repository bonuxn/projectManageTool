import { Outlet, Link } from 'react-router';
import './MainLayout.css';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  return (
    <div className="app-container">
      <header className="topbar">トップバー</header>
      <div className="row justify-content-start">
        
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <Outlet /> {/* ここが切り替わる */}
        </div>
      </div>
    </div>
  );
}