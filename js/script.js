// Amazon Clone JavaScript - cometXamazon
// This file contains interactive functionality for the Amazon clone

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Amazon Clone - cometXamazon loaded successfully!');
    
    // Initialize all functionality
    initSearchBar();
    initProductCards();
    initCart();
});

// Search Bar Functionality
function initSearchBar() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                console.log('Searching for:', searchQuery);
                alert('Searching for: ' + searchQuery);
                // Here you would typically make an API call or filter products
            } else {
                alert('Please enter a search term');
            }
        });
        
        // Allow search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
}

// Product Cards Functionality
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(function(card) {
        const addToCartBtn = card.querySelector('button');
        
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const productTitle = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.price').textContent;
                
                addToCart(productTitle, productPrice);
                
                // Visual feedback
                addToCartBtn.textContent = 'Added!';
                addToCartBtn.style.backgroundColor = '#7fba00';
                
                setTimeout(function() {
                    addToCartBtn.textContent = 'Add to Cart';
                    addToCartBtn.style.backgroundColor = '';
                }, 2000);
            });
        }
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// Shopping Cart Functionality
let cartItems = [];
let cartCount = 0;

function initCart() {
    const cartLink = document.querySelector('.cart');
    
    if (cartLink) {
        updateCartDisplay();
        
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            showCart();
        });
    }
}

function addToCart(title, price) {
    const item = {
        title: title,
        price: price,
        id: Date.now()
    };
    
    cartItems.push(item);
    cartCount++;
    
    updateCartDisplay();
    console.log('Added to cart:', item);
}

function updateCartDisplay() {
    const cartLink = document.querySelector('.cart');
    if (cartLink) {
        cartLink.textContent = 'Cart (' + cartCount + ')';
    }
}

function showCart() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let cartMessage = 'Shopping Cart:\n\n';
    let total = 0;
    
    cartItems.forEach(function(item, index) {
        cartMessage += (index + 1) + '. ' + item.title + ' - ' + item.price + '\n';
        // Extract numeric price value
        const priceValue = parseFloat(item.price.replace('$', ''));
        total += priceValue;
    });
    
    cartMessage += '\nTotal: $' + total.toFixed(2);
    alert(cartMessage);
}

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        // Only prevent default for anchor links
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            console.log('Navigating to:', this.textContent);
        }
    });
});

// Header Search Category Dropdown
const searchCategory = document.querySelector('.search-category');
if (searchCategory) {
    searchCategory.addEventListener('change', function() {
        console.log('Category changed to:', this.value);
    });
}

// Responsive Menu Toggle (for mobile - if needed)
function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.toggle('active');
    }
}

// Export functions for potential use in other modules
window.amazonClone = {
    addToCart: addToCart,
    showCart: showCart,
    toggleMobileMenu: toggleMobileMenu
};

console.log('Amazon Clone JavaScript initialized - cometXamazon');
