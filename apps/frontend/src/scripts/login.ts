const API_URL = 'http://localhost:3000';

declare global {
  interface Window {
    handleGoogleSignIn: (response: any) => void;
    google?: { accounts: GoogleIdentityServicesAccount };
  }
}

// Initialize Google Sign-In
function initializeGoogleSignIn() {
  if (!window.google) {
    console.warn('Google Sign-In SDK not loaded yet');
    setTimeout(initializeGoogleSignIn, 100);
    return;
  }

  window.google!.accounts.id.initialize({
    client_id: '1030213252967-4llsg7j46r2p7oj2n0ta7ljkdfd8p1be.apps.googleusercontent.com',
    callback: handleGoogleSignIn,
  });

  window.google!.accounts.id.renderButton(
    document.getElementById('g_id_signin')!,
    { theme: 'outline', size: 'large' }
  );
}

document.addEventListener('DOMContentLoaded', initializeGoogleSignIn);

// This function is called by Google after successful sign-in
async function handleGoogleSignIn(response: any) {
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