// Global JavaScript for Afaq Youth Foundation Website - Multiple Pages - FIXED VERSION

document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader and page load handling
    const preloader = document.querySelector('.preloader');
    const body = document.body;
    
    // Show preloader initially
    if (preloader) {
        preloader.style.display = 'flex';
    }
    
    // Hide preloader and show content when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
            body.classList.add('loaded');
        }, 500); // Small delay for better UX
    });
    
    // Fallback: Hide preloader after 3 seconds if load event doesn't fire
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
        body.classList.add('loaded');
    }, 3000);

    // Navigation scroll effect
    const navbar = document.getElementById('mainNav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile sidebar functionality - FIXED VERSION
    const navToggler = document.getElementById('navToggler');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    // Debug logging
    console.log('Navigation elements:', {
        navToggler: !!navToggler,
        mobileSidebar: !!mobileSidebar,
        closeSidebar: !!closeSidebar,
        sidebarOverlay: !!sidebarOverlay
    });

    // Open sidebar function
    function openSidebar() {
        console.log('Opening sidebar...');
        if (mobileSidebar) {
            mobileSidebar.classList.add('active');
            console.log('Sidebar class added');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('active');
            console.log('Overlay class added');
        }
        document.body.style.overflow = 'hidden';
    }

    // Close sidebar function
    function closeSidebarFunction() {
        console.log('Closing sidebar...');
        if (mobileSidebar) {
            mobileSidebar.classList.remove('active');
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
    }

    // Open sidebar event
    if (navToggler) {
        navToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Nav toggler clicked');
            openSidebar();
        });
        
        // Also handle touch events for mobile
        navToggler.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Nav toggler touched');
            openSidebar();
        });
    }

    // Close sidebar events
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebarFunction();
        });
        
        closeSidebar.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebarFunction();
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebarFunction();
        });
        
        sidebarOverlay.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebarFunction();
        });
    }

    // Close sidebar when clicking on links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to allow navigation
            setTimeout(closeSidebarFunction, 100);
        });
    });

    // Active navigation link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Statistics counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString('ar-SA');
            }, 16);
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stat-item');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Form submission handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'جاري الإرسال...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    showNotification('تم إرسال الرسالة بنجاح!', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });

    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter .btn');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = document.querySelector('.newsletter .form-control');
            const email = emailInput ? emailInput.value.trim() : '';
            
            if (!email) {
                showNotification('يرجى إدخال البريد الإلكتروني', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            const originalText = this.textContent;
            this.textContent = 'جاري الاشتراك...';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification('تم الاشتراك في النشرة البريدية بنجاح!', 'success');
                if (emailInput) emailInput.value = '';
                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1060;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: 'Noto Sans Arabic', sans-serif;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close sidebar
        if (e.key === 'Escape') {
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                closeSidebarFunction();
            }
        }
    });

    // Page transition effect
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's the current page
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                e.preventDefault();
                return;
            }
            
            // Add page transition effect
            e.preventDefault();
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            disable: 'mobile' // Disable on mobile for better performance
        });
    }

    // Smooth scroll for anchor links
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

    // Image lazy loading fallback for older browsers
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Touch gesture support for mobile sidebar
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 100;
        const swipeDistance = touchEndX - touchStartX;
        
        // Swipe from right edge to open sidebar
        if (touchStartX > window.innerWidth - 50 && swipeDistance < -swipeThreshold) {
            openSidebar();
        }
        
        // Swipe right to close sidebar
        if (mobileSidebar && mobileSidebar.classList.contains('active') && swipeDistance > swipeThreshold) {
            closeSidebarFunction();
        }
    }

    // Viewport height fix for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Console welcome message
    console.log('%c🌟 مرحباً بك في موقع مؤسسة آفاق شبابية! 🌟', 'color: #2DB5A5; font-size: 16px; font-weight: bold;');
    console.log('%cتم تطوير هذا الموقع باستخدام أحدث التقنيات لضمان أفضل تجربة مستخدم.', 'color: #666; font-size: 12px;');
    console.log('%cFixed mobile responsiveness issues - Version 2.0', 'color: #FF8C42; font-size: 12px; font-weight: bold;');
});

// Global functions
window.AfaqWebsite = {
    showNotification: function(message, type) {
        const event = new CustomEvent('showNotification', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    },
    
    openSidebar: function() {
        const mobileSidebar = document.getElementById('mobileSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        
        if (mobileSidebar) mobileSidebar.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    closeSidebar: function() {
        const mobileSidebar = document.getElementById('mobileSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        
        if (mobileSidebar) mobileSidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// Service Worker registration for PWA support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

