// Handle Logout functionality
document.getElementById("logout-btn").addEventListener("click", function() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        // Redirect to login page or perform logout action
        window.location.href = "index.html";  // Redirecting to the home page as a placeholder
    }
});
