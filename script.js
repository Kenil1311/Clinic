// Modern Clinicia Landing Page JavaScript

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Initialize all components
    initNavbarEffects();
    initScrollProgress();
    initSmoothScrolling();
    initParallaxEffects();
    initFormAnimations();
    initCounterAnimations();

    initFloatingElements();
    initMobileMenu();
    initTabSwitching();
    initScrollAnimations();
});

// Navbar scroll effects
function initNavbarEffects() {
    const navbar = document.getElementById('mainNavbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

// Scroll progress bar
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

// Parallax effects for hero section
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    if (!heroSection) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        floatingShapes.forEach((shape, index) => {
            const speed = parallaxSpeed * (index + 1) * 0.3;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Animated form interactions
function initFormAnimations() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Focus animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation feedback
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.hero-stat-inline-number.counter');
    let counterAnimated = false;
    
    const animateCounters = () => {
        if (counterAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 60; // 60 frames for smooth animation
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format numbers appropriately
                let displayValue;
                if (target >= 1000000) {
                    displayValue = (Math.floor(current / 100000) / 10) + 'M+';
                } else if (target >= 1000) {
                    displayValue = Math.floor(current).toLocaleString() + '+';
                } else {
                    displayValue = Math.floor(current);
                }
                
                counter.textContent = displayValue;
            }, 16); // ~60fps
        });
        
        counterAnimated = true;
    };
    
    // Trigger animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 1500); // Delay for better effect after hero loads
            }
        });
    }, { threshold: 0.3 });
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// Enhanced dropdown functionality
function initDropdownEnhancements() {
    // Add smooth dropdown animations
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                // Close other open dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
                        if (otherMenu && otherToggle) {
                            otherMenu.classList.remove('show');
                            otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
            });
            
            // Add hover effects for desktop
            if (window.innerWidth > 991) {
                dropdown.addEventListener('mouseenter', () => {
                    menu.classList.add('show');
                    toggle.setAttribute('aria-expanded', 'true');
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    menu.classList.remove('show');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            }
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (menu && toggle) {
                    menu.classList.remove('show');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}



// Enhanced floating elements
function initFloatingElements() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random delay and duration for more natural movement
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        card.style.animationDelay = `${randomDelay}s`;
        card.style.animationDuration = `${randomDuration}s`;
        
        // Add subtle rotation on hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(2deg) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });
}

// Mobile menu enhancements
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarToggler || !navbarCollapse) return;
    
    navbarToggler.addEventListener('click', function() {
        // Add smooth animation class
        navbarCollapse.classList.toggle('animating');
        
        // Toggle icon animation
        const icon = this.querySelector('i') || this.querySelector('.navbar-toggler-icon');
        if (icon) {
            icon.classList.toggle('active');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });

    // Enhanced mobile dropdown handling
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns in mobile
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
                            if (otherMenu && otherToggle) {
                                otherMenu.classList.remove('show');
                                otherToggle.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    const isOpen = menu.classList.contains('show');
                    if (isOpen) {
                        menu.classList.remove('show');
                        toggle.setAttribute('aria-expanded', 'false');
                    } else {
                        menu.classList.add('show');
                        toggle.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        }
    });

    // Close mobile menu when window resizes to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
}

// Tab switching animations
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading animation
            const targetPane = document.querySelector(this.getAttribute('data-bs-target'));
            
            if (targetPane) {
                targetPane.style.opacity = '0';
                targetPane.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    targetPane.style.opacity = '1';
                    targetPane.style.transform = 'translateY(0)';
                }, 150);
            }
        });
    });
}

// Advanced scroll animations
function initScrollAnimations() {
    // Stagger animations for card grids (except hero section)
    const cardGroups = document.querySelectorAll('.row .col-lg-4:not(.hero-section *), .row .col-lg-3:not(.hero-section *), .row .col-md-6:not(.hero-section *)');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    cardGroups.forEach(card => {
        staggerObserver.observe(card);
    });
    
    // Immediately show hero section cards
    const heroCards = document.querySelectorAll('.hero-section .col-lg-4, .hero-section .col-lg-3, .hero-section .col-md-6');
    heroCards.forEach(card => {
        card.classList.add('animate-in');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // Fade-in animations for sections
    const sections = document.querySelectorAll('section:not(.hero-section)');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Immediately show hero section content
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('section-visible');
        
        // Force all hero elements to be visible immediately
        const heroElements = heroSection.querySelectorAll('*');
        heroElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
}

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
});

// Carousel auto-play enhancement
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#testimonialCarousel');
    
    if (carousel) {
        // Pause on hover
        carousel.addEventListener('mouseenter', function() {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.pause();
            }
        });
        
        carousel.addEventListener('mouseleave', function() {
            const carouselInstance = bootstrap.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.cycle();
            }
        });
    }
});

// Utility functions for performance
function debounce(func, wait) {
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

function throttle(func, limit) {
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

// Optimize scroll listeners for performance
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects are handled here
}, 16)); // ~60fps

// Loading screen (if needed)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Hide any loading spinners
    const loaders = document.querySelectorAll('.loader, .loading');
    loaders.forEach(loader => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    });
});

// Add CSS classes for animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.6s ease-out;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar-collapse.animating {
        transition: all 0.3s ease-in-out;
    }
    
    .typing-complete::after {
        content: '|';
        animation: blink 1s infinite;
        color: #ff4d4d;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .loaded * {
        animation-play-state: running !important;
    }
`;
document.head.appendChild(animationStyle);

// Solution Cards Functionality
function initSolutionCards() {
    const solutionCards = document.querySelectorAll('.solution-card');
    const solutionDetails = document.querySelectorAll('.solution-detail');
    
    if (solutionCards.length === 0) return;
    
    solutionCards.forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all cards
            solutionCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Hide all solution details
            solutionDetails.forEach(detail => detail.classList.remove('active'));
            // Show target solution detail
            const targetDetail = document.getElementById(target);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });
}

// Enhanced dropdown functionality
function initDropdownEnhancements() {
    // Add smooth dropdown animations
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                // Close other open dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        const otherToggle = otherDropdown.querySelector('.dropdown-toggle');
                        if (otherMenu && otherToggle) {
                            otherMenu.classList.remove('show');
                            otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
            });
            
            // Add hover effects for desktop
            if (window.innerWidth > 991) {
                dropdown.addEventListener('mouseenter', () => {
                    menu.classList.add('show');
                    toggle.setAttribute('aria-expanded', 'true');
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    menu.classList.remove('show');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            }
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                const toggle = dropdown.querySelector('.dropdown-toggle');
                if (menu && toggle) {
                    menu.classList.remove('show');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}

// Initialize solution cards when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Force hero section to be visible immediately on page load
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
        
        // Force all hero elements to be visible immediately (except title for animation)
        const heroElements = heroSection.querySelectorAll('*:not(.hero-title)');
        heroElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.animation = 'none';
            el.style.transition = 'none';
            el.style.visibility = 'visible';
        });
        
        // Allow hero title to have slide-in animation
        const heroTitle = heroSection.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.visibility = 'visible';
        }
    }
    
    initSolutionCards();
    initDropdownEnhancements();
});

// Performance monitoring
console.log('Clinicia Landing Page JavaScript loaded successfully');

// Analytics tracking (placeholder for real implementation)
function trackEvent(category, action, label) {
    // Implement your analytics tracking here
    console.log('Event tracked:', { category, action, label });
}

// Track important interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (target) {
        const text = target.textContent.trim();
        if (text.includes('Trial') || text.includes('Demo')) {
            trackEvent('CTA', 'click', text);
        }
    }
});