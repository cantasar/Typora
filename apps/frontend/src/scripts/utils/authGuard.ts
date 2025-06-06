// Kullanıcının token'ı var mı?
export function isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  return !!token;
}

// Login olmuşsa bu sayfaya erişmesin
export function redirectIfLoggedIn(): void {
  if (isLoggedIn()) {
    window.location.href = '/src/pages/feed.html';
  }
}

// Login olmamışsa bu sayfaya erişemesin
export function redirectIfNotLoggedIn(): void {
  if (!isLoggedIn()) {
    window.location.href = '/src/pages/login.html';
  }
}