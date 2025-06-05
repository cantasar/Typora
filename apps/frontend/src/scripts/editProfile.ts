const API_URL = 'http://localhost:3000';
const token = localStorage.getItem('token');

const form = document.getElementById('editForm') as HTMLFormElement;

async function loadUser() {
  try {
    const res = await fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await res.json();

    if (!res.ok) {
      alert('Failed to load user info.');
      return;
    }

    (form.elements.namedItem('name') as HTMLInputElement).value = user.name;
    (form.elements.namedItem('username') as HTMLInputElement).value = user.username;
    (form.elements.namedItem('email') as HTMLInputElement).value = user.email;
  } catch (err) {
    console.error('Error loading user:', err);
  }
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const updatedUser = {
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
  };

  try {
    const res = await fetch(`${API_URL}/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || 'Update failed');
      return;
    }

    alert('Profile updated!');
    window.location.href = `/src/pages/profile.html?username=${result.username}`;
  } catch (err) {
    console.error('Error updating profile:', err);
  }
});

loadUser();