import express from 'express';
import postController from '../../controllers/postController';
import authController from '../../controllers/authController';

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Home page route
router.get('/', postController.getAllPosts);

// Create a new blog post route
router.post('/create', authMiddleware.authenticateToken, postController.createPost);

// Edit a blog post route
router.put('/edit/:postId', authMiddleware.authenticateToken, postController.editPost);

// Delete a blog post route
router.delete('/delete/:postId', authMiddleware.authenticateToken, postController.deletePost);

module.exports = router;
