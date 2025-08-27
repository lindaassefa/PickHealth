// PickHealth Landing Page - Main JavaScript
// Premium animations and interactions

class PickHealthApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.initScrollEffects();
        this.initTypingAnimation();
        this.initCounterAnimations();
        this.initParallaxEffects();
        this.initTabSystem();
        this.initFormHandling();
        this.initProgressBars();
        this.initIntersectionObserver();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navigation scroll effect
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Button click effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRippleEffect(e);
            });
        });

        // Form submission
        const signupForm = document.querySelector('.signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e);
            });
        }

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Floating elements parallax
        window.addEventListener('scroll', () => {
            this.updateParallaxElements();
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initAnimations() {
        // Initialize AOS-like animations
        this.animateOnScroll();
        
        // Hero section animations
        this.animateHeroSection();
        
        // Floating elements animation
        this.animateFloatingElements();
        
        // Background mesh animation
        this.animateBackgroundMesh();
    }

    initScrollEffects() {
        // Navigation progress bar
        this.initNavigationProgress();
        
        // Parallax scrolling effects
        this.initParallaxScrolling();
        
        // Staggered animations on scroll
        this.initStaggeredAnimations();
    }

    initTypingAnimation() {
        const typingText = document.getElementById('typing-text');
        if (!typingText) return;

        const text = "Transform Your Office Food Culture";
        let index = 0;
        const speed = 100;

        const typeWriter = () => {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            } else {
                // Add a small delay before starting the cursor blink
                setTimeout(() => {
                    document.querySelector('.cursor').style.animation = 'blink 1s infinite';
                }, 500);
            }
        };

        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    initCounterAnimations() {
        // Initialize counters for statistics
        this.initCounters();
        
        // Progress bar animations
        this.initProgressBars();
    }

    initParallaxEffects() {
        // Floating elements parallax
        this.initFloatingParallax();
        
        // Background parallax
        this.initBackgroundParallax();
    }

    initTabSystem() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                this.switchTab(targetTab);
            });
        });
    }

    initFormHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e);
            });
        });
    }

    initProgressBars() {
        // Initialize all progress bars
        this.animateProgressBars();
    }

    initIntersectionObserver() {
        // Create intersection observer for scroll animations
        this.createIntersectionObserver();
    }

    // Animation Methods
    animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease-out';
        });
    }

    animateHeroSection() {
        const heroElements = document.querySelectorAll('.hero-text > *');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-elements > div');
        
        floatingElements.forEach((element, index) => {
            const speed = element.dataset.speed || 0.5;
            const delay = index * 0.5;
            
            element.style.animation = `float 6s ease-in-out ${delay}s infinite`;
        });
    }

    animateBackgroundMesh() {
        const mesh = document.querySelector('.gradient-mesh');
        if (mesh) {
            mesh.style.animation = 'meshFloat 20s ease-in-out infinite';
        }
    }

    // Scroll Effects
    handleScroll() {
        const scrolled = window.pageYOffset;
        const navbar = document.getElementById('navbar');
        const progressBar = document.getElementById('nav-progress');
        
        // Navbar background effect
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Progress bar
        if (progressBar) {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / windowHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // Parallax effects
        this.updateParallaxElements();
    }

    initNavigationProgress() {
        const progressBar = document.getElementById('nav-progress');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
    }

    initParallaxScrolling() {
        // Add parallax effect to various elements
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            element.dataset.speed = speed;
        });
    }

    initStaggeredAnimations() {
        const staggeredElements = document.querySelectorAll('[data-stagger]');
        
        staggeredElements.forEach((element, index) => {
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Counter Animations
    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.dataset.count);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    if (counter.dataset.count.includes('.')) {
                        counter.textContent = current.toFixed(1);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = counter.dataset.count;
                }
            };
            
            // Start counter when element is visible
            this.observeElement(counter, () => {
                updateCounter();
            });
        });
    }

    // Progress Bar Animations
    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill[data-width]');
        
        progressBars.forEach(bar => {
            const width = bar.dataset.width;
            
            this.observeElement(bar, () => {
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 500);
            });
        });
    }

    // Parallax Effects
    initFloatingParallax() {
        const floatingElements = document.querySelectorAll('.floating-elements > div');
        
        floatingElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            element.dataset.speed = speed;
        });
    }

    initBackgroundParallax() {
        const backgroundElements = document.querySelectorAll('.hero-background > *');
        
        backgroundElements.forEach(element => {
            element.dataset.parallax = '0.1';
        });
    }

    updateParallaxElements() {
        const scrolled = window.pageYOffset;
        
        // Update floating elements
        document.querySelectorAll('.floating-elements > div').forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Update background elements
        document.querySelectorAll('[data-parallax]').forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Tab System
    switchTab(targetTab) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to target button and content
        const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const targetContent = document.getElementById(`${targetTab}-tab`);
        
        if (targetButton) targetButton.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
        
        // Animate the active content
        if (targetContent) {
            targetContent.style.opacity = '0';
            targetContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                targetContent.style.transition = 'all 0.5s ease-out';
                targetContent.style.opacity = '1';
                targetContent.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Form Handling
    handleFormSubmission(e) {
        const form = e.target;
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !submitButton) return;
        
        const email = emailInput.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        submitButton.disabled = true;
        submitButton.textContent = 'Joining...';
        
        setTimeout(() => {
            this.showNotification('Thank you! You\'ve been added to our waitlist.', 'success');
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Join Waitlist';
        }, 2000);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-out',
            maxWidth: '400px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        });
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Ripple Effect
    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Intersection Observer
    createIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Trigger specific animations
                    if (entry.target.dataset.aos === 'fade-up') {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    } else if (entry.target.dataset.aos === 'fade-right') {
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.style.opacity = '1';
                    } else if (entry.target.dataset.aos === 'fade-left') {
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.style.opacity = '1';
                    } else if (entry.target.dataset.aos === 'zoom-in') {
                        entry.target.style.transform = 'scale(1)';
                        entry.target.style.opacity = '1';
                    }
                }
            });
        }, options);
        
        // Observe all elements with data-aos
        document.querySelectorAll('[data-aos]').forEach(element => {
            observer.observe(element);
        });
    }

    // Utility Methods
    observeElement(element, callback) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    }

    handleResize() {
        // Handle window resize events
        this.updateLayout();
    }

    updateLayout() {
        // Update layout based on screen size
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }

    // Performance optimization
    debounce(func, wait) {
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

    throttle(func, limit) {
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
}

// CSS Animations (injected via JavaScript for better performance)
const injectCSSAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
            }
            50% { 
                transform: translateY(-20px) rotate(5deg); 
            }
        }
        
        @keyframes meshFloat {
            0%, 100% { 
                transform: translate(0, 0) rotate(0deg); 
            }
            33% { 
                transform: translate(30px, -30px) rotate(1deg); 
            }
            66% { 
                transform: translate(-20px, 20px) rotate(-1deg); 
            }
        }
        
        @keyframes slideRight {
            0%, 100% { 
                transform: translateX(0); 
            }
            50% { 
                transform: translateX(10px); 
            }
        }
        
        @keyframes pulse {
            0%, 100% { 
                opacity: 1; 
            }
            50% { 
                opacity: 0.5; 
            }
        }
        
        @keyframes pathProgress {
            0% { 
                width: 0; 
            }
            50% { 
                width: 100%; 
            }
            100% { 
                width: 0; 
            }
        }
        
        @keyframes glow {
            0%, 100% { 
                filter: brightness(1); 
            }
            50% { 
                filter: brightness(1.2); 
            }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { 
                transform: translateY(0); 
            }
            40% { 
                transform: translateY(-10px); 
            }
            60% { 
                transform: translateY(-5px); 
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            animation: fadeInUp 1s ease-out forwards;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .notification-success {
            background-color: #10b981;
        }
        
        .notification-error {
            background-color: #ef4444;
        }
        
        .notification-info {
            background-color: #3b82f6;
        }
    `;
    
    document.head.appendChild(style);
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Inject CSS animations
    injectCSSAnimations();
    
    // Initialize the app
    const app = new PickHealthApp();
    
    // Make app globally available for debugging
    window.pickHealthApp = app;
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add loading state
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading spinner if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PickHealthApp;
}
