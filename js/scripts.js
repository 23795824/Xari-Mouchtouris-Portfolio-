// scripts.js

// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Allow animations if AOS is present; otherwise keep content visible
  document.body.classList.add('no-aos');

  const maybeInitAOS = () => {
    if (!window.AOS) return;
    AOS.init({ once: true });
    document.body.classList.remove('no-aos');
  };

  maybeInitAOS();

  // Flag when Glide is unavailable so skills/projects fall back to static grid
  if (!window.Glide) {
    document.body.classList.add('no-glide');
  }

  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');

  const toggleSidebar = () => {
    if (!sidebar) return;
    const isOpen = sidebar.classList.toggle('active');
    document.body.classList.toggle('sidebar-active', isOpen);
  };

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar?.classList.remove('active');
      document.body.classList.remove('sidebar-active');
    });
  }

  const form = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (!form || !formFeedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    const submitBtn = form.querySelector('button[type="submit"]');

    // Input validation
    if (!formData.name || !formData.email || !formData.message) {
      if (formFeedback) {
        formFeedback.textContent = 'Please fill out all required fields.';
        formFeedback.classList.add('error');
        formFeedback.classList.remove('success');
      }
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

      await response.json();
      if (formFeedback) {
        formFeedback.textContent = `Thank you, ${formData.name}! Your message has been sent.`;
        formFeedback.classList.add('success');
        formFeedback.classList.remove('error');
      }
      form.reset();
    } catch (error) {
      console.error('Full Error Details:', error);
      if (formFeedback) {
        formFeedback.textContent = `Failed to send message: ${error.message}`;
        formFeedback.classList.add('error');
        formFeedback.classList.remove('success');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
});
