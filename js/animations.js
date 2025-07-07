// Advanced Animation System
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }
    
    init() {
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupTextAnimations();
        this.setupParticleSystem();
    }
    
    // Intersection Observer for scroll-triggered animations
    setupIntersectionObservers() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5, 0.7],
            rootMargin: '-10% 0px -10% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                
                if (entry.isIntersecting) {
                    this.triggerAnimation(element, animationType);
                } else if (element.dataset.repeat === 'true') {
                    this.resetAnimation(element);
                }
            });
        }, observerOptions);
        
        // Observe elements with animation data attributes
        document.querySelectorAll('[data-animation]').forEach(el => {
            observer.observe(el);
        });
        
        this.observers.set('intersection', observer);
    }
    
    // Scroll-based animations
    setupScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Parallax elements
            document.querySelectorAll('[data-parallax]').forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            // Scale elements based on scroll
            document.querySelectorAll('[data-scale-scroll]').forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementCenter = rect.top + rect.height / 2;
                const distanceFromCenter = Math.abs(windowHeight / 2 - elementCenter);
                const maxDistance = windowHeight / 2;
                const scale = 1 - (distanceFromCenter / maxDistance) * 0.2;
                
                element.style.transform = `scale(${Math.max(0.8, Math.min(1, scale))})`;
            });
            
            // Rotate elements based on scroll
            document.querySelectorAll('[data-rotate-scroll]').forEach(element => {
                const speed = parseFloat(element.dataset.rotateScroll) || 0.1;
                const rotation = scrollY * speed;
                element.style.transform = `rotate(${rotation}deg)`;
            });
            
            ticking = false;
        };
        
        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestScrollUpdate);
    }
    
    // Hover animations
    setupHoverAnimations() {
        document.querySelectorAll('[data-hover-animation]').forEach(element => {
            const animationType = element.dataset.hoverAnimation;
            
            element.addEventListener('mouseenter', () => {
                this.triggerHoverAnimation(element, animationType, 'enter');
            });
            
            element.addEventListener('mouseleave', () => {
                this.triggerHoverAnimation(element, animationType, 'leave');
            });
        });
    }
    
    // Text animations
    setupTextAnimations() {
        // Typewriter effect
        document.querySelectorAll('[data-typewriter]').forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.typewriterSpeed) || 100;
            
            element.textContent = '';
            element.style.borderRight = '2px solid';
            element.style.animation = 'blink 1s infinite';
            
            this.typeWriter(element, text, speed);
        });
        
        // Text reveal animation
        document.querySelectorAll('[data-text-reveal]').forEach(element => {
            this.setupTextReveal(element);
        });
        
        // Glitch text effect
        document.querySelectorAll('[data-glitch]').forEach(element => {
            this.setupGlitchText(element);
        });
    }
    
    // Particle system
    setupParticleSystem() {
        const particleContainers = document.querySelectorAll('[data-particles]');
        
        particleContainers.forEach(container => {
            const particleCount = parseInt(container.dataset.particles) || 50;
            this.createParticleSystem(container, particleCount);
        });
    }
    
    // Animation trigger methods
    triggerAnimation(element, animationType) {
        element.classList.add('animate-' + animationType);
        
        // Add stagger delay for child elements
        const children = element.querySelectorAll('[data-stagger]');
        children.forEach((child, index) => {
            const delay = index * (parseInt(element.dataset.staggerDelay) || 100);
            child.style.animationDelay = `${delay}ms`;
            child.classList.add('animate-' + animationType);
        });
    }
    
    resetAnimation(element) {
        const animationType = element.dataset.animation;
        element.classList.remove('animate-' + animationType);
        
        const children = element.querySelectorAll('[data-stagger]');
        children.forEach(child => {
            child.classList.remove('animate-' + animationType);
            child.style.animationDelay = '';
        });
    }
    
    triggerHoverAnimation(element, animationType, phase) {
        if (phase === 'enter') {
            element.classList.add('hover-' + animationType);
        } else {
            element.classList.remove('hover-' + animationType);
        }
    }
    
    // Typewriter effect
    typeWriter(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                element.style.borderRight = 'none';
            }
        }, speed);
    }
    
    // Text reveal setup
    setupTextReveal(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.3s ease ${index * 50}ms`;
            element.appendChild(span);
        });
        
        // Trigger reveal on intersection
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('span').forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    }
    
    // Glitch text effect
    setupGlitchText(element) {
        const originalText = element.textContent;
        element.dataset.text = originalText;
        
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        const glitch = () => {
            let iterations = 0;
            const maxIterations = originalText.length;
            
            const interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join('');
                
                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    element.textContent = originalText;
                }
                
                iterations += 1 / 3;
            }, 30);
        };
        
        element.addEventListener('mouseenter', glitch);
    }
    
    // Particle system
    createParticleSystem(container, count) {
        const particles = [];
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random initial position
            const x = Math.random() * container.offsetWidth;
            const y = Math.random() * container.offsetHeight;
            
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(99, 102, 241, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            container.appendChild(particle);
            
            particles.push({
                element: particle,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        }
        
        // Animate particles
        const animateParticles = () => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x <= 0 || particle.x >= container.offsetWidth) {
                    particle.vx *= -1;
                }
                if (particle.y <= 0 || particle.y >= container.offsetHeight) {
                    particle.vy *= -1;
                }
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            });
            
            requestAnimationFrame(animateParticles);
        };
        
        animateParticles();
    }
    
    // Utility methods
    addCustomAnimation(name, keyframes, options = {}) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ${name} {
                ${keyframes}
            }
            .animate-${name} {
                animation: ${name} ${options.duration || '1s'} ${options.easing || 'ease'} ${options.delay || '0s'} ${options.iterations || '1'} ${options.direction || 'normal'} ${options.fillMode || 'both'};
            }
        `;
        document.head.appendChild(style);
    }
    
    // Performance monitoring
    measurePerformance() {
        if (performance.mark) {
            performance.mark('animation-start');
            
            requestAnimationFrame(() => {
                performance.mark('animation-end');
                performance.measure('animation-duration', 'animation-start', 'animation-end');
                
                const measure = performance.getEntriesByName('animation-duration')[0];
                if (measure.duration > 16.67) { // More than 60fps
                    console.warn('Animation performance issue detected:', measure.duration + 'ms');
                }
            });
        }
    }
}

// Initialize animation controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
    
    // Add CSS for blink animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: currentColor; }
        }
    `;
    document.head.appendChild(style);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}
