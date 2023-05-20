// DOM elements
const loginSection = document.getElementById('loginSection');
const loginForm = document.getElementById('loginForm');
const signupSection = document.getElementById('signupSection');
const signupForm = document.getElementById('signupForm');
const postsSection = document.getElementById('postsSection');
const createPostSection = document.getElementById('createPostSection');
const createPostForm = document.getElementById('createPostForm');
const postsContainer = document.getElementById('postsContainer');

// Hide signup and create post sections by default
signupSection.style.display = 'none';
createPostSection.style.display = 'none';

// Login form submit handler
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const username = formData.get('username');
  const password = formData.get('password');
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    showPostsSection();
  } else {
    alert(data.message);
  }
});

// Signup form submit handler
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const username = formData.get('username');
  const password = formData.get('password');
  const response = await fetch('/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    showPostsSection();
  } else {
    alert(data.message);
  }
});

// Create post form submit handler
createPostForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(createPostForm);
  const title = formData.get('title');
  const content = formData.get('content');
  const token = localStorage.getItem('token');
  const response = await fetch('/posts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ title, content }),
  });
  const data = await response.json();
  if (response.ok) {
    createPostForm.reset();
    fetchPosts();
  } else {
    alert(data.message);
  }
});

// Show login section
const showLoginSection = () => {
  loginSection.style.display = 'block';
  signupSection.style.display = 'none';
  createPostSection.style.display = 'none';
  postsSection.style.display = 'none';
};

// Show signup section
const showSignupSection = () => {
  loginSection.style.display = 'none';
  signupSection.style.display = 'block';
  createPostSection.style.display = 'none';
  postsSection.style.display = 'none';
};

// Show posts section
const showPostsSection = () => {
  loginSection.style.display = 'none';
  signupSection.style.display = 'none';
  createPostSection.style.display = 'block';
  postsSection.style.display = 'block';
  fetchPosts();
};

// Fetch all posts
const fetchPosts = async () => {
  const response = await fetch('/posts');
  const data = await response.json();
  if (response.ok) {
    displayPosts(data.posts);
  } else {
    alert(data.message);
  }
};

// Display posts
const displayPosts = (posts) => {
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    const titleElement = document.createElement('h3');
    titleElement.textContent = post.title;
    const contentElement = document.createElement('p');
    contentElement.textContent = post.content;
    postElement.appendChild(titleElement);
    postElement.appendChild(contentElement);
    postsContainer.appendChild(postElement);
  });
};

// Check if user is logged in and show appropriate section
const token = localStorage.getItem('token');
if (token) {
  showPostsSection();
} else {
  showLoginSection();
}
