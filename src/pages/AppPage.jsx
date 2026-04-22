import React, { use, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SideBar } from '../components/SideBar';
import './styles.scss';
import { PAGE_TITLES } from '../login-server/utils/navigation';
const AppPage = () => {
  const toggleMenu = () => {
    console.log('toggle sidebar'); // тут зробиш логіку відкриття
  };
  const location = useLocation().pathname;
  const title = PAGE_TITLES[location] || 'Overview';
  const [error, setError] = useState(null);
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <SideBar setError={setError} />

      <main className="main-wrapper">
        <header className="header">
          <div className="header-left" style={{ flex: 1 }}>
            <button className="burger-btn" onClick={toggleMenu}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="header-title">{title}</div>
          </div>

          <div className="header-right">
            <div className="avatar">EW</div>
          </div>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppPage;
