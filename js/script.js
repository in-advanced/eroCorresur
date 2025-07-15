// Smooth scroll indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    document.getElementById('scrollIndicator').style.transform = `scaleX(${scrolled})`;
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Observe all sections when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe all sections for animations
    document.querySelectorAll('.section, .overview-hero, .goals-section, .specifications-section, .use-cases-section, .milestones-section, .guarantee-section').forEach((el) => {
        observer.observe(el);
    });

    // Add click tracking for analytics
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.target.getAttribute('href').replace('#', '');
            console.log(`Navigation to section: ${section}`);
        });
    });

    // Smooth scrolling for navigation links
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

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Add parallax effect to header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.corresur-header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.overview-card, .goal-card, .spec-card, .use-case-card, .guarantee-item, .cta-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add typewriter effect to main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add floating animation to badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.2}s`;
    });

    // Console branding
    console.log('%c🚀 CORRESUR ERP+IA', 'color: #1a3b4d; font-size: 24px; font-weight: bold;');
    console.log('%c💡 Desarrollado por IN-ADVANCED', 'color: #f89920; font-size: 16px;');
    console.log('%c🔧 Tecnologías: HTML5, CSS3, JavaScript ES6+', 'color: #1c7791; font-size: 12px;');
});

// Add performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página cargada en: ${Math.round(loadTime)}ms`);
});

// Add error handling
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.error);
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Reset animations on resize
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.transition = 'none';
        setTimeout(() => {
            section.style.transition = '';
        }, 100);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = document.querySelectorAll('section[id]');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
        });
        
        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else {
                nextIndex = Math.max(currentIndex - 1, 0);
            }
            
            sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add dynamic title updates based on visible section
const updatePageTitle = () => {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
    });
    
    if (currentSection) {
        const sectionTitle = currentSection.querySelector('h2');
        if (sectionTitle) {
            document.title = `${sectionTitle.textContent} - CORRESUR ERP+IA`;
        }
    }
};

window.addEventListener('scroll', updatePageTitle);

// Add copy to clipboard functionality for contact info
const addCopyFunctionality = () => {
    const contactElements = document.querySelectorAll('[data-copy]');
    contactElements.forEach(element => {
        element.addEventListener('click', () => {
            navigator.clipboard.writeText(element.dataset.copy);
            // Show temporary notification
            const notification = document.createElement('div');
            notification.textContent = '¡Copiado!';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #27ae60;
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 10000;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        });
    });
};

// Initialize copy functionality when DOM is ready
document.addEventListener('DOMContentLoaded', addCopyFunctionality);