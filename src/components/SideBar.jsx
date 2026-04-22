import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './SideBar.css';

export const SideBar = ({ setError }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setError(error.response?.data?.message);
      });
  };

  return (
    <aside className="sidebar">
      {/* Логотип */}
      <div className="logo">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
        AuthOS
      </div>

      {/* Основна навігація */}
      <nav className="nav-links">
        <NavLink
          to="./profile"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Profile
        </NavLink>
        <NavLink
          to="./dashboard"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="7" height="9" rx="1"></rect>
            <rect x="14" y="3" width="7" height="5" rx="1"></rect>
            <rect x="14" y="12" width="7" height="9" rx="1"></rect>
            <rect x="3" y="16" width="7" height="5" rx="1"></rect>
          </svg>
          Dashboard
        </NavLink>
        <NavLink
          to="./security"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Security
        </NavLink>
      </nav>

      {/* Блок автентифікації внизу сайдбару */}
      <div
        className="logout"
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {user ? (
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{ color: 'var(--error)' }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Exit from app
          </button>
        ) : (
          <div
            style={{
              padding: '0 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Link
              to="/login"
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Log in
            </Link>
            <Link
              to="/sign-up"
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};
