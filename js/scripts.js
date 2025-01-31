// scripts.js

// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle event listener
    document.querySelector('.sidebar-toggle').addEventListener('click', function() {
        document.body.classList.toggle('sidebar-active');
    });

    const form = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        const submitBtn = document.querySelector('button[type="submit"]');

        // Input validation
        if (!formData.name || !formData.email || !formData.message) {
            formFeedback.textContent = 'Please fill out all required fields.';
            formFeedback.classList.add('error');
            formFeedback.classList.remove('success');
            return;
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
            formFeedback.textContent = `Thank you, ${formData.name}! Your message has been sent.`;
            formFeedback.classList.add('success');
            formFeedback.classList.remove('error');
            form.reset();
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
});
