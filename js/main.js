// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Scroll to top button
    const scrollToTop = document.querySelector('.scroll-to-top');
    
    if (scrollToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTop.style.display = 'flex';
            } else {
                scrollToTop.style.display = 'none';
            }
        });
        
        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    const galleryContainer = document.querySelector('.gallery-container');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (galleryContainer && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            galleryContainer.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            galleryContainer.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        });
    }
    
    // Form submission handling
    const contactForm = document.querySelector('.form-container');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Booking button functionality
    const bookBtn = document.querySelector('.book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', function() {
            showNotification('Booking system coming soon! Please call us directly.', 'info');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinksItems = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(a => a.removeAttribute('aria-current'));
                this.setAttribute('aria-current', 'page');
            }
        });
    });
    
    // Add scroll effect to header - DISABLED (navbar stays fixed)
    // const header = document.querySelector('header');
    // let lastScrollTop = 0;
    
    // window.addEventListener('scroll', function() {
    //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
    //     if (scrollTop > lastScrollTop && scrollTop > 100) {
    //         // Scrolling down
    //         header.style.transform = 'translateY(-100%)';
    //     } else {
    //         // Scrolling up
    //         header.style.transform = 'translateY(0)';
    //     }
        
    //     lastScrollTop = scrollTop;
    // });
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Gallery item click to view
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            showNotification(`Gallery image ${index + 1} - Full screen view coming soon!`, 'info');
        });
    });
    
    // WhatsApp button functionality
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.textContent.trim();
            showNotification(`Opening WhatsApp for ${phoneNumber}...`, 'info');
            // In a real implementation, this would open WhatsApp
            setTimeout(() => {
                window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`, '_blank');
            }, 1000);
        });
    }
    
    // Pricing cards functionality
    const cardBtns = document.querySelectorAll('.card-btn');
    cardBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cardTitle = this.closest('.pricing-card').querySelector('h3').textContent;
            showNotification(`Booking ${cardTitle} - Coming soon! Please call us directly.`, 'info');
        });
    });
    
    // Update current time in working hours
    updateWorkingHoursStatus();
    setInterval(updateWorkingHoursStatus, 60000); // Update every minute
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function updateWorkingHoursStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    // Check if within working hours (9:00 - 19:00)
    const isOpen = (day >= 1 && day <= 6) && currentTime >= 540 && currentTime <= 1140; // 9*60 to 19*60
    
    // Update status indicator if needed
    const statusElement = document.querySelector('.hours-status');
    if (statusElement) {
        statusElement.textContent = isOpen ? 'Open Now' : 'Closed';
        statusElement.style.color = isOpen ? '#28a745' : '#dc3545';
    }
}

// Debounce function for future use
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading styles for lazy loaded images
const style = document.createElement('style');
style.textContent = `
    img[loading="lazy"] {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    img[loading="lazy"].loaded {
        opacity: 1;
    }
    
    .notification {
        font-family: var(--font-family, Arial, sans-serif);
        font-size: 14px;
        line-height: 1.4;
    }
    
    @media (max-width: 480px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);
