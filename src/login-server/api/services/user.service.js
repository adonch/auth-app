import { v4 as uuidv4 } from 'uuid';
import { User } from '../../models/User.model.js';
import bcrypt from 'bcrypt';

function normalize({ id, email, name }) {
  return {
    id,
    email,
    name,
  };
}
function findUserByEmail(email) {
  return User.findOne({ where: { email } });
}
function findUserByToken(activationToken) {
  return User.findOne({ where: { activationToken } });
}
function getAllUsers() {
  return User.findAll({ where: { activationToken: null } });
}
async function createUser({ email, password, name }) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const activationToken = uuidv4();
  const user = await User.create({
    email,
    password: hashedPassword,
    activationToken,
    name
  });
  return user;
}

export const userService = {
  findUserByEmail,
  createUser,
  normalize,
  findUserByToken,
  getAllUsers,
};
