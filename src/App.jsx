import React, { use, useContext, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  NavLink,
  useLocation,
} from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.scss';

import { AccountActivationPage } from './pages/AccountActivationPage';
import { AuthContext } from './components/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RequireAuth } from './components/RequireAuth';
import { UsersPage } from './pages/UsersPage';
import { Loader } from './components/Loader.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { usePageError } from './hooks/usePageError.js';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { NavBar } from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SecurityPage from './pages/SecurityPage.jsx';
import AppPage from './pages/AppPage.jsx';
import { MainLayout } from './components/MainLayout.jsx';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = usePageError();
  const { isChecked, user, logout, checkAuth } = useContext(AuthContext);
  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader />;
  }

  return (
    <>
      <main>
        <Routes>
          <Route element={<MainLayout error={error} setError={setError} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="sign-up" element={<RegistrationPage />} />
            <Route
              path="activate/:activationToken"
              element={<AccountActivationPage />}
            />
            <Route path="login" element={<LoginPage />} />
            <Route element={<RequireAuth />}>
              <Route path="users" element={<UsersPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route path="/app" element={<RequireAuth />}>
            <Route element={<AppPage />}>
              <Route index element={<ProfilePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="security" element={<SecurityPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
