import { authClient } from '../http/authClient.js';

function register({ name, email, password }) {
  return authClient.post('/registration', { email, password, name });
}

function login({ email, password }) {
  return authClient.post('/login', { email, password });
}

function logout() {
  return authClient.post('/logout');
}

function activate(activationToken) {
  return authClient.get(`/activation/${activationToken}`);
}

function refresh() {
  return authClient.get('/refresh');
}
function changePassword({ email, oldPassword, newPassword, confirmPassword }) {
  return authClient.post('/change-password', {
    email,
    oldPassword,
    newPassword,
    confirmPassword,
  });
}

export const authService = {
  register,
  login,
  logout,
  activate,
  refresh,
  changePassword,
};
