// Clean, minimal website interactions

// Throttle utility to limit function execution frequency
function throttle(func, wait) {
    let timeout;
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        const remaining = wait - (now - lastTime);

        if (remaining <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            lastTime = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                lastTime = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

// RequestAnimationFrame throttle for smooth animations
function rafThrottle(func) {
    let ticking = false;
    return function(...args) {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                func.apply(this, args);
                ticking = false;
            });
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on mobile early
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Smooth slide-in animation for page content
    const pageContent = document.querySelector('.page-content');
    const header = document.querySelector('.site-header');
    const heroSection = document.querySelector('.hero-section');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    // Initial states
    if (pageContent) {
        pageContent.style.opacity = '0';
        pageContent.style.transform = 'translateX(50px)';
    }

    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateX(30px)';
    }

    if (heroSection && heroTitle && heroSubtitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateX(40px)';
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateX(40px)';
    }

    // Animate everything in sequence
    requestAnimationFrame(() => {
        // Header first
        if (header) {
            header.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            header.style.opacity = '1';
            header.style.transform = 'translateX(0)';
        }

        // Hero section elements
        if (heroSection && heroTitle && heroSubtitle) {
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateX(0)';
            }, 150);

            setTimeout(() => {
                heroSubtitle.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateX(0)';
            }, 250);
        }

        // Page content
        if (pageContent) {
            setTimeout(() => {
                pageContent.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                pageContent.style.opacity = '1';
                pageContent.style.transform = 'translateX(0)';
            }, 100);
        }
    });

    // Subtle header behavior on scroll
    let lastScroll = 0;

    // Use RAF throttling for smooth header animations
    window.addEventListener('scroll', rafThrottle(() => {
        const currentScroll = window.pageYOffset;

        // Add subtle shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    }), { passive: true });

    // Subtle parallax for intro section
    const intro = document.querySelector('.intro');
    if (intro) {
        // Throttle parallax updates to 60fps max
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            intro.style.transform = `translateY(${rate}px)`;
        }, 16), { passive: true });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.expertise-item, .leadership-item, h2, .team-stats, .innovation-item, .partner-card, .partners-intro, .achievement-card');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(30px)';
        el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });

    // Disable right-click on all video containers
    const videoContainers = document.querySelectorAll('.innovation-video');
    videoContainers.forEach(container => {
        container.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
    });

    // Simple background video setup - let browser handle everything
    const backgroundVideo = document.querySelector('.background-video');
    const backgroundVideoContainer = document.querySelector('.background-video-container');

    if (backgroundVideo) {
        // Disable right-click
        [backgroundVideo, backgroundVideoContainer].filter(Boolean).forEach(element => {
            element.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
        });
    }

    // Simple setup for innovation videos - let browser handle everything
    const videos = document.querySelectorAll('.innovation-video video');

    videos.forEach((video) => {
        const container = video.closest('.innovation-video');

        // Mark all containers as loaded immediately
        container.classList.add('video-loaded');

        // Disable right-click context menu on videos
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        // Simple logging for debugging
        video.addEventListener('loadedmetadata', function() {
            console.log(`Video loaded: ${video.querySelector('source')?.src.split('/').pop()}`);
        });
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const siteNav = document.getElementById('site-nav');

    if (mobileMenuToggle && siteNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            siteNav.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (siteNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = siteNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                siteNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!siteNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                siteNav.classList.remove('active');
                document.body.style.overflow = '';
            }
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

    // Add and manage scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    // Throttle scroll indicator updates
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.3';
        }
    }, 100), { passive: true });

    // Smooth page transitions for internal links
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
    internalLinks.forEach(link => {
        // Skip if it's an anchor link
        if (link.getAttribute('href').startsWith('#')) return;

        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Only handle internal navigation
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                if (pageContent) {
                    pageContent.style.transform = 'translateX(-30px)';
                    pageContent.style.opacity = '0';
                }
                if (header) {
                    header.style.transform = 'translateX(-20px)';
                    header.style.opacity = '0';
                }
                setTimeout(() => {
                    window.location.href = href;
                }, 250);
            }
        });
    });

    // Add header transition style
    if (header) {
        header.style.transition = 'all 0.3s ease';
    }

    // Console message
    console.log('%c AI Origo', 'color: #00ccff; font-size: 20px; font-weight: bold;');
    console.log('%c Transforming businesses through innovative AI solutions', 'color: #888; font-size: 12px;');
});