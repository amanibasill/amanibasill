// ========================================
// Portfolio JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initFormHandling();
    initScrollAnimations();
    initActiveNavLink();
    initSnowfall();
    initTypingEffect();
    initSplashScreen();
});

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when page is scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', () => {
        // Toggle mobile menu
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = menuBtn.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });
    
    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            
            const spans = menuBtn.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Form Handling
// ========================================
function initFormHandling() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! Aman Basil will get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.95)' : type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(99, 102, 241, 0.95)'};
        color: white;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.skill-category, .project-card, .about-content, .contact-content'
    );
    
    // Set initial state
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    animateElements.forEach(el => observer.observe(el));
}

// ========================================
// Active Navigation Link on Scroll
// ========================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
            
            if (pageYOffset >= sectionTop - navbarHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// Keyboard Accessibility
// ========================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.getElementById('mobileMenuBtn');
        
        if (mobileMenu?.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            
            const spans = menuBtn?.querySelectorAll('span');
            spans?.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
});

// ========================================
// Preload hover effects (performance optimization)
// ========================================
const link = document.createElement('link');
link.rel = 'prefetch';
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap';
document.head.appendChild(link);

// ========================================
// Snowfall Animation
// ========================================
function initSnowfall() {
    const snowContainer = document.getElementById('snowContainer');
    if (!snowContainer) return;
    
    const snowflakeCount = 50;
    const iceParticleCount = 15;
    
    // Create snowflakes
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
        snowflake.style.animationDelay = (Math.random() * 10) + 's';
        snowflake.style.width = (Math.random() * 3 + 2) + 'px';
        snowflake.style.height = snowflake.style.width;
        snowflake.style.opacity = Math.random() * 0.6 + 0.2;
        snowContainer.appendChild(snowflake);
    }
    
    // Create ice particles
    for (let i = 0; i < iceParticleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'ice-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 8) + 's';
        particle.style.width = (Math.random() * 4 + 4) + 'px';
        particle.style.height = particle.style.width;
        snowContainer.appendChild(particle);
    }
}

// ========================================
// Typing Effect for Hero Title
// ========================================
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    titleElement.innerHTML = '';
    
    const line1Part1 = "Hi, I'm ";
    const highlightText = "AmanBasill";
    const line2 = "Software Developer";
    
    let i = 0;
    
    const textNode1 = document.createTextNode('');
    const highlightSpan = document.createElement('span');
    highlightSpan.className = 'highlight';
    const textNode2 = document.createTextNode('');
    const br = document.createElement('br');
    const textNode3 = document.createTextNode('');
    
    const cursor = document.createElement('span');
    cursor.innerHTML = '|';
    cursor.className = 'typing-cursor';
    
    titleElement.appendChild(textNode1);
    titleElement.appendChild(highlightSpan);
    highlightSpan.appendChild(textNode2);
    titleElement.appendChild(br);
    titleElement.appendChild(textNode3);
    titleElement.appendChild(cursor);
    
    let state = 0;
    
    function typeWriter() {
        if (state === 0) {
            if (i < line1Part1.length) {
                textNode1.nodeValue += line1Part1.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                state = 1;
                i = 0;
                setTimeout(typeWriter, 50);
            }
        } else if (state === 1) {
            if (i < highlightText.length) {
                textNode2.nodeValue += highlightText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                state = 2;
                i = 0;
                setTimeout(typeWriter, 300);
            }
        } else if (state === 2) {
            if (i < line2.length) {
                textNode3.nodeValue += line2.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
    }
    
    setTimeout(typeWriter, 500);
}
// ========================================
// Splash Screen
// ========================================
function initSplashScreen() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;
    
    // Check if it's the first time in this session (optional, but good for UX)
    // We'll show it every time for now as requested
    
    // Disable scrolling while splash is active
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        splash.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
        
        setTimeout(() => {
            splash.remove();
        }, 500);
    }, 3000); // 3 seconds
}
