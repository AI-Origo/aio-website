// Clean, minimal website interactions
document.addEventListener('DOMContentLoaded', () => {
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
    
    window.addEventListener('scroll', () => {
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
    });

    // Subtle parallax for intro section
    const intro = document.querySelector('.intro');
    if (intro) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            intro.style.transform = `translateY(${rate}px)`;
        });
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
    
    // Handle background video with robust looping
    const backgroundVideo = document.querySelector('.background-video');
    const backgroundVideoContainer = document.querySelector('.background-video-container');
    
    if (backgroundVideo) {
        // Force attributes
        backgroundVideo.setAttribute('autoplay', 'true');
        backgroundVideo.setAttribute('muted', 'true');
        backgroundVideo.setAttribute('playsinline', 'true');
        backgroundVideo.setAttribute('loop', 'true');
        backgroundVideo.loop = true;
        
        // Log video info
        backgroundVideo.addEventListener('loadedmetadata', function() {
            console.log(`Background video duration: ${backgroundVideo.duration}s`);
        });
        
        // Ensure it plays
        const playVideo = () => {
            backgroundVideo.play().catch(err => {
                console.log('Background video play error:', err);
            });
        };
        
        playVideo();
        
        // Handle ended event
        backgroundVideo.addEventListener('ended', function() {
            console.log('Background video ended, restarting...');
            backgroundVideo.currentTime = 0;
            playVideo();
        });
        
        // Also monitor time to force loop if needed
        let lastTime = 0;
        setInterval(() => {
            if (backgroundVideo.readyState >= 3 && backgroundVideo.duration) {
                // If video is near end or went backwards, loop it
                if (backgroundVideo.currentTime >= backgroundVideo.duration - 0.5 || 
                    backgroundVideo.currentTime < lastTime - 1) {
                    console.log(`Background video looping at ${backgroundVideo.currentTime.toFixed(1)}s`);
                    backgroundVideo.currentTime = 0;
                    playVideo();
                }
                lastTime = backgroundVideo.currentTime;
                
                // Ensure it's playing
                if (backgroundVideo.paused && !document.hidden) {
                    playVideo();
                }
            }
        }, 500);
        
        // Handle page visibility
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && backgroundVideo.paused) {
                playVideo();
            }
        });
        
        // Disable right-click
        [backgroundVideo, backgroundVideoContainer].filter(Boolean).forEach(element => {
            element.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
        });
    }
    
    // Ensure videos play and loop properly
    const videos = document.querySelectorAll('.innovation-video video');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                // Ensure loop attribute is set
                video.loop = true;
                video.muted = true;
                video.play().catch(() => {
                    // Silently handle autoplay errors
                });
            }
        });
    }, { threshold: 0.25 });
    
    videos.forEach((video, index) => {
        videoObserver.observe(video);
        // Ensure video is ready to play and loop
        video.load();
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        
        // Disable right-click context menu on videos
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Debug info
        const videoSrc = video.querySelector('source').src;
        const isHeatmap = videoSrc.includes('heatmap');
        
        // Force loop on ended event as fallback
        video.addEventListener('ended', function() {
            console.log(`Video ended: ${videoSrc}`);
            this.currentTime = 0;
            this.play().catch(err => {
                console.error(`Error replaying video: ${videoSrc}`, err);
            });
        });
        
        // Special handling for heatmap video with incorrect duration
        if (isHeatmap) {
            // Check video duration when metadata loads
            video.addEventListener('loadedmetadata', function() {
                console.log(`Heatmap video duration: ${this.duration}s (expected 8-11s)`);
                
                // Force loop after 10 seconds since the duration metadata is wrong
                const EXPECTED_DURATION = 10; // seconds
                
                this.addEventListener('timeupdate', function() {
                    // Force loop at 10 seconds regardless of reported duration
                    if (this.currentTime >= EXPECTED_DURATION) {
                        console.log('Forcing heatmap loop at 10s');
                        this.currentTime = 0;
                        this.play().catch(() => {});
                    }
                });
                
                // Also set up interval-based check
                setInterval(() => {
                    if (this.currentTime >= EXPECTED_DURATION) {
                        this.currentTime = 0;
                        this.play().catch(() => {});
                    }
                    if (this.paused && !document.hidden && this.readyState >= 2) {
                        this.play().catch(() => {});
                    }
                }, 100);
            });
        }
        
        // Special handling for Safari and other browsers
        video.addEventListener('pause', function() {
            if (!this.seeking && !document.hidden) {
                this.play().catch(() => {});
            }
        });
        
        // Log any errors and video info
        video.addEventListener('error', function(e) {
            console.error(`Video error for ${videoSrc}:`, e);
            console.error(`Video readyState: ${this.readyState}, networkState: ${this.networkState}`);
        });
        
        // Log video info when loaded
        video.addEventListener('loadedmetadata', function() {
            console.log(`Video loaded: ${videoSrc.split('/').pop()}`);
            console.log(`- Duration: ${this.duration}s`);
            console.log(`- Size: ${this.videoWidth}x${this.videoHeight}`);
            console.log(`- Ready state: ${this.readyState}`);
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
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.3';
        }
    });

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