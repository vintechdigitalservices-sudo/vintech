// Mobile Menu Toggle - FIXED with Drawer
const mobileToggle = document.getElementById('mobileToggle');
const navDrawer = document.getElementById('navDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');
const body = document.body;

function openDrawer() {
    if (navDrawer) {
        navDrawer.classList.add('open');
        if (drawerOverlay) drawerOverlay.classList.add('active');
        if (mobileToggle) mobileToggle.classList.add('active');
        body.style.overflow = 'hidden';
    }
}

function closeDrawer() {
    if (navDrawer) {
        navDrawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
        body.style.overflow = '';
    }
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', openDrawer);
}
if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
}
if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
}

// Close drawer when clicking on any link inside
document.querySelectorAll('.drawer-nav a').forEach(link => {
    link.addEventListener('click', closeDrawer);
});

// Also handle the original nav-menu for desktop (keep for compatibility)
const navMenu = document.getElementById('navMenu');
const originalNavLinks = document.querySelectorAll('.nav-menu a');
originalNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Preloader with percentage
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const percentageSpan = document.getElementById('percentage');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hide');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 200);
        }
        if (progressBar) progressBar.style.width = progress + '%';
        if (percentageSpan) percentageSpan.textContent = progress + '%';
    }, 100);
});

// Firebase imports and config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBZfUSIlJKUaHV05t-x1B4J-cXQJtcXEs",
    authDomain: "vintech-backend.firebaseapp.com",
    projectId: "vintech-backend",
    storageBucket: "vintech-backend.firebasestorage.app",
    messagingSenderId: "891897245100",
    appId: "1:891897245100:web:9f935a6337831c5a649e09"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll Animations (both up and down) - FIXED
    function checkScroll() {
        const revealElements = document.querySelectorAll('.reveal');
        const slideRightElements = document.querySelectorAll('.slide-right');
        const whyCards = document.querySelectorAll('.why-card');
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        const statCards = document.querySelectorAll('.stat-card');
        const faqItems = document.querySelectorAll('.faq-item');
        
        const windowHeight = window.innerHeight;
        const threshold = 0.85;
        
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * threshold) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
        
        slideRightElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * threshold) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
        
        whyCards.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * threshold) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
        
        portfolioCards.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * threshold) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
        
        statCards.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * threshold) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
        
        faqItems.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * threshold) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }
    
    // Counter Animation for Stats
    function animateCounter() {
        const counters = document.querySelectorAll('.stat__num');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }
    
    // Trigger counter when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    let counterTriggered = false;
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterTriggered) {
                animateCounter();
                counterTriggered = true;
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) statObserver.observe(statsSection);
    
    // FAQ Accordion
    document.querySelectorAll('.faq-item__q').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            
            document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
            
            if (!isOpen) item.classList.add('open');
        });
    });
    
    // Service Modal
    const modal = document.getElementById('serviceModal');
    const knowMoreBtns = document.querySelectorAll('.know-more-btn');
    const enquireBtns = document.querySelectorAll('.enquire-btn');
    const closeBtn = document.querySelector('.modal__close');
    const selectedServiceSpan = document.getElementById('selectedService');
    const serviceSelect = document.getElementById('serviceSelect');
    const businessTypeSelect = document.getElementById('businessType');
    const otherBusinessWrapper = document.getElementById('otherBusinessTypeWrapper');
    const hireForm = document.getElementById('hireForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (businessTypeSelect) {
        businessTypeSelect.addEventListener('change', () => {
            if (businessTypeSelect.value === 'other') {
                if (otherBusinessWrapper) otherBusinessWrapper.style.display = 'block';
            } else {
                if (otherBusinessWrapper) otherBusinessWrapper.style.display = 'none';
            }
        });
    }
    
    const allModalTriggers = [...knowMoreBtns, ...enquireBtns];
    
    allModalTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.getAttribute('data-service');
            if (selectedServiceSpan) selectedServiceSpan.textContent = service;
            if (serviceSelect) serviceSelect.value = service;
            if (modal) modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Hire Form Submission
    if (hireForm) {
        hireForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            }
            
            try {
                const formData = new FormData(hireForm);
                const data = Object.fromEntries(formData.entries());
                data.createdAt = serverTimestamp();
                
                await addDoc(collection(db, "agency-order"), data);
                window.location.href = "thanks.html";
            } catch (err) {
                alert("Submission failed: " + err.message);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Submit Request';
                }
            }
        });
    }
    
    // Feedback Form Submission
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackSubmitBtn = document.getElementById('feedbackSubmitBtn');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (feedbackSubmitBtn) {
                feedbackSubmitBtn.disabled = true;
                feedbackSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
            
            try {
                const formData = new FormData(feedbackForm);
                const data = Object.fromEntries(formData.entries());
                data.createdAt = serverTimestamp();
                
                await addDoc(collection(db, "feedbacks"), data);
                
                if (feedbackSubmitBtn) {
                    feedbackSubmitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    feedbackSubmitBtn.style.background = '#16a34a';
                }
                
                setTimeout(() => {
                    feedbackForm.reset();
                    if (feedbackSubmitBtn) {
                        feedbackSubmitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                        feedbackSubmitBtn.style.background = '';
                        feedbackSubmitBtn.disabled = false;
                    }
                }, 3000);
            } catch (err) {
                alert("Failed to send message: " + err.message);
                if (feedbackSubmitBtn) {
                    feedbackSubmitBtn.disabled = false;
                    feedbackSubmitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                }
            }
        });
    }
    
    // Initial scroll check
    setTimeout(checkScroll, 100);
    
    // Scroll event listener with throttling for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
});

// Global CTA Toggle with improved animations
let ringTimeout;
const ctaMain = document.getElementById('cta-main');
const ctaOptions = document.getElementById('cta-options');

function toggleCTAMenu() {
    if (ctaOptions) {
        if (ctaOptions.style.display === 'flex') {
            ctaOptions.classList.add('hide');
            setTimeout(() => {
                ctaOptions.style.display = 'none';
                ctaOptions.classList.remove('hide');
            }, 300);
            if (ctaMain && !ctaMain.classList.contains('ringing')) {
                ctaMain.classList.add('ringing');
                clearTimeout(ringTimeout);
                ringTimeout = setTimeout(() => {
                    if (ctaMain) ctaMain.classList.remove('ringing');
                }, 3000);
            }
        } else {
            ctaOptions.style.display = 'flex';
            ctaOptions.classList.remove('hide');
            if (ctaMain) {
                ctaMain.classList.remove('ringing');
                clearTimeout(ringTimeout);
            }
        }
    }
}

if (ctaMain) {
    ctaMain.addEventListener('click', toggleCTAMenu);
}

function startRingingCycle() {
    if (ctaMain && ctaOptions && ctaOptions.style.display !== 'flex' && !ctaMain.classList.contains('ringing')) {
        ctaMain.classList.add('ringing');
        ringTimeout = setTimeout(() => {
            if (ctaMain) ctaMain.classList.remove('ringing');
            setTimeout(startRingingCycle, 10000);
        }, 3000);
    } else {
        setTimeout(startRingingCycle, 5000);
    }
}

setTimeout(startRingingCycle, 5000);

document.addEventListener('click', function(event) {
    if (ctaOptions && ctaMain && ctaOptions.style.display === 'flex' && 
        !ctaMain.contains(event.target) && 
        !ctaOptions.contains(event.target)) {
        ctaOptions.classList.add('hide');
        setTimeout(() => {
            ctaOptions.style.display = 'none';
            ctaOptions.classList.remove('hide');
        }, 300);
        if (ctaMain && !ctaMain.classList.contains('ringing')) {
            ctaMain.classList.add('ringing');
            clearTimeout(ringTimeout);
            ringTimeout = setTimeout(() => {
                if (ctaMain) ctaMain.classList.remove('ringing');
            }, 3000);
        }
    }
});