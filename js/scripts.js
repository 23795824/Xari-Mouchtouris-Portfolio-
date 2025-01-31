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


document.querySelector('.sidebar-toggle').addEventListener('click', function() {
    document.body.classList.toggle('sidebar-active');
});

const formFeedback = document.getElementById('formFeedback');

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    const submitBtn = document.querySelector('button[type="submit"]');

    // ✅ Move validation inside the event listener
    if (!formData.name || !formData.email || !formData.message) {
        formFeedback.textContent = 'Please fill out all required fields.';
        formFeedback.classList.add('error');
        formFeedback.classList.remove('success');
        return; // Exit function early
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        formFeedback.textContent = 'Thank you! Your message has been sent.';
        formFeedback.classList.add('success');
        formFeedback.classList.remove('error');
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Full Error Details:', error);
        formFeedback.textContent = `Failed to send message: ${error.message}`;
        formFeedback.classList.add('error');
        formFeedback.classList.remove('success');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});
