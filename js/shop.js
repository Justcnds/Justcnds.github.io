// E-commerce functionality
class ShopManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.products = {};
        this.currentFilter = 'all';
        this.currentSort = 'default';
        this.init();
    }
    
    init() {
        this.loadProductData();
        this.setupFilterButtons();
        this.setupSortControls();
        this.setupProductCards();
        this.setupCart();
        this.setupQuickView();
        this.updateCartUI();
    }
    
    // Load product data
    loadProductData() {
        this.products = {
            'template-1': {
                id: 'template-1',
                title: '网页设计模板包',
                description: '包含10个现代网页设计模板，适用于各种商业网站',
                price: 99,
                originalPrice: 149,
                category: 'templates',
                image: 'assets/images/products/template-1.jpg',
                rating: 5,
                reviews: 24,
                features: ['10个模板', 'HTML/CSS源码', '响应式设计', '商业许可']
            },
            'font-1': {
                id: 'font-1',
                title: '创意字体集合',
                description: '5款独特的中英文字体，适用于品牌设计和创意项目',
                price: 149,
                originalPrice: null,
                category: 'fonts',
                image: 'assets/images/products/font-1.jpg',
                rating: 4,
                reviews: 18,
                features: ['5款字体', 'OTF/TTF格式', '商业许可', '多语言支持']
            },
            'icons-1': {
                id: 'icons-1',
                title: '现代图标集合',
                description: '200+矢量图标，多种格式，适用于网页和应用设计',
                price: 79,
                originalPrice: null,
                category: 'icons',
                image: 'assets/images/products/icons-1.jpg',
                rating: 5,
                reviews: 32,
                features: ['200+图标', 'SVG/PNG格式', '多种尺寸', '可编辑矢量']
            },
            'graphics-1': {
                id: 'graphics-1',
                title: '插画素材包',
                description: '50个高质量矢量插画，适用于网站和营销材料',
                price: 199,
                originalPrice: 299,
                category: 'graphics',
                image: 'assets/images/products/graphics-1.jpg',
                rating: 5,
                reviews: 15,
                features: ['50个插画', 'AI/EPS格式', '高分辨率', '商业许可']
            },
            'template-2': {
                id: 'template-2',
                title: '移动应用UI套件',
                description: '完整的移动应用界面设计，包含多个页面和组件',
                price: 129,
                originalPrice: null,
                category: 'templates',
                image: 'assets/images/products/template-2.jpg',
                rating: 4,
                reviews: 21,
                features: ['30+页面', 'Sketch/Figma文件', 'iOS/Android适配', '设计规范']
            },
            'font-2': {
                id: 'font-2',
                title: '手写风格字体',
                description: '3款手写风格英文字体，适用于创意和个性化设计',
                price: 89,
                originalPrice: 119,
                category: 'fonts',
                image: 'assets/images/products/font-2.jpg',
                rating: 5,
                reviews: 27,
                features: ['3款字体', '手写风格', 'OTF格式', '个人/商业许可']
            }
        };
    }
    
    // Setup filter buttons
    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter products
                this.currentFilter = button.dataset.filter;
                this.filterProducts();
            });
        });
    }
    
    // Setup sort controls
    setupSortControls() {
        const sortSelect = document.getElementById('sort-select');
        
        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.sortProducts();
        });
    }
    
    // Setup product cards
    setupProductCards() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.dataset.productId;
                this.addToCart(productId);
            });
        });
        
        quickViewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.dataset.product;
                this.openQuickView(productId);
            });
        });
    }
    
    // Setup cart functionality
    setupCart() {
        const cartIcon = document.getElementById('cart-icon');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartClose = document.getElementById('cart-close');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        checkoutBtn.addEventListener('click', () => {
            this.checkout();
        });
    }
    
    // Setup quick view modal
    setupQuickView() {
        const modal = document.getElementById('quick-view-modal');
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = document.getElementById('modal-overlay');
        const modalAddToCart = document.getElementById('modal-add-to-cart');
        const modalBuyNow = document.getElementById('modal-buy-now');
        
        modalClose.addEventListener('click', () => this.closeQuickView());
        modalOverlay.addEventListener('click', () => this.closeQuickView());
        
        modalAddToCart.addEventListener('click', () => {
            const productId = modalAddToCart.dataset.productId;
            this.addToCart(productId);
            this.closeQuickView();
        });
        
        modalBuyNow.addEventListener('click', () => {
            const productId = modalBuyNow.dataset.productId;
            this.addToCart(productId);
            this.closeQuickView();
            this.checkout();
        });
    }
    
    // Filter products
    filterProducts() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            const category = card.dataset.category;
            const shouldShow = this.currentFilter === 'all' || category === this.currentFilter;
            
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('animate-fade-in-up');
                }, index * 100);
            } else {
                card.classList.remove('animate-fade-in-up');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Sort products
    sortProducts() {
        const productsGrid = document.getElementById('products-grid');
        const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
        
        productCards.sort((a, b) => {
            const priceA = parseInt(a.dataset.price);
            const priceB = parseInt(b.dataset.price);
            
            switch (this.currentSort) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    // In a real app, you'd sort by date
                    return 0;
                case 'popular':
                    // In a real app, you'd sort by popularity/sales
                    return 0;
                default:
                    return 0;
            }
        });
        
        // Re-append sorted cards
        productCards.forEach(card => {
            productsGrid.appendChild(card);
        });
    }
    
    // Add product to cart
    addToCart(productId) {
        const product = this.products[productId];
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product.title} 已加入购物车`, 'success');
    }
    
    // Remove from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.renderCartItems();
    }
    
    // Update cart UI
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartCount.textContent = totalItems;
        cartTotal.textContent = totalPrice;
        
        this.renderCartItems();
    }
    
    // Render cart items
    renderCartItems() {
        const cartItems = document.getElementById('cart-items');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">购物车为空</div>';
            return;
        }
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">¥${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="shopManager.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="shopManager.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item-btn" onclick="shopManager.removeFromCart('${item.id}')">&times;</button>
            </div>
        `).join('');
    }
    
    // Update quantity
    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartUI();
        }
    }
    
    // Open quick view modal
    openQuickView(productId) {
        const product = this.products[productId];
        if (!product) return;
        
        const modal = document.getElementById('quick-view-modal');
        
        // Populate modal content
        document.getElementById('modal-image').src = product.image;
        document.getElementById('modal-title').textContent = product.title;
        document.getElementById('modal-description').textContent = product.description;
        document.getElementById('modal-price').textContent = `¥${product.price}`;
        
        const originalPriceElement = document.getElementById('modal-original-price');
        if (product.originalPrice) {
            originalPriceElement.textContent = `¥${product.originalPrice}`;
            originalPriceElement.style.display = 'inline';
        } else {
            originalPriceElement.style.display = 'none';
        }
        
        // Populate features
        const featuresContainer = document.getElementById('modal-features');
        featuresContainer.innerHTML = product.features.map(feature => 
            `<div class="feature-item">✓ ${feature}</div>`
        ).join('');
        
        // Set product ID for buttons
        document.getElementById('modal-add-to-cart').dataset.productId = productId;
        document.getElementById('modal-buy-now').dataset.productId = productId;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close quick view modal
    closeQuickView() {
        const modal = document.getElementById('quick-view-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Checkout process
    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('购物车为空', 'warning');
            return;
        }
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // In a real application, this would redirect to a payment processor
        this.showNotification('正在跳转到支付页面...', 'info');
        
        setTimeout(() => {
            // Simulate successful payment
            this.showNotification('支付成功！感谢您的购买', 'success');
            this.cart = [];
            this.saveCart();
            this.updateCartUI();
            
            // Close cart sidebar
            document.getElementById('cart-sidebar').classList.remove('active');
            document.body.style.overflow = '';
        }, 2000);
    }
    
    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    
    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        });
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize shop manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.shopManager = new ShopManager();
});
