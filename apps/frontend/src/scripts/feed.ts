const API_URL = "http://localhost:3000";
const token = localStorage.getItem("token");

import initializeHeader from './header';

// Initialize header when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for the header HTML to be loaded
  setTimeout(initializeHeader, 100);
});

async function loadFeed() {
  try {
    const res = await fetch(`${API_URL}/feed`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const data = await res.json();

    const feedContainer = document.getElementById("feed");
    if (!feedContainer) return;

    if (!res.ok) {
      feedContainer.innerHTML = `<p class="text-red-600">${
        data.message || "Failed to load feed."
      }</p>`;
      return;
    }

    if (data.length === 0) {
      feedContainer.innerHTML = `<p class="text-gray-600">No posts yet.</p>`;
      return;
    }

    data.forEach((post: any) => {
      const postEl = document.createElement("div");
      postEl.className = "bg-white p-4 rounded shadow";
      postEl.innerHTML = `
        <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
        <p class="text-gray-700">${post.content}</p>
        <a href="/src/pages/profile.html?username=${post.author.username}">
          @${post.author.username}
        </a>
      `;
      feedContainer.appendChild(postEl);
    });
  } catch (err) {
    console.error("Error loading feed:", err);
  }
}


loadFeed();

