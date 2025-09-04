// Product Data
const PRODUCTS = [
    {
        id: 'p-mango-tango',
        slug: 'mango-tango-toothpaste',
        name: 'Mango Tango Toothpaste',
        flavor: 'Mango',
        type: 'Toothpaste',
        price: 8.99,
        originalPrice: 10.99,
        rating: 4.8,
        reviews: 127,
        imageEmoji: '🥭',
        gradientFrom: 'from-orange-300',
        gradientTo: 'to-orange-500',
        description: 'Tropical mango flavor with natural whitening',
        longDescription: 'Experience the perfect blend of tropical mango flavor and advanced oral care. Our Mango Tango toothpaste combines natural whitening agents with fluoride protection, making your daily routine a delightful tropical escape.',
        badges: ['Best Seller', 'Dentist Approved'],
        features: [
            'Natural whitening with papaya enzymes',
            'Fluoride protection against cavities',
            'SLS-free formula',
            'Vegan and cruelty-free',
            'Natural mango flavoring'
        ],
        ingredients: [
            'Calcium carbonate',
            'Sodium fluoride',
            'Papaya enzyme',
            'Natural mango extract',
            'Xylitol',
            'Coconut oil'
        ],
        size: '4.5 oz',
        ageGroup: 'Adults',
        subscription: {
            price: 7.99,
            interval: 'monthly'
        },
        inStock: true,
        category: 'adult-toothpaste'
    },
    {
        id: 'p-strawberry-soft',
        slug: 'strawberry-soft-brush',
        name: 'Strawberry Soft Brush',
        flavor: 'Strawberry',
        type: 'Toothbrush',
        price: 12.99,
        rating: 4.9,
        reviews: 89,
        imageEmoji: '🍓',
        gradientFrom: 'from-pink-300',
        gradientTo: 'to-pink-500',
        description: 'Gentle bristles with strawberry scent',
        longDescription: 'Make brushing fun with our strawberry-scented toothbrush! Features ultra-soft bristles perfect for sensitive gums and a fun strawberry scent that kids love.',
        badges: ['New', 'Kids Favorite'],
        features: [
            'Ultra-soft bristles for sensitive gums',
            'Strawberry-scented handle',
            'Ergonomic grip design',
            'BPA-free materials',
            'Fun strawberry pattern'
        ],
        ingredients: ['BPA-free plastic', 'Soft nylon bristles', 'Natural strawberry scent'],
        size: 'Standard',
        ageGroup: 'Kids',
        inStock: true,
        category: 'kids-toothbrush'
    },
    {
        id: 'p-yuzu-fresh',
        slug: 'yuzu-fresh-toothpaste',
        name: 'Yuzu Fresh Toothpaste',
        flavor: 'Yuzu',
        type: 'Toothpaste',
        price: 8.99,
        rating: 4.7,
        reviews: 64,
        imageEmoji: '🍋',
        gradientFrom: 'from-yellow-300',
        gradientTo: 'to-yellow-500',
        description: 'Citrus yuzu for fresh breath',
        badges: ['Limited']
    },
    {
        id: 'p-blueberry-mouthwash',
        slug: 'blueberry-mouthwash',
        name: 'Blueberry Mouthwash',
        flavor: 'Blueberry',
        type: 'Mouthwash',
        price: 15.99,
        rating: 4.6,
        reviews: 42,
        imageEmoji: '🫐',
        gradientFrom: 'from-blue-300',
        gradientTo: 'to-blue-500',
        description: 'Antibacterial mouthwash with natural blueberry',
        badges: ['Popular']
    },
    {
        id: 'p-lavender-dream',
        slug: 'lavender-dream-toothpaste',
        name: 'Lavender Dream Toothpaste',
        flavor: 'Lavender',
        type: 'Toothpaste',
        price: 9.99,
        rating: 4.5,
        reviews: 38,
        imageEmoji: '💜',
        gradientFrom: 'from-purple-300',
        gradientTo: 'to-purple-500',
        description: 'Calming lavender for bedtime',
        badges: ['Premium']
    },
    {
        id: 'p-mint-fresh',
        slug: 'mint-fresh-toothpaste',
        name: 'Mint Fresh Toothpaste',
        flavor: 'Mint',
        type: 'Toothpaste',
        price: 7.99,
        rating: 4.4,
        reviews: 156,
        imageEmoji: '🌿',
        gradientFrom: 'from-emerald-300',
        gradientTo: 'to-emerald-500',
        description: 'Classic mint for everyday freshness',
        longDescription: 'The classic mint flavor you know and love, enhanced with natural peppermint oil for that refreshing clean feeling.',
        badges: ['Classic', 'Dentist Approved'],
        features: [
            'Classic mint flavor',
            'Fluoride protection',
            'Natural peppermint oil',
            'SLS-free formula',
            'Long-lasting freshness'
        ],
        ingredients: ['Calcium carbonate', 'Sodium fluoride', 'Peppermint oil', 'Xylitol'],
        size: '4.5 oz',
        ageGroup: 'Adults',
        subscription: {
            price: 6.99,
            interval: 'monthly'
        },
        inStock: true,
        category: 'adult-toothpaste'
    },
    {
        id: 'p-kids-mango',
        slug: 'kids-mango-toothpaste',
        name: 'Kids Mango Magic',
        flavor: 'Mango',
        type: 'Toothpaste',
        price: 6.99,
        rating: 4.9,
        reviews: 203,
        imageEmoji: '🥭',
        gradientFrom: 'from-orange-200',
        gradientTo: 'to-orange-400',
        description: 'Fun mango flavor that kids love',
        longDescription: 'Specially formulated for kids with a fun mango flavor that makes brushing time enjoyable. Safe to swallow and gentle on developing teeth.',
        badges: ['Kids Choice', 'Safe to Swallow'],
        features: [
            'Fun mango flavor kids love',
            'Safe to swallow formula',
            'Gentle on developing teeth',
            'Fluoride protection',
            'No artificial colors'
        ],
        ingredients: ['Calcium carbonate', 'Sodium fluoride', 'Natural mango flavor', 'Xylitol'],
        size: '3.4 oz',
        ageGroup: 'Kids',
        subscription: {
            price: 5.99,
            interval: 'monthly'
        },
        inStock: true,
        category: 'kids-toothpaste'
    },
    {
        id: 'p-family-bundle',
        slug: 'family-care-bundle',
        name: 'Family Care Bundle',
        flavor: 'Mixed',
        type: 'Bundle',
        price: 39.99,
        originalPrice: 49.99,
        rating: 4.8,
        reviews: 67,
        imageEmoji: '👨‍👩‍👧‍👦',
        gradientFrom: 'from-purple-300',
        gradientTo: 'to-pink-400',
        description: 'Complete oral care for the whole family',
        longDescription: 'Everything your family needs for healthy smiles! Includes adult and kids toothpaste, toothbrushes, and mouthwash.',
        badges: ['Best Value', 'Family Favorite'],
        features: [
            '2 Adult toothpastes (Mango & Mint)',
            '1 Kids toothpaste (Mango)',
            '3 Toothbrushes (2 adult, 1 kids)',
            '1 Family mouthwash',
            'Travel case included'
        ],
        size: 'Bundle',
        ageGroup: 'All',
        inStock: true,
        category: 'bundles'
    },
    {
        id: 'p-mini-travel',
        slug: 'mini-travel-pack',
        name: 'Mini Travel Pack',
        flavor: 'Mixed',
        type: 'Bundle',
        price: 14.99,
        rating: 4.6,
        reviews: 89,
        imageEmoji: '✈️',
        gradientFrom: 'from-blue-300',
        gradientTo: 'to-cyan-400',
        description: 'Perfect for travel and on-the-go',
        longDescription: 'Compact travel-sized oral care essentials that fit in your carry-on. TSA-approved sizes with all your favorite flavors.',
        badges: ['Travel Ready', 'TSA Approved'],
        features: [
            '3 Mini toothpastes (1 oz each)',
            'Compact toothbrush',
            'Travel case',
            'TSA-approved sizes',
            'Mixed flavors'
        ],
        size: 'Travel',
        ageGroup: 'Adults',
        inStock: true,
        category: 'travel'
    }
];

// Blog Posts Data
const POSTS = [
    {
        id: 'b-flavor-drops-strawberry',
        slug: 'flavor-drops-strawberry',
        title: 'Flavor Drops: Strawberry Fields',
        excerpt: 'A sweet new twist on your morning routine.',
        content: 'We\'re excited to introduce our newest flavor: Strawberry Fields! This delightful addition to our collection brings the sweet taste of summer strawberries to your daily oral care routine. Made with real strawberry extract and natural sweeteners, it\'s perfect for those who love a fruity twist on their morning brush.',
        date: '2024-08-12',
        author: 'SMILEY Team',
        coverEmoji: '🍓',
        tags: ['flavor', 'update', 'new'],
        featured: true,
        readTime: '3 min'
    },
    {
        id: 'b-oral-care-tips',
        slug: 'oral-care-tips',
        title: '5 Dentist-Approved Oral Care Tips',
        excerpt: 'Keep your smile bright with these essentials.',
        content: 'Maintaining good oral hygiene doesn\'t have to be complicated. Here are five simple tips that dentists recommend for keeping your teeth and gums healthy: 1) Brush twice daily for 2 minutes, 2) Floss daily, 3) Use fluoride toothpaste, 4) Replace your toothbrush every 3-4 months, and 5) Visit your dentist regularly.',
        date: '2024-07-21',
        author: 'Dr. Smile',
        coverEmoji: '🦷',
        tags: ['tips', 'health'],
        featured: false,
        readTime: '5 min'
    },
    {
        id: 'b-kids-brushing-tips',
        slug: 'kids-brushing-tips',
        title: 'Making Brushing Fun for Kids',
        excerpt: 'Turn tooth brushing from a chore into a game!',
        content: 'Getting kids excited about brushing their teeth can be a challenge, but with the right approach, it can become a fun part of their daily routine. Try making it a game, using fun flavors, and setting a good example. Our Kids Mango Magic toothpaste is specially formulated to make brushing enjoyable for little ones.',
        date: '2024-07-15',
        author: 'SMILEY Team',
        coverEmoji: '👶',
        tags: ['kids', 'tips', 'parenting'],
        featured: false,
        readTime: '4 min'
    },
    {
        id: 'b-natural-ingredients',
        slug: 'natural-ingredients',
        title: 'Why We Choose Natural Ingredients',
        excerpt: 'Our commitment to clean, natural oral care.',
        content: 'At SMILEY, we believe that what you put in your mouth matters. That\'s why we carefully select natural ingredients that are both effective and safe. From coconut oil to natural fruit extracts, every ingredient is chosen for its benefits to your oral health and overall well-being.',
        date: '2024-07-08',
        author: 'SMILEY Team',
        coverEmoji: '🌿',
        tags: ['natural', 'ingredients', 'health'],
        featured: true,
        readTime: '6 min'
    }
];

// Cart Data
let cart = {
    items: [],
    total: 0,
    subtotal: 0,
    shipping: 0,
    tax: 0
};

// User Data
let user = null;

// Wishlist Data
let wishlist = [];

// Export data for use in other files
window.SMILEY_DATA = {
    PRODUCTS,
    POSTS,
    cart,
    user,
    wishlist
};
