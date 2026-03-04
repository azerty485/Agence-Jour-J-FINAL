// ==========================================
// NAVIGATION MOBILE TOGGLE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.padding = '0.5rem 2rem';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '1rem 2rem';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Target elements to animate
    const animatedElements = document.querySelectorAll(
        '.column, .photography-text, .quote-block, ' +
        '.testimonial-card, .footer-column, .reveal, .reveal-slow, ' +
        '.contact-form-wrapper, .contact-info-wrapper, .section-content'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================

    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Form submitted:', data);

            // Show success message
            alert('Merci pour votre message ! Nous vous répondrons dans les 48h ouvrées.');

            // Reset form
            contactForm.reset();
        });

        // Real-time form validation
        const requiredFields = contactForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#27ae60';
                }
            });

            field.addEventListener('input', () => {
                if (field.value.trim()) {
                    field.style.borderColor = '#ddd';
                }
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // TESTIMONIALS ANIMATION ON HOVER
    // ==========================================

    const testimonialCards = document.querySelectorAll('.testimonial-card');

    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ==========================================
    // CTA BUTTONS RIPPLE EFFECT
    // ==========================================

    const ctaButtons = document.querySelectorAll('.cta-button-small, .submit-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ==========================================
    // PARALLAX EFFECT - FLUIDE & CENTRÉ
    // ==========================================
    const heroSection = document.querySelector('.header');

    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPosition = `50% calc(50% + ${scrolled * 0.4}px)`;
        });
    }

    // ==========================================
    // CONSOLE LOG
    // ==========================================

    console.log('✅ L\'Agence Jour J - Site chargé avec succès!');
    console.log('📧 Contact: lagencejourj@gmail.com');
});

// ==========================================
// RIPPLE EFFECT STYLES (injected dynamically)
// ==========================================

const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .cta-button-small, .submit-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);


// ==========================================
// EMAILJS FORM HANDLING
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('[data-testid="contact-form"]');
    const submitButton = document.querySelector('[data-testid="submit-button"]');

    if (contactForm && typeof emailjs !== 'undefined') {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

            emailjs.sendForm('service_pf1u9hc', 'template_qpwl58j', this)
                .then(function() {
                    alert('Merci ! Votre message a été envoyé avec succès.');
                    contactForm.reset();
                }, function(error) {
                    alert("Oups... Une erreur est survenue lors de l'envoi.");
                    console.error('Erreur EmailJS détaillée:', error);
                })
                .finally(function() {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                });
        });
    }
});
