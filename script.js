document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-menu-link');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      // Toggle ARIA attribute for accessibility
      const isExpanded = mobileMenu.classList.contains('hidden') ? 'false' : 'true';
      menuButton.setAttribute('aria-expanded', isExpanded);
      // Change button icon
      if (!mobileMenu.classList.contains('hidden')) {
        menuButton.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>`;
      } else {
        menuButton.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>`;
      }
    });

    // Close mobile menu when a link is clicked
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
         menuButton.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>`;
      });
    });
  }

  // Smooth scroll for all anchor links (optional, as CSS handles it but good for fine-tuning or fallbacks)
  // This is especially useful for ensuring the offset from fixed header is respected
  // If html scroll-behavior:smooth and scroll-padding-top are sufficient, this can be simplified or removed.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hrefAttribute = this.getAttribute('href');
      if (hrefAttribute && hrefAttribute !== '#') { // Ensure it's not just a "#"
        const targetElement = document.querySelector(hrefAttribute);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = document.querySelector('header')?.offsetHeight || 80; // h-20 is 5rem (80px)
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Dynamic year in footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Simple scroll animations (add 'animate-scroll' class to elements you want to animate)
  // This is a very basic version. For more complex animations, Intersection Observer API is better.
  const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-in-left, .animate-fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) translateX(0)';
        // Optional: unobserve after animation to save resources
        // observer.unobserve(entry.target); 
      } else {
        // Optional: re-hide if you want animation to replay on scroll up then down
        // entry.target.style.opacity = '0';
        // if (entry.target.classList.contains('animate-fade-in-up')) entry.target.style.transform = 'translateY(20px)';
        // if (entry.target.classList.contains('animate-slide-in-left')) entry.target.style.transform = 'translateX(-20px)';
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

  animatedElements.forEach(el => {
    // Initialize styles for animation
    el.style.opacity = '0'; // Start hidden
    if (el.classList.contains('animate-fade-in-up')) el.style.transform = 'translateY(20px)';
    if (el.classList.contains('animate-slide-in-left')) el.style.transform = 'translateX(-20px)';
    
    observer.observe(el);
  });

});
