const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "max@gmail.com" && password === "max123") {
      window.location.href = "HOME.html";
    } else {
      alert("Invalid Email or Password.");
    }
});

const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function () {
  if (passwordInput.type === 'password') {
     passwordInput.type = 'text';
      togglePassword.classList.remove('bx-low-vision');
      togglePassword.classList.add('bx-show');
    } else {
        passwordInput.type = 'password';
        togglePassword.classList.remove('bx-show');
        togglePassword.classList.add('bx-low-vision');
    }
});