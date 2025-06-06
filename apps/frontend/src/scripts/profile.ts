const API_URL = 'http://localhost:3000';

import initializeHeader from './header';

// Initialize header when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for the header HTML to be loaded
  setTimeout(initializeHeader, 100);
});

const url = new URL(window.location.href);
const username = url.searchParams.get('username');
const token = localStorage.getItem('token');

const nameEl = document.getElementById('profile-name');
const usernameEl = document.getElementById('profile-username');
const postsEl = document.getElementById('profile-posts');
const editBtn = document.getElementById('edit-btn') as HTMLButtonElement;

async function fetchProfile() {
  if (!username) {
    alert('Username is missing');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/user/${username}/posts`);
    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'User not found');
      return;
    }

    const { author, posts } = data;

    nameEl!.textContent = author.name;
    usernameEl!.textContent = `@${author.username}`;

    // Eğer giriş yapan kullanıcının token'ı varsa ve aynı kişiyse, "edit" butonunu göster
    const meRes = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const me = await meRes.json();

    if (me.username === username) {
      editBtn.classList.remove('hidden');
    }

    editBtn?.addEventListener('click', () => {
      window.location.href = '/src/pages/edit-profile.html';
    });

    postsEl!.innerHTML = '';
    posts.forEach((post: any) => {
      const postEl = document.createElement('div');
      postEl.className = 'p-4 border rounded bg-gray-50';

      postEl.innerHTML = `
        <a href="/src/pages/read-post.html?u=${post.author.username}&s=${post.slug}">
  ${post.title}
</a>
        <p class="text-gray-600 text-sm">${post.content.slice(0, 150)}...</p>
      `;

      postsEl!.appendChild(postEl);
    });
  } catch (err) {
    console.error('Profile error:', err);
    alert('Failed to load profile');
  }
}

fetchProfile();