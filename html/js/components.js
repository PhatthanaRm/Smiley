// Component Functions

// Product Card Component
function createProductCard(product, index = 0) {
    const isInWishlist = window.SMILEY_UTILS.wishlistUtils.isInWishlist(product.id);
    
    return `
        <div class="product-card scroll-reveal" style="animation-delay: ${index * 0.1}s">
            ${product.badges && product.badges[0] ? `
                <div class="product-badge">${product.badges[0]}</div>
            ` : ''}
            
            <div class="product-image">
                <div class="product-emoji" style="background: linear-gradient(135deg, ${product.gradientFrom || '#e5e7eb'}, ${product.gradientTo || '#d1d5db'})">
                    ${product.imageEmoji || '🦷'}
                </div>
                
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                        onclick="toggleWishlist('${product.id}', this)"
                        aria-label="Toggle wishlist">
                    <i data-lucide="heart" class="wishlist-icon"></i>
                </button>
            </div>
            
            <div class="product-content">
                <div>
                    <a href="product.html?id=${product.id}" class="product-title-link">
                        <h3 class="product-title">${product.name}</h3>
                    </a>
                    <p class="product-description">${product.description}</p>
                </div>
                
                <div class="product-rating">
                    <div class="stars">
                        ${window.SMILEY_UTILS.generateStarRating(product.rating)}
                    </div>
                    <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>
                
                <div class="product-footer">
                    <span class="product-price">${window.SMILEY_UTILS.formatCurrency(product.price)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                        <i data-lucide="shopping-cart" class="btn-icon"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Blog Post Card Component
function createBlogPostCard(post, index = 0) {
    return `
        <article class="blog-card scroll-reveal" style="animation-delay: ${index * 0.1}s">
            <div class="blog-card-image">
                <div class="blog-emoji">${post.coverEmoji || '📝'}</div>
            </div>
            
            <div class="blog-card-content">
                <div class="blog-meta">
                    <span class="blog-date">${window.SMILEY_UTILS.formatDate(post.date)}</span>
                    <span class="blog-read-time">${post.readTime}</span>
                </div>
                
                <h3 class="blog-title">
                    <a href="blog-post.html?id=${post.id}">${post.title}</a>
                </h3>
                
                <p class="blog-excerpt">${post.excerpt}</p>
                
                <div class="blog-footer">
                    <span class="blog-author">By ${post.author}</span>
                    <a href="blog-post.html?id=${post.id}" class="blog-read-more">
                        Read More
                        <i data-lucide="arrow-right" class="btn-icon"></i>
                    </a>
                </div>
                
                ${post.tags ? `
                    <div class="blog-tags">
                        ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </article>
    `;
}

// Cart Item Component
function createCartItem(item) {
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <span class="cart-item-emoji">${item.image}</span>
            </div>
            
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-flavor">${item.flavor}</p>
                <span class="cart-item-price">${window.SMILEY_UTILS.formatCurrency(item.price)}</span>
            </div>
            
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">
                    <i data-lucide="minus"></i>
                </button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">
                    <i data-lucide="plus"></i>
                </button>
            </div>
            
            <div class="cart-item-total">
                ${window.SMILEY_UTILS.formatCurrency(item.price * item.quantity)}
            </div>
            
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                <i data-lucide="trash-2"></i>
            </button>
        </div>
    `;
}

// Toast Component
function createToast(title, description, type = 'success') {
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

// Loading Spinner Component
function createLoadingSpinner(size = 'medium') {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };
    
    return `
        <div class="loading-spinner ${sizeClasses[size] || sizeClasses.medium}"></div>
    `;
}

// Modal Component
function createModal(title, content, actions = []) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="modal-close" onclick="closeModal(this)">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
            ${actions.length > 0 ? `
                <div class="modal-actions">
                    ${actions.map(action => `
                        <button class="btn ${action.class || 'btn-secondary'}" onclick="${action.onclick}">
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Re-initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Add animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    return modal;
}

// Close modal function
function closeModal(button) {
    const modal = button.closest('.modal-overlay');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

// Search Component
function createSearchResults(query, results) {
    if (results.length === 0) {
        return `
            <div class="search-no-results">
                <i data-lucide="search" class="search-icon"></i>
                <h3>No results found</h3>
                <p>Try searching for something else</p>
            </div>
        `;
    }
    
    return `
        <div class="search-results">
            <div class="search-results-header">
                <h3>Search Results for "${query}"</h3>
                <span class="search-results-count">${results.length} result${results.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="search-results-list">
                ${results.map(result => `
                    <div class="search-result-item">
                        <div class="search-result-emoji">${result.imageEmoji || '🦷'}</div>
                        <div class="search-result-content">
                            <h4 class="search-result-title">
                                <a href="product.html?id=${result.id}">${result.name}</a>
                            </h4>
                            <p class="search-result-description">${result.description}</p>
                            <span class="search-result-price">${window.SMILEY_UTILS.formatCurrency(result.price)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Newsletter Signup Component
function createNewsletterSignup() {
    return `
        <div class="newsletter-signup">
            <div class="container">
                <div class="newsletter-content">
                    <h2 class="newsletter-title">Stay in the Loop</h2>
                    <p class="newsletter-description">
                        Get the latest updates on new flavors, special offers, and oral care tips.
                    </p>
                    <form class="newsletter-form" onsubmit="handleNewsletterSignup(event)">
                        <div class="form-group">
                            <input type="email" 
                                   name="email" 
                                   placeholder="Enter your email" 
                                   class="form-input" 
                                   required>
                            <button type="submit" class="btn btn-primary">
                                Subscribe
                                <i data-lucide="mail" class="btn-icon"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

// Product Filter Component
function createProductFilter(filters) {
    return `
        <div class="product-filters">
            <div class="filter-group">
                <label class="filter-label">Category</label>
                <select class="filter-select" onchange="filterProducts()">
                    <option value="">All Categories</option>
                    ${filters.categories.map(category => `
                        <option value="${category.value}">${category.label}</option>
                    `).join('')}
                </select>
            </div>
            
            <div class="filter-group">
                <label class="filter-label">Price Range</label>
                <select class="filter-select" onchange="filterProducts()">
                    <option value="">All Prices</option>
                    ${filters.priceRanges.map(range => `
                        <option value="${range.value}">${range.label}</option>
                    `).join('')}
                </select>
            </div>
            
            <div class="filter-group">
                <label class="filter-label">Sort By</label>
                <select class="filter-select" onchange="sortProducts(this.value)">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                </select>
            </div>
        </div>
    `;
}

// Pagination Component
function createPagination(currentPage, totalPages, onPageChange) {
    if (totalPages <= 1) return '';
    
    let paginationHTML = '<div class="pagination">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="${onPageChange}(${currentPage - 1})">
                <i data-lucide="chevron-left"></i>
                Previous
            </button>
        `;
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="${onPageChange}(${i})">
                ${i}
            </button>
        `;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
            <button class="pagination-btn" onclick="${onPageChange}(${currentPage + 1})">
                Next
                <i data-lucide="chevron-right"></i>
            </button>
        `;
    }
    
    paginationHTML += '</div>';
    
    return paginationHTML;
}

// Export components
window.SMILEY_COMPONENTS = {
    createProductCard,
    createBlogPostCard,
    createCartItem,
    createToast,
    createLoadingSpinner,
    createModal,
    closeModal,
    createSearchResults,
    createNewsletterSignup,
    createProductFilter,
    createPagination
};
