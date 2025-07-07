// About page specific functionality
class AboutPageManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSkillBars();
        this.setupTimelineAnimations();
        this.setupCounters();
        this.setupParallaxEffects();
    }
    
    // Setup skill bar animations
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progress = progressBar.dataset.progress;
                    
                    // Animate the skill bar
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1.5s ease-out';
                        progressBar.style.width = progress + '%';
                    }, 200);
                    
                    // Add percentage text
                    const percentageText = document.createElement('span');
                    percentageText.className = 'skill-percentage';
                    percentageText.textContent = progress + '%';
                    progressBar.appendChild(percentageText);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    // Setup timeline animations
    setupTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-timeline-item');
                    
                    // Add staggered animation for content
                    const content = entry.target.querySelector('.timeline-content');
                    if (content) {
                        setTimeout(() => {
                            content.classList.add('animate-fade-in-up');
                        }, 300);
                    }
                }
            });
        }, {
            threshold: 0.3
        });
        
        timelineItems.forEach(item => observer.observe(item));
    }
    
    // Setup animated counters
    setupCounters() {
        const counters = [
            { element: '.years-experience', target: 8, suffix: '+' },
            { element: '.projects-completed', target: 150, suffix: '+' },
            { element: '.happy-clients', target: 50, suffix: '+' },
            { element: '.awards-won', target: 12, suffix: '' }
        ];
        
        counters.forEach(counter => {
            const element = document.querySelector(counter.element);
            if (element) {
                this.animateCounter(element, counter.target, counter.suffix);
            }
        });
    }
    
    // Animate counter numbers
    animateCounter(element, target, suffix = '') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = target / 100;
                    const duration = 2000; // 2 seconds
                    const stepTime = duration / 100;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        element.textContent = Math.floor(current) + suffix;
                    }, stepTime);
                    
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(element);
    }
    
    // Setup parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestParallaxUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestParallaxUpdate);
    }
    
    // Add interactive hover effects to skill items
    setupSkillInteractions() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const progressBar = item.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.transform = 'scaleY(1.2)';
                    progressBar.style.filter = 'brightness(1.1)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const progressBar = item.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.transform = 'scaleY(1)';
                    progressBar.style.filter = 'brightness(1)';
                }
            });
        });
    }
    
    // Add interactive effects to timeline items
    setupTimelineInteractions() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.02)';
                item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1)';
                item.style.boxShadow = 'none';
            });
        });
    }
    
    // Add floating animation to value items
    setupValueItemAnimations() {
        const valueItems = document.querySelectorAll('.value-item');
        
        valueItems.forEach((item, index) => {
            // Add floating animation with different delays
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('floating-animation');
            
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.05)';
                item.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            });
        });
    }
    
    // Setup smooth scrolling for internal links
    setupSmoothScrolling() {
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Add typing effect to hero subtitle
    setupTypingEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;
        
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Setup intersection observer for section animations
    setupSectionAnimations() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    
                    // Trigger any child animations
                    const animatedElements = entry.target.querySelectorAll('[data-animation]');
                    animatedElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('animate-' + element.dataset.animation);
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }
}

// Initialize about page manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aboutPageManager = new AboutPageManager();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-timeline-item {
            opacity: 1;
            transform: translateX(0);
            transition: all 0.6s ease;
        }
        
        .floating-animation {
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-progress {
            transition: all 0.3s ease;
        }
        
        .skill-percentage {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.8rem;
            font-weight: 600;
            color: white;
        }
    `;
    document.head.appendChild(style);
});
