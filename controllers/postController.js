const Post = require('../models/Post');

// Get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    // Create a new post
    const newPost = new Post({ title, content });
    await newPost.save();
    res.json({ message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Edit a blog post
exports.editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    // Update the post with the specified postId
    await Post.findByIdAndUpdate(postId, { title, content });
    res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a blog post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    // Delete the post with the specified postId
    await Post.findByIdAndDelete(postId);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
