// Main Application JavaScript

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeIcons();
    initializeTheme();
    initializeCart();
    initializeWishlist();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeEventListeners();
    
    // Load featured products
    loadFeaturedProducts();
    
    console.log('SMILEY App initialized successfully! 😊');
}

// Initialize Lucide icons
function initializeIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Initialize theme
function initializeTheme() {
    window.SMILEY_UTILS.themeUtils.init();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            window.SMILEY_UTILS.themeUtils.toggleTheme();
        });
    }
}

// Initialize cart
function initializeCart() {
    window.SMILEY_UTILS.cartUtils.loadCart();
}

// Initialize wishlist
function initializeWishlist() {
    window.SMILEY_UTILS.wishlistUtils.loadWishlist();
}

// Initialize navigation
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('active');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
}

function openMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileNav) {
        mobileNav.classList.add('active');
        window.SMILEY_UTILS.animationUtils.slideDown(mobileNav);
    }
    
    if (menuIcon) menuIcon.classList.add('hidden');
    if (closeIcon) closeIcon.classList.remove('hidden');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileNav) {
        window.SMILEY_UTILS.animationUtils.slideUp(mobileNav, 200);
        setTimeout(() => {
            mobileNav.classList.remove('active');
        }, 200);
    }
    
    if (menuIcon) menuIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
}

// Initialize scroll effects
function initializeScrollEffects() {
    window.SMILEY_UTILS.scrollUtils.init();
    
    // Add scroll reveal to elements
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize animations
function initializeAnimations() {
    // Animate floating fruits
    const floatingFruits = document.querySelectorAll('.floating-fruit');
    floatingFruits.forEach((fruit, index) => {
        fruit.style.animationDelay = `${index}s`;
    });
    
    // Animate bubbles
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        bubble.style.animationDelay = `${1 + index * 0.1}s`;
    });
    
    // Animate scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.style.opacity = '1';
        }, 2500);
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.SMILEY_UTILS.showToast('Cart', 'Your cart is ready! 🛒');
        });
    }
    
    // Search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            showSearchModal();
        });
    }
    
    // Account button
    const accountBtn = document.getElementById('accountBtn');
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            window.SMILEY_UTILS.showToast('Account', 'Account features coming soon! 👤');
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSignup);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.SMILEY_UTILS.scrollUtils.smoothScrollTo(target);
            }
        });
    });
}

// Load featured products
function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (!featuredProductsContainer) return;
    
    // Get first 6 products as featured
    const featuredProducts = window.SMILEY_DATA.PRODUCTS.slice(0, 6);
    
    featuredProductsContainer.innerHTML = featuredProducts
        .map((product, index) => window.SMILEY_COMPONENTS.createProductCard(product, index))
        .join('');
    
    // Re-initialize icons after adding content
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Cart functions
function addToCart(productId) {
    const product = window.SMILEY_DATA.PRODUCTS.find(p => p.id === productId);
    if (product) {
        window.SMILEY_UTILS.cartUtils.addItem(product);
    }
}

function removeFromCart(productId) {
    window.SMILEY_UTILS.cartUtils.removeItem(productId);
}

function updateCartQuantity(productId, quantity) {
    window.SMILEY_UTILS.cartUtils.updateQuantity(productId, quantity);
}

// Wishlist functions
function toggleWishlist(productId, button) {
    const isWished = window.SMILEY_UTILS.wishlistUtils.toggleWishlist(productId);
    
    if (button) {
        button.classList.toggle('active', isWished);
    }
}

// Search functions
function showSearchModal() {
    const modal = window.SMILEY_COMPONENTS.createModal(
        'Search Products',
        `
            <div class="search-modal-content">
                <div class="search-input-group">
                    <input type="text" 
                           id="searchInput" 
                           placeholder="Search for products..." 
                           class="search-input"
                           onkeyup="performSearch(this.value)">
                    <button class="search-submit-btn" onclick="performSearch(document.getElementById('searchInput').value)">
                        <i data-lucide="search"></i>
                    </button>
                </div>
                <div id="searchResults" class="search-results-container"></div>
            </div>
        `,
        [
            {
                text: 'Close',
                class: 'btn-secondary',
                onclick: 'window.SMILEY_COMPONENTS.closeModal(this)'
            }
        ]
    );
    
    // Focus on search input
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }, 100);
}

function performSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer || !query.trim()) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    const results = window.SMILEY_DATA.PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.flavor.toLowerCase().includes(query.toLowerCase())
    );
    
    resultsContainer.innerHTML = window.SMILEY_COMPONENTS.createSearchResults(query, results);
    
    // Re-initialize icons
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Newsletter signup
function handleNewsletterSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (window.SMILEY_UTILS.formUtils.validateEmail(email)) {
        // Simulate API call
        setTimeout(() => {
            window.SMILEY_UTILS.showToast(
                'Success!', 
                'Thank you for subscribing to our newsletter! 📧',
                'success'
            );
            form.reset();
        }, 500);
    } else {
        window.SMILEY_UTILS.showToast(
            'Invalid Email', 
            'Please enter a valid email address.',
            'error'
        );
    }
}

// Product filtering and sorting
function filterProducts() {
    // This would be implemented on the shop page
    console.log('Filtering products...');
}

function sortProducts(sortBy) {
    // This would be implemented on the shop page
    console.log('Sorting products by:', sortBy);
}

// Utility functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleWishlist = toggleWishlist;
window.showSearchModal = showSearchModal;
window.performSearch = performSearch;
window.handleNewsletterSignup = handleNewsletterSignup;
window.filterProducts = filterProducts;
window.sortProducts = sortProducts;

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    window.SMILEY_UTILS.showToast(
        'Error', 
        'Something went wrong. Please refresh the page.',
        'error'
    );
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
