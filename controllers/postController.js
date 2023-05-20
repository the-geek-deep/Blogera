import Post from '../models/Post';

// Get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find().skip(skip).limit(limit);
    res.json({ posts, totalPosts });
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ message: 'Failed to get posts' });
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
    res.status(500).json({ message: 'Failed to create post' });
  }
};

// Edit a blog post
exports.editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    // Find the post with the specified postId
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Update the post
    post.title = title;
    post.content = content;
    await post.save();
    res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).json({ message: 'Failed to edit post' });
  }
};

// Delete a blog post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    // Find the post with the specified postId
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Delete the post
    await post.remove();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};
