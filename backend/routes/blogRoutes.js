import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUserDrafts,
  getMyBlogs,
  togglePublishStatus,
} from '../controllers/blogController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createBlogSchema, updateBlogSchema, togglePublishSchema } from "../validators/blogValidator.js";
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.post('/', authenticate, validate(createBlogSchema), createBlog);
router.get('/', getBlogs);
router.get('/drafts', authenticate, getUserDrafts);
router.get('/my-blogs', authenticate, getMyBlogs);
router.put('/:id/toggle-publish', authenticate, validate(togglePublishSchema), togglePublishStatus);
router.get('/:id', getBlogById);
router.put('/:id', authenticate, validate(updateBlogSchema), updateBlog);
router.delete('/:id', authenticate, deleteBlog);

export default router;
