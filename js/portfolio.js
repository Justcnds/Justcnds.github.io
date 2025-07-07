// Portfolio functionality
class PortfolioManager {
    constructor() {
        this.currentFilter = 'all';
        this.portfolioItems = [];
        this.modal = null;
        this.init();
    }
    
    init() {
        this.setupFilterButtons();
        this.setupPortfolioGrid();
        this.setupModal();
        this.setupLoadMore();
        this.loadPortfolioData();
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
                
                // Filter portfolio items
                const filter = button.dataset.filter;
                this.filterPortfolio(filter);
            });
        });
    }
    
    // Setup portfolio grid interactions
    setupPortfolioGrid() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            // Setup hover effects
            item.addEventListener('mouseenter', () => {
                this.animateItemHover(item, true);
            });
            
            item.addEventListener('mouseleave', () => {
                this.animateItemHover(item, false);
            });
            
            // Setup action buttons
            const actionButtons = item.querySelectorAll('.action-btn');
            actionButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = button.dataset.action;
                    const projectId = button.dataset.project;
                    
                    if (action === 'view') {
                        this.openProject(projectId);
                    } else if (action === 'details') {
                        this.openModal(projectId);
                    }
                });
            });
        });
    }
    
    // Setup modal functionality
    setupModal() {
        this.modal = document.getElementById('portfolio-modal');
        const modalClose = document.getElementById('modal-close');
        const modalOverlay = document.getElementById('modal-overlay');
        
        modalClose.addEventListener('click', () => this.closeModal());
        modalOverlay.addEventListener('click', () => this.closeModal());
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    // Setup load more functionality
    setupLoadMore() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreItems();
            });
        }
    }
    
    // Filter portfolio items
    filterPortfolio(filter) {
        this.currentFilter = filter;
        const portfolioGrid = document.getElementById('portfolio-grid');
        const items = portfolioGrid.querySelectorAll('.portfolio-item');
        
        items.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                item.style.display = 'block';
                // Add staggered animation
                setTimeout(() => {
                    item.classList.add('animate-fade-in-up');
                }, index * 100);
            } else {
                item.classList.remove('animate-fade-in-up');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Update grid layout
        this.updateGridLayout();
    }
    
    // Animate item hover
    animateItemHover(item, isHover) {
        const image = item.querySelector('.portfolio-image img');
        const overlay = item.querySelector('.portfolio-overlay');
        const content = item.querySelector('.portfolio-content');
        
        if (isHover) {
            image.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
            content.style.transform = 'translateY(-10px)';
        } else {
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
            content.style.transform = 'translateY(0)';
        }
    }
    
    // Open project in new tab
    openProject(projectId) {
        // In a real application, this would open the actual project
        const projectUrls = {
            'web-1': 'https://example.com/project1',
            'brand-1': 'https://example.com/project2',
            'ui-1': 'https://example.com/project3',
            'mobile-1': 'https://example.com/project4',
            'web-2': 'https://example.com/project5',
            'brand-2': 'https://example.com/project6'
        };
        
        const url = projectUrls[projectId];
        if (url) {
            window.open(url, '_blank');
        } else {
            console.log('Opening project:', projectId);
            // Show notification that this is a demo
            this.showNotification('这是演示版本，实际项目链接将在这里打开', 'info');
        }
    }
    
    // Open modal with project details
    openModal(projectId) {
        const projectData = this.getProjectData(projectId);
        
        if (!projectData) return;
        
        // Populate modal content
        document.getElementById('modal-image').src = projectData.image;
        document.getElementById('modal-title').textContent = projectData.title;
        document.getElementById('modal-description').textContent = projectData.description;
        document.getElementById('modal-category').textContent = projectData.category;
        document.getElementById('modal-date').textContent = projectData.date;
        
        // Populate tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        projectData.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
        
        // Set action links
        document.getElementById('modal-live-link').href = projectData.liveUrl || '#';
        document.getElementById('modal-code-link').href = projectData.codeUrl || '#';
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate modal in
        setTimeout(() => {
            this.modal.querySelector('.modal-content').style.transform = 'scale(1)';
            this.modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }
    
    // Close modal
    closeModal() {
        const modalContent = this.modal.querySelector('.modal-content');
        
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Get project data
    getProjectData(projectId) {
        const projectsData = {
            'web-1': {
                title: '实验性网页设计',
                description: '这是一个突破传统的网页布局设计项目，采用创新的视觉语言和交互方式。项目注重用户体验，同时保持视觉冲击力。',
                category: '网页设计',
                date: '2024年3月',
                image: 'assets/images/portfolio/web-1.jpg',
                tags: ['HTML5', 'CSS3', 'JavaScript', '响应式设计'],
                liveUrl: 'https://example.com/project1',
                codeUrl: 'https://github.com/yourusername/project1'
            },
            'brand-1': {
                title: '品牌视觉系统',
                description: '完整的品牌识别设计项目，从logo设计到应用系统的全面规划。项目包含品牌手册、应用指南等完整交付物。',
                category: '品牌设计',
                date: '2024年2月',
                image: 'assets/images/portfolio/brand-1.jpg',
                tags: ['品牌设计', '视觉识别', 'Logo设计', '品牌手册'],
                liveUrl: 'https://example.com/project2',
                codeUrl: '#'
            },
            'ui-1': {
                title: '用户界面设计',
                description: '注重用户体验的界面设计项目，简洁而富有表现力。通过用户研究和测试，优化了整体的交互流程。',
                category: 'UI/UX设计',
                date: '2024年1月',
                image: 'assets/images/portfolio/ui-1.jpg',
                tags: ['UI设计', 'UX设计', '原型设计', '用户研究'],
                liveUrl: 'https://example.com/project3',
                codeUrl: '#'
            },
            'mobile-1': {
                title: '移动应用界面',
                description: '创新的移动端用户体验设计，适配iOS和Android平台。注重触摸交互和移动端特有的使用场景。',
                category: '移动应用',
                date: '2023年12月',
                image: 'assets/images/portfolio/mobile-1.jpg',
                tags: ['移动设计', 'iOS', 'Android', '交互设计'],
                liveUrl: 'https://example.com/project4',
                codeUrl: '#'
            },
            'web-2': {
                title: '响应式网站设计',
                description: '适配多设备的现代网站设计，采用移动优先的设计理念，确保在各种设备上都有良好的用户体验。',
                category: '网页设计',
                date: '2023年11月',
                image: 'assets/images/portfolio/web-2.jpg',
                tags: ['响应式', '前端开发', '用户体验', 'CSS Grid'],
                liveUrl: 'https://example.com/project5',
                codeUrl: 'https://github.com/yourusername/project5'
            },
            'brand-2': {
                title: '产品包装设计',
                description: '创意包装设计项目，提升品牌价值和产品吸引力。结合品牌特色和产品特点，创造独特的视觉表现。',
                category: '品牌设计',
                date: '2023年10月',
                image: 'assets/images/portfolio/brand-2.jpg',
                tags: ['包装设计', '平面设计', '品牌应用', '印刷设计'],
                liveUrl: 'https://example.com/project6',
                codeUrl: '#'
            }
        };
        
        return projectsData[projectId];
    }
    
    // Load more items (simulate loading additional portfolio items)
    loadMoreItems() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        loadMoreBtn.textContent = '加载中...';
        loadMoreBtn.disabled = true;
        
        // Simulate loading delay
        setTimeout(() => {
            // In a real application, this would load more items from an API
            this.showNotification('所有作品已加载完成', 'info');
            loadMoreBtn.style.display = 'none';
        }, 1500);
    }
    
    // Update grid layout after filtering
    updateGridLayout() {
        const portfolioGrid = document.getElementById('portfolio-grid');
        const visibleItems = portfolioGrid.querySelectorAll('.portfolio-item[style*="block"], .portfolio-item:not([style*="none"])');
        
        // Add masonry-like layout adjustments if needed
        visibleItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 100}ms`;
        });
    }
    
    // Load portfolio data (for future API integration)
    loadPortfolioData() {
        // This method can be used to load portfolio data from an API
        // For now, we're using static data
        console.log('Portfolio data loaded');
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

// Initialize portfolio manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new PortfolioManager();
});
