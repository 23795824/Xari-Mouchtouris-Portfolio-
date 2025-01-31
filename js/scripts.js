// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle event listener
    document.querySelector('.sidebar-toggle').addEventListener('click', function() {
      document.body.classList.toggle('sidebar-active');
    });
  
    const form = document.getElementById('contactForm');
    const feedbackModal = document.getElementById('feedbackModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModal = document.getElementById('closeModal');
  
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
        showModal('Please fill out all required fields.', 'error');
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
        form.reset();
        showModal(`Thank you, ${formData.name}! Your message has been sent.`, 'success');
      } catch (error) {
        console.error('Full Error Details:', error);
        showModal(`Failed to send message: ${error.message}`, 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  
    // Function to display the modal
    function showModal(message, type) {
      modalMessage.textContent = message;
      feedbackModal.style.display = 'block';
      const modalContent = feedbackModal.querySelector('.modal-content');
      modalContent.classList.remove('success', 'error');
  
      if (type === 'success') {
        modalContent.classList.add('success');
      } else if (type === 'error') {
        modalContent.classList.add('error');
      }
    }
  
    // Event listener to close the modal
    closeModal.addEventListener('click', () => {
      feedbackModal.style.display = 'none';
    });
  
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
      if (event.target === feedbackModal) {
        feedbackModal.style.display = 'none';
      }
    });
  
    // Optionally, close modal with Escape key
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && feedbackModal.style.display === 'block') {
        feedbackModal.style.display = 'none';
      }
    });
  });
  