import './style.css'

// Check if user is already logged in
const token = localStorage.getItem('token');
if (token) {
  // Redirect to feed if logged in
  window.location.href = '/src/pages/feed.html';
}

// Optional: Load trending posts
async function loadTrendingPosts() {
  try {
    const res = await fetch('http://localhost:3000/feed');
    const posts = await res.json();
    
    const trendingContainer = document.getElementById('trending-posts');
    if (!trendingContainer) return;

    // Clear demo content
    trendingContainer.innerHTML = '';
    
    // Display top 6 posts
    posts.slice(0, 6).forEach((post: any, index: number) => {
      const number = (index + 1).toString().padStart(2, '0');
      trendingContainer.innerHTML += `
        <div class="flex gap-4 items-start">
          <span class="text-3xl font-bold text-medium-gray/20">${number}</span>
          <div>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-6 h-6 rounded-full bg-medium-green text-white flex items-center justify-center text-sm">
                ${post.author.name.charAt(0)}
              </div>
              <span class="text-sm">${post.author.name}</span>
            </div>
            <h3 class="font-bold mb-2">${post.title}</h3>
            <p class="text-medium-gray text-sm">${post.content.slice(0, 100)}...</p>
          </div>
        </div>
      `;
    });
  } catch (err) {
    console.error('Error loading trending posts:', err);
  }
}

loadTrendingPosts();

