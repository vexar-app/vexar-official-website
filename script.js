// Vexar Website - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize internationalization
    window.i18nInstance = new I18n();

    // Initialize all components
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimations();
    initSmoothScroll();
    initParallaxEffects();
    initFAQ();
    fetchLatestRelease();
});

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ============================================
// NAVBAR
// ============================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when scrolled down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(easeOutQuart * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallaxEffects() {
    const orbs = document.querySelectorAll('.orb');
    const floatCards = document.querySelectorAll('.float-card');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;

                // Subtle parallax for orbs
                orbs.forEach((orb, index) => {
                    const speed = 0.02 + (index * 0.01);
                    orb.style.transform = `translateY(${scrollY * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Mouse parallax for float cards
    if (window.matchMedia('(min-width: 768px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            floatCards.forEach((card, index) => {
                const speed = 10 + (index * 5);
                const rotateX = mouseY * 5;
                const rotateY = mouseX * 5;

                card.style.transform = `
                    translateX(${mouseX * speed}px) 
                    translateY(${mouseY * speed}px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                `;
            });
        });
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// DYNAMIC TYPING EFFECT (Optional enhancement)
// ============================================

class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ============================================
// CURSOR GLOW EFFECT
// ============================================

function initCursorGlow() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }
}

// ============================================
// LOADING SCREEN (Optional)
// ============================================

function initLoadingScreen() {
    const loader = document.querySelector('.loading-screen');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 500);
        });
    }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    const container = document.querySelector('.toast-container') || createToastContainer();
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Toggle language with Alt + L
    if (e.altKey && e.key === 'l') {
        const i18n = window.i18nInstance;
        if (i18n) {
            i18n.toggleLanguage();
        }
    }

    // Quick scroll to top with Home key
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ============================================
// PERFORMANCE MONITORING (Development only)
// ============================================

if (process?.env?.NODE_ENV === 'development') {
    // Log performance metrics
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }
    });
}

// ============================================
// SERVICE WORKER REGISTRATION (PWA Support)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                // Service worker registration failed - this is fine for development
            });
    });
}

// ============================================
// ANALYTICS EVENTS (Privacy-friendly)
// ============================================

function trackEvent(category, action, label = null) {
    // Only track if analytics is enabled and available
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track download clicks
document.querySelectorAll('.btn-download, .btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Download', 'click', 'macOS');
    });
});

// Track GitHub visits
document.querySelectorAll('.btn-github, a[href*="github"]').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('External', 'github_visit', 'Repository');
    });
});

// ============================================
// GITHUB RELEASE FETCHING
// ============================================

async function fetchLatestRelease() {
    // Repositories
    const repoMac = 'vexar-app/vexar-app';
    const repoWin = 'vexar-app/vexar-windows';
    
    // API URLs
    const apiMac = `https://api.github.com/repos/${repoMac}/releases/latest`;
    const apiWin = `https://api.github.com/repos/${repoWin}/releases/latest`;

    try {
        // Fetch both releases in parallel
        const [resMac, resWin] = await Promise.all([
            fetch(apiMac).catch(e => null),
            fetch(apiWin).catch(e => null)
        ]);

        let macData = null;
        let winData = null;

        if (resMac && resMac.ok) macData = await resMac.json();
        if (resWin && resWin.ok) winData = await resWin.json();

        // 1. Process macOS Assets (from vexar-app)
        let macAsset = null;
        let macVersion = 'v1.0.0'; // Fallback
        
        if (macData) {
            macVersion = macData.tag_name;
            macAsset = macData.assets.find(a => a.name.endsWith('.dmg')) ||
                       macData.assets.find(a => a.name.endsWith('.zip'));
            
            // Update version in i18n
            if (window.i18nInstance) {
                window.i18nInstance.setVersion(macVersion); 
            }
        }

        // 2. Process Windows Assets (from vexar-windows)
        let winAssetExe = null;
        let winAssetMsi = null;
        
        if (winData) {
            winAssetExe = winData.assets.find(a => a.name.endsWith('.exe'));
            winAssetMsi = winData.assets.find(a => a.name.endsWith('.msi'));
        }

        // 3. Update macOS Button
        const btnMac = document.getElementById('btn-download-mac');
        if (btnMac) {
             if (macAsset) {
                btnMac.href = macAsset.browser_download_url;
                const ext = macAsset.name.split('.').pop().toUpperCase();
                const verSpan = document.getElementById('ver-mac');
                if (verSpan) verSpan.textContent = `macOS 13.0+ • ${ext}`;
             } else {
                 btnMac.href = `https://github.com/${repoMac}/releases/latest`;
             }
        }

        // 4. Update Windows Buttons (EXE & MSI)
        const btnWinExe = document.getElementById('btn-download-win-exe');
        const btnWinMsi = document.getElementById('btn-download-win-msi');

        if (btnWinExe) {
            if (winAssetExe) {
                btnWinExe.href = winAssetExe.browser_download_url;
                const verSpan = document.getElementById('ver-win-exe');
                if (verSpan) verSpan.textContent = `Windows 10/11 • EXE`;
            } else {
                btnWinExe.href = `https://github.com/${repoWin}/releases/latest`;
            }
        }

        if (btnWinMsi) {
            if (winAssetMsi) {
                btnWinMsi.href = winAssetMsi.browser_download_url;
                const verSpan = document.getElementById('ver-win-msi');
                if (verSpan) verSpan.textContent = `Windows 10/11 • MSI`;
            } else {
                // If MSI not found, hide or fallback
                // For now fallback to repo
                btnWinMsi.href = `https://github.com/${repoWin}/releases/latest`;
            }
        }

        // 5. Update Hero Button (Smart Button)
        // Robust OS Detection
        const platform = navigator.platform.toLowerCase();
        const userAgent = navigator.userAgent.toLowerCase();
        const isWindows = platform.includes('win') || userAgent.includes('windows');
        const isMac = platform.includes('mac') || userAgent.includes('macintosh');
        
        // Default to Windows if not Mac (or explicit Windows)
        // If we can't determine, we usually prefer Windows as it has more market share, 
        // or we could show a generic release page. 
        // For this tailored app, we'll assume Windows if not Mac.
        const targetOS = isMac ? 'macOS' : 'Windows';

        const heroBtn = document.querySelector('.hero-actions .btn-primary');
        if (heroBtn) {
            if (targetOS === 'Windows') {
                if (winAssetExe) heroBtn.href = winAssetExe.browser_download_url;
                else if (winAssetMsi) heroBtn.href = winAssetMsi.browser_download_url;
                else heroBtn.href = `https://github.com/${repoWin}/releases/latest`;
            } else {
                 // macOS
                 if (macAsset) heroBtn.href = macAsset.browser_download_url;
                 else heroBtn.href = `https://github.com/${repoMac}/releases/latest`;
            }
        }

        // Update i18n OS detection
        // This updates the text "Download for Windows" / "Download for macOS"
        if (window.i18nInstance) {
             window.i18nInstance.setOS(targetOS);
        }

    } catch (error) {
        console.error('Error fetching latest releases:', error);
    }
}
