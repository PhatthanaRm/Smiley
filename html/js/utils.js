// Utility Functions

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i data-lucide="star" class="star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i data-lucide="star-half" class="star"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i data-lucide="star" class="star empty"></i>';
    }
    
    return starsHTML;
}

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Show toast notification
function showToast(title, description, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 'alert-circle';
    
    toast.innerHTML = `
        <i data-lucide="${icon}" class="toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-description">${description}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i data-lucide="x"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Re-initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Local storage helpers
const storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return null;
        }
    },
    
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error setting to localStorage:', error);
            return false;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
};

// Cart helpers
const cartUtils = {
    addItem(product, quantity = 1) {
        const existingItem = window.SMILEY_DATA.cart.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            window.SMILEY_DATA.cart.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.imageEmoji,
                flavor: product.flavor
            });
        }
        
        this.updateCartTotal();
        this.saveCart();
        this.updateCartUI();
        
        showToast('Added to Cart', `${product.name} has been added to your cart! 🛒`);
    },
    
    removeItem(productId) {
        window.SMILEY_DATA.cart.items = window.SMILEY_DATA.cart.items.filter(item => item.id !== productId);
        this.updateCartTotal();
        this.saveCart();
        this.updateCartUI();
    },
    
    updateQuantity(productId, quantity) {
        const item = window.SMILEY_DATA.cart.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.updateCartTotal();
                this.saveCart();
                this.updateCartUI();
            }
        }
    },
    
    updateCartTotal() {
        window.SMILEY_DATA.cart.subtotal = window.SMILEY_DATA.cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        window.SMILEY_DATA.cart.shipping = window.SMILEY_DATA.cart.subtotal > 50 ? 0 : 5.99;
        window.SMILEY_DATA.cart.tax = window.SMILEY_DATA.cart.subtotal * 0.08;
        window.SMILEY_DATA.cart.total = window.SMILEY_DATA.cart.subtotal + window.SMILEY_DATA.cart.shipping + window.SMILEY_DATA.cart.tax;
    },
    
    saveCart() {
        storage.set('smiley_cart', window.SMILEY_DATA.cart);
    },
    
    loadCart() {
        const savedCart = storage.get('smiley_cart');
        if (savedCart) {
            window.SMILEY_DATA.cart = savedCart;
        }
        this.updateCartUI();
    },
    
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = window.SMILEY_DATA.cart.items.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    },
    
    clearCart() {
        window.SMILEY_DATA.cart = {
            items: [],
            total: 0,
            subtotal: 0,
            shipping: 0,
            tax: 0
        };
        this.saveCart();
        this.updateCartUI();
    }
};

// Wishlist helpers
const wishlistUtils = {
    addToWishlist(productId) {
        if (!window.SMILEY_DATA.wishlist.includes(productId)) {
            window.SMILEY_DATA.wishlist.push(productId);
            this.saveWishlist();
            showToast('Added to Wishlist', 'Product added to your wishlist! ❤️');
        }
    },
    
    removeFromWishlist(productId) {
        window.SMILEY_DATA.wishlist = window.SMILEY_DATA.wishlist.filter(id => id !== productId);
        this.saveWishlist();
    },
    
    toggleWishlist(productId) {
        if (this.isInWishlist(productId)) {
            this.removeFromWishlist(productId);
            return false;
        } else {
            this.addToWishlist(productId);
            return true;
        }
    },
    
    isInWishlist(productId) {
        return window.SMILEY_DATA.wishlist.includes(productId);
    },
    
    saveWishlist() {
        storage.set('smiley_wishlist', window.SMILEY_DATA.wishlist);
    },
    
    loadWishlist() {
        const savedWishlist = storage.get('smiley_wishlist');
        if (savedWishlist) {
            window.SMILEY_DATA.wishlist = savedWishlist;
        }
    }
};

// Theme helpers
const themeUtils = {
    init() {
        const savedTheme = storage.get('smiley_theme') || 'light';
        this.setTheme(savedTheme);
    },
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        storage.set('smiley_theme', theme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'moon' : 'sun');
            if (window.lucide) {
                lucide.createIcons();
            }
        }
    },
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
};

// Scroll helpers
const scrollUtils = {
    init() {
        this.setupScrollReveal();
        this.setupScrollToTop();
    },
    
    setupScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    },
    
    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollToTopBtn) {
            window.addEventListener('scroll', throttle(() => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            }, 100));
            
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    },
    
    smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Form helpers
const formUtils = {
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.validateEmail(input.value)) {
                this.showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            } else {
                this.clearFieldError(input);
            }
        });
        
        return isValid;
    },
    
    showFieldError(input, message) {
        this.clearFieldError(input);
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    },
    
    clearFieldError(input) {
        input.classList.remove('error');
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
};

// Animation helpers
const animationUtils = {
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = performance.now();
        
        function animate(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    fadeOut(element, duration = 300) {
        let start = performance.now();
        const initialOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = initialOpacity * (1 - progress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    slideDown(element, duration = 300) {
        element.style.height = '0';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        const targetHeight = element.scrollHeight;
        let start = performance.now();
        
        function animate(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.height = (targetHeight * progress) + 'px';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    slideUp(element, duration = 300) {
        const initialHeight = element.offsetHeight;
        element.style.height = initialHeight + 'px';
        element.style.overflow = 'hidden';
        
        let start = performance.now();
        
        function animate(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.height = (initialHeight * (1 - progress)) + 'px';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
                element.style.height = 'auto';
                element.style.overflow = 'visible';
            }
        }
        
        requestAnimationFrame(animate);
    }
};

// Export utilities
window.SMILEY_UTILS = {
    formatCurrency,
    formatDate,
    generateStarRating,
    debounce,
    throttle,
    showToast,
    storage,
    cartUtils,
    wishlistUtils,
    themeUtils,
    scrollUtils,
    formUtils,
    animationUtils
};
