// Shop Page JavaScript

let filteredProducts = [];
let currentFilters = {
    category: '',
    priceRange: '',
    sortBy: 'featured'
};

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
});

function initializeShop() {
    // Load all products initially
    filteredProducts = [...window.SMILEY_DATA.PRODUCTS];
    
    // Render products
    renderProducts();
    
    // Initialize filters
    initializeFilters();
    
    console.log('Shop page initialized');
}

function initializeFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            applyFilters();
        });
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            currentFilters.priceRange = e.target.value;
            applyFilters();
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            currentFilters.sortBy = e.target.value;
            applyFilters();
        });
    }
}

function applyFilters() {
    showLoading();
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        let products = [...window.SMILEY_DATA.PRODUCTS];
        
        // Apply category filter
        if (currentFilters.category) {
            products = products.filter(product => product.type === currentFilters.category);
        }
        
        // Apply price filter
        if (currentFilters.priceRange) {
            const [min, max] = currentFilters.priceRange.split('-').map(Number);
            products = products.filter(product => {
                if (max) {
                    return product.price >= min && product.price <= max;
                } else {
                    return product.price >= min;
                }
            });
        }
        
        // Apply sorting
        products = sortProducts(products, currentFilters.sortBy);
        
        filteredProducts = products;
        renderProducts();
        hideLoading();
    }, 300);
}

function sortProducts(products, sortBy) {
    switch (sortBy) {
        case 'price-low':
            return products.sort((a, b) => a.price - b.price);
        case 'price-high':
            return products.sort((a, b) => b.price - a.price);
        case 'rating':
            return products.sort((a, b) => b.rating - a.rating);
        case 'newest':
            // For demo purposes, sort by ID (newer products have higher IDs)
            return products.sort((a, b) => b.id.localeCompare(a.id));
        case 'featured':
        default:
            // Featured products are first 6 products
            const featured = products.filter(p => ['p-mango-tango', 'p-strawberry-soft', 'p-mint-fresh', 'p-kids-mango', 'p-family-bundle', 'p-blueberry-mouthwash'].includes(p.id));
            const others = products.filter(p => !featured.includes(p));
            return [...featured, ...others];
    }
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!productsGrid) return;
    
    if (filteredProducts.length === 0) {
        productsGrid.style.display = 'none';
        if (noResults) {
            noResults.style.display = 'block';
        }
        return;
    }
    
    productsGrid.style.display = 'grid';
    if (noResults) {
        noResults.style.display = 'none';
    }
    
    productsGrid.innerHTML = filteredProducts
        .map((product, index) => window.SMILEY_COMPONENTS.createProductCard(product, index))
        .join('');
    
    // Re-initialize icons after adding content
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Add scroll reveal animation
    const cards = productsGrid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('scroll-reveal');
    });
}

function showLoading() {
    const loadingState = document.getElementById('loadingState');
    const productsGrid = document.getElementById('productsGrid');
    
    if (loadingState) {
        loadingState.style.display = 'block';
    }
    if (productsGrid) {
        productsGrid.style.display = 'none';
    }
}

function hideLoading() {
    const loadingState = document.getElementById('loadingState');
    
    if (loadingState) {
        loadingState.style.display = 'none';
    }
}

// Search functionality
function searchProducts(query) {
    if (!query.trim()) {
        filteredProducts = [...window.SMILEY_DATA.PRODUCTS];
    } else {
        filteredProducts = window.SMILEY_DATA.PRODUCTS.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.flavor.toLowerCase().includes(query.toLowerCase()) ||
            product.type.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    renderProducts();
}

// Clear all filters
function clearFilters() {
    currentFilters = {
        category: '',
        priceRange: '',
        sortBy: 'featured'
    };
    
    // Reset filter selects
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) categoryFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (sortFilter) sortFilter.value = 'featured';
    
    applyFilters();
}

// Export functions for global access
window.searchProducts = searchProducts;
window.clearFilters = clearFilters;
