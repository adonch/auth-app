import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export const MainLayout = ({ error, setError }) => {
  return (
    <>
      <NavBar setError={setError} />
      <main>
        <section className="section">
          {/* Саме тут будуть рендеритися HomePage, LoginPage, UsersPage тощо */}
          <Outlet />
        </section>

        {error && <p className="notification is-danger is-light">{error}</p>}
      </main>
    </>
  );
};
