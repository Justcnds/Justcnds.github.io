// Contact page functionality
class ContactManager {
    constructor() {
        this.form = null;
        this.init();
    }
    
    init() {
        this.setupContactForm();
        this.setupFAQ();
        this.setupFormValidation();
        this.setupSocialLinks();
        this.setupStatusIndicator();
    }
    
    // Setup contact form
    setupContactForm() {
        this.form = document.getElementById('contact-form');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
            
            // Setup real-time validation
            const inputs = this.form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }
    
    // Handle form submission
    async handleFormSubmission() {
        if (!this.validateForm()) {
            return;
        }
        
        const submitBtn = this.form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        try {
            // Simulate form submission
            await this.submitForm();
            
            // Show success message
            this.showNotification('消息发送成功！我会尽快回复您。', 'success');
            this.form.reset();
            this.clearAllErrors();
            
        } catch (error) {
            this.showNotification('发送失败，请稍后重试。', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }
    
    // Simulate form submission
    async submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this to your backend
        console.log('Form data:', data);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate success (you could also simulate errors for testing)
        return { success: true };
    }
    
    // Validate entire form
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Additional custom validations
        const email = this.form.querySelector('#email');
        if (email.value && !this.isValidEmail(email.value)) {
            this.showFieldError(email, '请输入有效的邮箱地址');
            isValid = false;
        }
        
        const phone = this.form.querySelector('#phone');
        if (phone.value && !this.isValidPhone(phone.value)) {
            this.showFieldError(phone, '请输入有效的电话号码');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Validate individual field
    validateField(field) {
        const value = field.value.trim();
        
        // Check required fields
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, '此字段为必填项');
            return false;
        }
        
        // Check email format
        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, '请输入有效的邮箱地址');
            return false;
        }
        
        // Check minimum length for message
        if (field.name === 'message' && value && value.length < 10) {
            this.showFieldError(field, '请至少输入10个字符');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }
    
    // Show field error
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }
    
    // Clear field error
    clearFieldError(field) {
        field.classList.remove('error');
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Clear all form errors
    clearAllErrors() {
        const errorFields = this.form.querySelectorAll('.error');
        const errorMessages = this.form.querySelectorAll('.field-error');
        
        errorFields.forEach(field => field.classList.remove('error'));
        errorMessages.forEach(message => message.remove());
    }
    
    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    // Setup FAQ accordion
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                        otherItem.querySelector('.faq-toggle').textContent = '+';
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    item.classList.remove('open');
                    answer.style.maxHeight = '0';
                    toggle.textContent = '+';
                } else {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.textContent = '−';
                }
            });
        });
    }
    
    // Setup form validation styles
    setupFormValidation() {
        const style = document.createElement('style');
        style.textContent = `
            .form-group {
                position: relative;
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-primary);
            }
            
            .form-group input,
            .form-group textarea,
            .form-group select {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid var(--border-color);
                border-radius: var(--border-radius);
                font-size: 1rem;
                transition: var(--transition-fast);
                background: var(--bg-primary);
                color: var(--text-primary);
            }
            
            .form-group input:focus,
            .form-group textarea:focus,
            .form-group select:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            }
            
            .form-group input.error,
            .form-group textarea.error,
            .form-group select.error {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            
            .field-error {
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: block;
            }
            
            .submit-btn {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: var(--border-radius);
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition-normal);
                position: relative;
                overflow: hidden;
            }
            
            .submit-btn:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: var(--shadow-lg);
            }
            
            .submit-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            .btn-loading {
                display: none;
            }
            
            .faq-item {
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                margin-bottom: 1rem;
                overflow: hidden;
            }
            
            .faq-question {
                padding: 1.5rem;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--bg-secondary);
                transition: var(--transition-fast);
            }
            
            .faq-question:hover {
                background: var(--border-color);
            }
            
            .faq-question h3 {
                margin: 0;
                font-size: 1.1rem;
            }
            
            .faq-toggle {
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--primary-color);
                transition: var(--transition-fast);
            }
            
            .faq-answer {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }
            
            .faq-answer p {
                padding: 1.5rem;
                margin: 0;
                background: var(--bg-primary);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Setup social links tracking
    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.querySelector('span:last-child').textContent;
                console.log(`Social link clicked: ${platform}`);
                
                // In a real application, you might track this with analytics
                // gtag('event', 'social_click', { platform: platform });
            });
        });
    }
    
    // Setup status indicator
    setupStatusIndicator() {
        const statusDot = document.querySelector('.status-dot');
        
        if (statusDot) {
            // Animate the status dot
            setInterval(() => {
                statusDot.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    statusDot.style.transform = 'scale(1)';
                }, 200);
            }, 3000);
        }
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
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize contact manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.contactManager = new ContactManager();
});
