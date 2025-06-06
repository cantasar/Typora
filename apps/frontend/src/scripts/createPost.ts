const API_URL = 'http://localhost:3000';
const token = localStorage.getItem('token');

import initializeHeader from './header';

// Initialize header when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for the header HTML to be loaded
  setTimeout(initializeHeader, 100);
});

const form = document.getElementById('postForm') as HTMLFormElement;

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Failed to create post.');
      return;
    }

    // Yönlendir: kendi profiline
    const meRes = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const me = await meRes.json();

    window.location.href = `/src/pages/profile.html?username=${me.username}`;
  } catch (err) {
    console.error('Error creating post:', err);
    alert('An unexpected error occurred.');
  }
});