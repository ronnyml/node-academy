import express from 'express';
import {
  getUsers,
  getUser,
  createNewUser,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller';

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(createNewUser);

router.route('/:id')
  .get(getUser)
  .put(updateUserById)
  .delete(deleteUserById);

export default router;
