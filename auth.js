document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem('user');
    if (!user) window.location.href = 'login.html';

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) logoutBtn.addEventListener("click", () => {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
});