import { userService } from '../services/user.service.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ users: users.map(userService.normalize) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};
export const userController = {
  getAllUsers,
};
