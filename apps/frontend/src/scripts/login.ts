const API_URL = 'http://localhost:3000';

declare global {
  interface Window {
    handleGoogleSignIn: (response: any) => void;
  }
}

// Bu fonksiyon Google tarafından otomatik çağrılır
window.handleGoogleSignIn = async function (response: any) {
  const idToken = response.credential;

  try {
    const res = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Google login failed.');
      return;
    }

    localStorage.setItem('token', data.token);
    window.location.href = `/src/pages/profile.html?username=${data.username}`;
  } catch (err) {
    console.error('Google login error:', err);
    alert('Something went wrong during Google Sign-In.');
  }
};