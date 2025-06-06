const initializeHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/src/pages/login.html";
    return;
  }

  fetch("http://localhost:3000/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((user) => {
      if (user.username) {
        const profileLink = document.getElementById("profile-link");
        if (profileLink) {
          profileLink.setAttribute(
            "href",
            `/src/pages/profile.html?username=${user.username}`
          );

          const avatar = profileLink.querySelector("div");
          if (avatar) {
            avatar.textContent = user.name?.charAt(0).toUpperCase() || "U";
          }
        }
      }
    })
    .catch((err) => {
      console.error("Failed to load user profile:", err);
    });

  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "/src/pages/login.html";
    });
  }
};

export default initializeHeader;
