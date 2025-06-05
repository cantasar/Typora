const API_URL = 'http://localhost:3000';

const url = new URL(window.location.href);
const username = url.searchParams.get('u');
const slug = url.searchParams.get('s');

if (!username || !slug) {
  alert('Invalid post URL.');
  window.location.href = '/src/pages/feed.html';
}

async function loadPost() {
  try {
    const res = await fetch(`${API_URL}/posts/${username}/${slug}`);
    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Post not found');
      return;
    }

    const titleEl = document.getElementById('post-title');
    const contentEl = document.getElementById('post-content');
    const authorEl = document.getElementById('post-author');

    titleEl!.textContent = data.title;
    contentEl!.textContent = data.content;
    authorEl!.textContent = `by @${data.author.username}`;
  } catch (err) {
    console.error('Failed to load post:', err);
    alert('Unexpected error while loading post.');
  }
}

loadPost();