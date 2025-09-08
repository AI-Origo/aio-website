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

    // Handle background video with lazy loading
    const backgroundVideo = document.querySelector('.background-video');
    const backgroundVideoContainer = document.querySelector('.background-video-container');

    if (backgroundVideo) {
        // Set video attributes
        backgroundVideo.setAttribute('autoplay', 'true');
        backgroundVideo.setAttribute('muted', 'true');
        backgroundVideo.setAttribute('playsinline', 'true');
        backgroundVideo.setAttribute('loop', 'true');
        backgroundVideo.loop = true;
        backgroundVideo.muted = true;

        if (!isMobile) {
            // Desktop: Store and remove source for lazy loading
            const source = backgroundVideo.querySelector('source');
            const originalSrc = source?.src;
            const originalType = source?.type || 'video/mp4';

            if (source) {
                source.remove();
                backgroundVideo.load(); // Reset video

                // Load background video after a short delay
                setTimeout(() => {
                    const newSource = document.createElement('source');
                    newSource.src = originalSrc;
                    newSource.type = originalType;
                    backgroundVideo.appendChild(newSource);
                    backgroundVideo.load();

                    // Re-ensure attributes are set after loading new source
                    backgroundVideo.setAttribute('loop', 'true');
                    backgroundVideo.loop = true;
                    backgroundVideo.muted = true;

                    // Play when ready
                    backgroundVideo.addEventListener('loadeddata', () => {
                        // Double-check loop is enabled before playing
                        backgroundVideo.loop = true;
                        backgroundVideo.play().catch(err => {
                            console.log('Background video autoplay failed:', err);
                        });
                    }, { once: true });

                    // Log video info and check loop status
                    backgroundVideo.addEventListener('loadedmetadata', () => {
                        console.log(`Background video duration: ${backgroundVideo.duration}s, loop: ${backgroundVideo.loop}`);
                        // Force loop attribute again if needed
                        if (!backgroundVideo.loop) {
                            backgroundVideo.loop = true;
                            backgroundVideo.setAttribute('loop', 'true');
                        }
                    }, { once: true });
                }, 2000); // 2 second delay for background video
            }
        } else {
            // Mobile: Play immediately
            backgroundVideo.play().catch(err => {
                console.log('Background video autoplay failed:', err);
            });
        }

        // Handle ended event for looping fallback
        backgroundVideo.addEventListener('ended', function() {
            console.log('Background video ended, restarting...');
            backgroundVideo.currentTime = 0;
            backgroundVideo.play().catch(() => {});
        });

        // Handle page visibility
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && backgroundVideo.paused && backgroundVideo.readyState >= 3) {
                backgroundVideo.play().catch(() => {});
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

    // Ensure videos play and loop properly with deferred loading on desktop
    const videos = document.querySelectorAll('.innovation-video video');

    // Store original sources for lazy loading
    const videoSources = new Map();

    if (!isMobile) {
        // Desktop: Remove sources to prevent immediate loading
        videos.forEach((video, index) => {
            // Set video attributes before removing sources
            video.setAttribute('loop', 'true');
            video.setAttribute('muted', 'true');
            video.setAttribute('playsinline', 'true');
            video.setAttribute('autoplay', 'true');

            const sources = video.querySelectorAll('source');
            const sourceData = [];
            sources.forEach(source => {
                sourceData.push({
                    src: source.src,
                    type: source.type
                });
                source.remove(); // Remove source element completely to prevent loading
            });
            videoSources.set(video, sourceData);
            video.load(); // Reset video after removing sources
        });
    }

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const container = video.closest('.innovation-video');

                // Check if we need to load the video (desktop lazy loading)
                if (!isMobile && videoSources.has(video) && !video.hasAttribute('data-loaded')) {
                    const sources = videoSources.get(video);
                    // Re-add sources
                    sources.forEach(sourceData => {
                        const source = document.createElement('source');
                        source.src = sourceData.src;
                        source.type = sourceData.type;
                        video.appendChild(source);
                    });
                    video.setAttribute('data-loaded', 'true');
                    video.load(); // Load the video with new sources

                    // Add loaded class and ensure playback when video is ready
                    video.addEventListener('loadeddata', () => {
                        container.classList.add('video-loaded');
                        // Ensure video plays after loading
                        video.play().catch(() => {
                            // Silently handle autoplay errors
                        });
                    }, { once: true });
                } else if (!isMobile && video.hasAttribute('data-loaded')) {
                    // Video already loaded, just ensure it plays and remove loading indicator
                    container.classList.add('video-loaded');
                    video.play().catch(() => {
                        // Silently handle autoplay errors
                    });
                }

                // Ensure loop attribute is set and play video if visible
                video.loop = true;
                video.muted = true;
                if (!video.hasAttribute('data-loaded') || isMobile) {
                    video.play().catch(() => {
                        // Silently handle autoplay errors
                    });
                }
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px' // Only trigger when well into viewport
    });

    videos.forEach((video, index) => {
        videoObserver.observe(video);
        // Basic setup for all videos
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        // For mobile, videos are loaded normally, mark container as loaded
        if (isMobile) {
            video.closest('.innovation-video').classList.add('video-loaded');
        }

        // Failsafe: Remove loading indicator after 3 seconds on desktop
        if (!isMobile) {
            setTimeout(() => {
                const container = video.closest('.innovation-video');
                if (!container.classList.contains('video-loaded')) {
                    container.classList.add('video-loaded');
                }
            }, 3000);
        }

        // Disable right-click context menu on videos
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        // Debug info - get src from stored data or current source
        let videoSrc = '';
        if (videoSources.has(video)) {
            // Desktop: get from stored data
            const sources = videoSources.get(video);
            videoSrc = sources[0]?.src || '';
        } else {
            // Mobile or already loaded: get from DOM
            videoSrc = video.querySelector('source')?.src || '';
        }
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
                let heatmapInterval = null;

                // Use throttled timeupdate for better performance
                const checkHeatmapLoop = throttle(() => {
                    if (this.currentTime >= EXPECTED_DURATION) {
                        console.log('Forcing heatmap loop at 10s');
                        this.currentTime = 0;
                        this.play().catch(() => {});
                    }
                }, 250); // Check 4 times per second max

                this.addEventListener('timeupdate', checkHeatmapLoop);

                // Clean up interval on page unload
                window.addEventListener('beforeunload', () => {
                    if (heatmapInterval) {
                        clearInterval(heatmapInterval);
                    }
                });
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