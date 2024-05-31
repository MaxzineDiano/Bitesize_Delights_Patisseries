document.getElementById('logout-button').addEventListener('click', function(event) {
    event.preventDefault();
    if (confirm('Do you really want to logout?')) {
        window.location.href = 'index.html';
    }
});
