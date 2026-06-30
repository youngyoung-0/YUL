document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Hamburger Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Initialize modular interactive tools
  if (typeof window.initCardDuel === 'function') {
    window.initCardDuel();
  }
  
  if (typeof window.initSavingsCalculator === 'function') {
    window.initSavingsCalculator();
  }

  // Waitlist Form Handler
  const waitlistForm = document.getElementById('waitlist-form');
  const waitlistEmail = document.getElementById('waitlist-email');
  const waitlistSuccess = document.getElementById('waitlist-success');
  const submittedEmailSpan = document.getElementById('submitted-email');

  if (waitlistForm && waitlistEmail && waitlistSuccess && submittedEmailSpan) {
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = waitlistEmail.value.trim();
      
      if (email) {
        // Disable submit button & change text to show sending state
        const submitBtn = document.getElementById('waitlist-submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '전송 중... <i class="fa-solid fa-spinner fa-spin" style="margin-left: 6px;"></i>';
        submitBtn.disabled = true;

        try {
          const formData = new FormData(waitlistForm);
          formData.append("access_key", "4245891b-4f91-46b9-b9d9-d021f6554957");

          // Save to localStorage too for backup/local testing
          const waitlist = JSON.parse(localStorage.getItem('yul_waitlist') || '[]');
          if (!waitlist.includes(email)) {
            waitlist.push(email);
            localStorage.setItem('yul_waitlist', JSON.stringify(waitlist));
          }

          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
          });

          const data = await response.json();

          if (response.ok) {
            // Display success state
            submittedEmailSpan.textContent = email;
            waitlistForm.style.display = 'none';
            waitlistSuccess.style.display = 'block';
            waitlistForm.reset();
          } else {
            alert("에러가 발생했습니다: " + data.message);
          }
        } catch (error) {
          alert("네트워크 에러가 발생했습니다. 다시 시도해 주세요.");
        } finally {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});
