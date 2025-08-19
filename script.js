// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initScrollAnimations();
    initSmoothScrolling();
    initCounterAnimations();
    initParallaxEffects();
    initCTAButton();
    initMemberCardInteractions();
    initPriceHighlight();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('benefit-cards') || 
                    entry.target.classList.contains('members-grid')) {
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('fade-in', 'visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.hero-content, .section-title, .benefit-cards, .members-grid, ' +
        '.audience-grid, .pricing-card, .contact-methods, .cta-content'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = [
        { element: '.price', target: 5980, suffix: '円', duration: 2000 },
        { element: '.new-price', target: 6980, suffix: '円', duration: 2000 }
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = counters.find(c => entry.target.matches(c.element));
                if (counter && !entry.target.dataset.animated) {
                    animateCounter(entry.target, counter.target, counter.suffix, counter.duration);
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    });

    counters.forEach(counter => {
        const element = document.querySelector(counter.element);
        if (element) {
            observer.observe(element);
        }
    });
}

function animateCounter(element, target, suffix, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + suffix;
        }
    }, 16);
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .pricing');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// CTA Button Interactions
function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        // Add click animation
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add pulse animation
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 300);
            
            // Show confirmation message
            showNotification('お問い合わせページに移動します...', 'success');
        });

        // Add hover sound effect (optional)
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Member Card Interactions
function initMemberCardInteractions() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        // Add tilt effect on hover
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-5px) rotateX(5deg) rotateY(5deg)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Add click interaction for mystery card
        if (card.classList.contains('mystery')) {
            card.addEventListener('click', function() {
                showNotification('8月のアップデートをお楽しみに！ 🎉', 'info');
                this.classList.add('pulse');
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 300);
            });
        }
    });
}

// Price Highlight Animation
function initPriceHighlight() {
    const priceElements = document.querySelectorAll('.price, .new-price');
    
    priceElements.forEach(price => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('highlight-animation');
                    setTimeout(() => {
                        entry.target.classList.remove('highlight-animation');
                    }, 2000);
                }
            });
        });
        
        observer.observe(price);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'warning': return '⚠️';
        case 'info': default: return 'ℹ️';
    }
}

// Add Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Animate hero elements in sequence
    const heroElements = document.querySelectorAll('.pain-item');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('slide-in-up');
        }, index * 200);
    });
});

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Form Validation (if needed)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showNotification('フォームの入力内容を確認してください', 'error');
            }
        });
    });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Mobile Menu Toggle (if needed)
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Performance Optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    function updateScrollEffects() {
        // Update parallax and other scroll effects here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Initialize performance optimizations
optimizePerformance();

// Easter Egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        showNotification('🎉 隠しコマンド発見！ AIチームがパワーアップしました！', 'success');
        document.body.classList.add('easter-egg-mode');
        
        setTimeout(() => {
            document.body.classList.remove('easter-egg-mode');
        }, 5000);
    }
});

// Analytics Tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Google Analytics or other tracking service integration
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    console.log('Event tracked:', eventName, properties);
}

// Track CTA clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent,
            page_location: window.location.href
        });
    }
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', function() {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        if (maxScrollDepth % 25 === 0) {
            trackEvent('scroll_depth', { depth: maxScrollDepth });
        }
    }
});

// Add CSS for additional animations and effects
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .pulse {
        animation: pulse-animation 0.3s ease-in-out;
    }
    
    @keyframes pulse-animation {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .highlight-animation {
        animation: highlight-glow 2s ease-in-out;
    }
    
    @keyframes highlight-glow {
        0%, 100% { text-shadow: none; }
        50% { text-shadow: 0 0 20px rgba(254, 202, 87, 0.8); }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        border: 1px solid #e2e8f0;
        animation: slide-in-notification 0.3s ease-out;
        max-width: 400px;
    }
    
    .notification-content {
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        margin-left: auto;
    }
    
    .notification-success {
        border-left: 4px solid #48bb78;
    }
    
    .notification-error {
        border-left: 4px solid #f56565;
    }
    
    .notification-warning {
        border-left: 4px solid #ed8936;
    }
    
    .notification-info {
        border-left: 4px solid #4299e1;
    }
    
    .fade-out {
        animation: fade-out-notification 0.3s ease-in forwards;
    }
    
    @keyframes slide-in-notification {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fade-out-notification {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    }
    
    .slide-in-up {
        animation: slide-in-up 0.6s ease-out forwards;
    }
    
    @keyframes slide-in-up {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .easter-egg-mode {
        animation: rainbow-background 2s infinite;
    }
    
    @keyframes rainbow-background {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    body.loaded {
        animation: page-load-fade-in 0.5s ease-out;
    }
    
    @keyframes page-load-fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);