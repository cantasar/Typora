const API_URL = 'http://localhost:3000';

const loginForm = document.getElementById('loginForm') as HTMLFormElement;

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Login failed.');
      return;
    }

    localStorage.setItem('token', data.token);
    window.location.href = '/src/pages/feed.html'; // yönlendir
  } catch (err) {
    console.error('Login error:', err);
    alert('Login request failed.');
  }
});

const registerForm = document.getElementById('registerForm') as HTMLFormElement;

registerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const name = formData.get('name');
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Registration failed.');
      return;
    }

    alert('Registration successful! Redirecting to login...');
    window.location.href = '/src/pages/login.html';
  } catch (err) {
    console.error('Register error:', err);
    alert('Registration request failed.');
  }
});