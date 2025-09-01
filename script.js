// JavaScript for SMILEY Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollAnimations();
    initProductCards();
    initNewsletterSignup();
    initSmoothScrolling();
    initToastSystem();
    initSearch();
    initUserAccount();
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        
        // Add animation class
        mobileMenu.style.animation = 'mobile-menu-enter-active 0.3s ease-out forwards';
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Initialize Mobile Menu
function initMobileMenu() {
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('#mobileMenu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuIcon = document.getElementById('menuIcon');
            
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations using data-animate attributes
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));
}

// Product Cards Functionality
function initProductCards() {
    const addToCartButtons = document.querySelectorAll('button[data-action="add-to-cart"]');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            addToCart(button);
        });
    });
}

// Add to Cart Function
function addToCart(button) {
    // Add loading state
    button.classList.add('loading');
    button.textContent = 'Adding...';
    
    // Simulate API call
    setTimeout(() => {
        button.classList.remove('loading');
        button.textContent = 'Added!';
        button.style.background = '#10b981';
        
        // Show toast notification
        showToast('Product added to cart! 🛒', 'success');
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.background = '';
        }, 2000);
    }, 1000);
}

// Newsletter Signup
function initNewsletterSignup() {
    const emailInput = document.getElementById('newsletterEmail');
    const subscribeButton = document.getElementById('subscribeBtn');
    if (!emailInput || !subscribeButton) return;

    subscribeButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email || !isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Add loading state
        subscribeButton.classList.add('loading');
        subscribeButton.textContent = 'Subscribing...';
        
        // Simulate API call
        setTimeout(() => {
            subscribeButton.classList.remove('loading');
            subscribeButton.textContent = 'Subscribed!';
            subscribeButton.style.background = '#10b981';
            
            showToast('Welcome to the SMILEY family! 🎉', 'success');
            emailInput.value = '';
            
            // Reset button after delay
            setTimeout(() => {
                subscribeButton.textContent = 'Subscribe';
                subscribeButton.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Toast Notification System
function initToastSystem() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed top-20 right-4 z-50 space-y-2';
        document.body.appendChild(toastContainer);
    }
}

// Show Toast Function
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `bg-white border border-gray-200 rounded-lg shadow-lg p-4 transform translate-x-full transition-transform duration-300`;
    
    // Set icon and color based on type
    let icon, color;
    switch (type) {
        case 'success':
            icon = 'fa-check';
            color = 'text-green-500';
            break;
        case 'error':
            icon = 'fa-exclamation-triangle';
            color = 'text-red-500';
            break;
        case 'info':
            icon = 'fa-info-circle';
            color = 'text-blue-500';
            break;
        default:
            icon = 'fa-info-circle';
            color = 'text-gray-500';
    }
    
    toast.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-${type === 'success' ? 'green' : type === 'error' ? 'red' : 'blue'}-100 rounded-full flex items-center justify-center">
                <i class="fas ${icon} ${color} text-sm"></i>
            </div>
            <div>
                <p class="text-gray-900 font-medium">${message}</p>
            </div>
        </div>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Cart Functionality
function showCart() {
    showToast('Your cart is ready! 🛒', 'info');
}

// Search Functionality
function initSearch() {
    const searchButton = document.getElementById('searchBtn');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            showToast('Search feature coming soon! 🔍', 'info');
        });
    }
}

// User Account Functionality
function initUserAccount() {
    const userButton = document.getElementById('userBtn');
    if (userButton) {
        userButton.addEventListener('click', function() {
            showToast('Account features coming soon! 👤', 'info');
        });
    }
}

// Parallax Effect for Floating Fruits
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const floatingFruits = document.querySelectorAll('.floating-fruit');
        
        floatingFruits.forEach((fruit, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            fruit.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize Parallax
initParallaxEffect();

// Product Image Hover Effects
function initProductHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize Product Hover Effects
initProductHoverEffects();

// Keyboard Navigation Support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobileMenu');
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
        
        // Enter key on newsletter input
        if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'newsletterEmail') {
            const subscribeButton = document.getElementById('subscribeBtn');
            if (subscribeButton) subscribeButton.click();
        }
    });
}

// Initialize Keyboard Navigation
initKeyboardNavigation();

// Performance Optimization: Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize Lazy Loading
initLazyLoading();

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showToast('Something went wrong. Please refresh the page.', 'error');
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics Tracking (example)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Custom event tracking
    console.log('Event tracked:', eventName, eventData);
}

// Track user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_type: e.target.className
        });
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    trackEvent('form_submit', {
        form_type: e.target.className || 'unknown'
    });
});

// Export functions for global use
window.SMILEY = {
    showToast,
    addToCart,
    toggleMobileMenu,
    trackEvent
};
