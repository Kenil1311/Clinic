// Features Page JavaScript
// Imports functionality from main script.js

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
    initFeaturesNavbar();
    initFeaturesScrollProgress();
    initFeaturesSmoothScrolling();
    initFeaturesAnimations();
    initFeaturesMobileMenu();
    initFeaturesParallax();
    initFeaturesScrollAnimations();
    initFeaturesClickDropdowns();
    
    console.log('Clinicia Features Page JavaScript loaded successfully');
});

// Features-specific navbar effects
function initFeaturesNavbar() {
    const navbar = document.getElementById('mainNavbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting for features page
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
function initFeaturesScrollProgress() {
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
function initFeaturesSmoothScrolling() {
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

// Features page specific animations
function initFeaturesAnimations() {
    // Enhanced hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add glow effect
            this.style.boxShadow = '0 20px 60px rgba(255, 77, 77, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Staggered animation for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, index * 100);
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        featureObserver.observe(card);
    });
}

// Mobile menu functionality
function initFeaturesMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarToggler || !navbarCollapse) return;
    
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('animating');
        
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

// Parallax effects for features hero
function initFeaturesParallax() {
    const heroSection = document.querySelector('.features-hero-section');
    
    if (!heroSection) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
    });
});

// Scroll-based animations
function initFeaturesScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
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
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    initFeaturesScrollAnimations();
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

// Add CSS classes for animations
const featuresStyle = document.createElement('style');
featuresStyle.textContent = `
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar-collapse.animating {
        transition: all 0.3s ease-in-out;
    }
    
    .feature-card {
        transition: all 0.3s ease;
    }
    
    .feature-card:hover {
        transform: translateY(-8px) scale(1.02);
    }
    
    .feature-icon {
        transition: all 0.3s ease;
    }
    
    .feature-check {
        transition: all 0.3s ease;
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
    
    .aos-animate {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(featuresStyle);

// Hover-open, click-outside-close dropdown functionality for features page
function initFeaturesClickDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Open on hover
            dropdown.addEventListener('mouseenter', () => {
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
                
                // Open current dropdown
                menu.classList.add('show');
                toggle.setAttribute('aria-expanded', 'true');
            });
            
            // Also open on click for mobile compatibility
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
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
                
                // Toggle current dropdown
                const isOpen = menu.classList.contains('show');
                if (isOpen) {
                    menu.classList.remove('show');
                    toggle.setAttribute('aria-expanded', 'false');
                } else {
                    menu.classList.add('show');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });
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