import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;
const { JWT_REFRESH_SECRET } = process.env;
function generateAccessToken(user) {
  return jsonwebtoken.sign(user, JWT_SECRET, { expiresIn: '10m' });
}
function generateRefreshToken(user) {
  return jsonwebtoken.sign(user, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}
function validateAccessToken(token) {
  try {
    return jsonwebtoken.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return jsonwebtoken.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
}

export const jwt = {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
};
