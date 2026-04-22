import { mailer } from '../../utils/mailer.js';
import { userService } from '../services/user.service.js';
import bcrypt from 'bcrypt';
import { jwt } from '../../utils/jwt.js';
function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }

  return null;
}

function validatePassword(value) {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'Password must be at least 6 characters';
  }

  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!/\d/.test(value)) {
    return 'Password must contain at least one digit';
  }

  return null;
}
async function sendAuthentication(res, user) {
  const userData = userService.normalize(user);
  const accessToken = jwt.generateAccessToken(userData);
  const refreshToken = jwt.generateRefreshToken(userData);
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.send({
    user: userData,
    accessToken: accessToken,
  });
}
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
      name: '',
    };
    if (errors.email || errors.password) {
      return res.status(400).json({ errors });
    }
    const user = await userService.createUser({ email, password, name });
    await mailer.sendActivationLink(
      'jaime.gottlieb2@ethereal.email',
      user.activationToken,
    );

    res.status(201).json({ user: userService.normalize(user) });
  } catch (error) {
    console.error('Помилка реєстрації:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

const activate = async (req, res) => {
  try {
    const { activationToken } = req.params;
    const user = await userService.findUserByToken(activationToken);

    if (!user) {
      return res.status(404).send({ message: 'Invalid activation token' });
    }

    user.activationToken = null;
    await user.save();
    sendAuthentication(res, user);
  } catch (error) {
    console.error('Помилка активації облікового запису:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }
    if (user.activationToken) {
      return res.status(403).json({
        message: 'User is not activated',
      });
    }
    sendAuthentication(res, user);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
const logout = async (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.send({ message: 'Logged out successfully' });
};
const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const userData = jwt.validateRefreshToken(refreshToken);
  if (!userData) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const user = await userService.findUserByEmail(userData.email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await sendAuthentication(res, user);
};

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    const errors = {
      newPassword: validatePassword(newPassword),
      confirmPassword:
        newPassword === confirmPassword ? null : 'Passwords do not match',
    };
    // console.log(req.body);

    if (errors.newPassword || errors.confirmPassword) {
      return res.status(400).json({ errors });
    }
    const user = await userService.findUserByEmail(email);

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid user' });
  }
};

export const authController = {
  register,
  activate,
  login,
  refresh,
  logout,
  changePassword,
};
