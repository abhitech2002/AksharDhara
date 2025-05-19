import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createBlog);
router.get('/', getBlogs);
router.get('/:id',authenticate, getBlogById);
router.put('/:id',authenticate, updateBlog);
router.delete('/:id',authenticate, deleteBlog);

export default router; 
