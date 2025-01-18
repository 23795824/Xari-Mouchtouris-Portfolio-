// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents the default form submission

        // Retrieve form data
        const name = document.getElementById('name').value;

        // Simple form validation could go here

        // Display a confirmation message
        alert(`Thank you, ${name}! Your message has been sent.`);

        // Reset the form
        form.reset();
    });
});
