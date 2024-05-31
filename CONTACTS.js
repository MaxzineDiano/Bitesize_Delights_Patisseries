document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form fields
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate fields
    if (!name || !email || !message) {
      displayNotification("All fields are required", false);
      return;
    }

    // Assuming form is successfully sent
    contactForm.reset();
    displayNotification("Your message has been sent successfully!", true);
  });

  function displayNotification(message, isSuccess) {
    const notification = document.createElement("div");
    notification.className = `notification ${isSuccess ? "success" : "error"}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
});
