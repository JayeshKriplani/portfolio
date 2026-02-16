/* ============================================
   JAYESH KRIPLANI — PORTFOLIO SCRIPTS
   Animations, scroll effects, and interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Typing Animation ----------
    const taglineEl = document.getElementById('hero-tagline');
    const phrases = [
        'Passionate about Distributed Systems & Backend Engineering.',
        'Building scalable backend systems at Flipkart.',
        'Exploring the frontiers of Artificial Intelligence.',
        'Finalist @ Techgium · Semi-Finalist @ IICDC.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function type() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            taglineEl.innerHTML = current.substring(0, charIndex - 1) + '<span class="cursor"></span>';
            charIndex--;
        } else {
            taglineEl.innerHTML = current.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            charIndex++;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 300; // pause before next phrase
        } else {
            typingSpeed = isDeleting ? 30 : 50;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1500);

    // ---------- Navbar Scroll Effect ----------
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ---------- Mobile Menu Toggle ----------
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ---------- Scroll Reveal Animation ----------
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---------- Active Nav Link Highlight ----------
    const sections = document.querySelectorAll('.section');
    const navLinksList = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))}px 0px 0px 0px`
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ---------- Counter Animation ----------
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const isDecimal = target % 1 !== 0;
                const duration = 1500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * target;

                    el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = isDecimal ? target.toFixed(2) : target;
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ---------- Hero Image Fallback (Initials Avatar) ----------
    const heroImage = document.getElementById('hero-image');
    if (heroImage) {
        heroImage.addEventListener('error', () => {
            // Create a canvas-based avatar with initials
            const canvas = document.createElement('canvas');
            canvas.width = 320;
            canvas.height = 320;
            const ctx = canvas.getContext('2d');

            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, 320, 320);
            gradient.addColorStop(0, '#7c5cfc');
            gradient.addColorStop(1, '#00d4aa');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(0, 0, 320, 320, 24);
            ctx.fill();

            // Text
            ctx.fillStyle = '#ffffff';
            ctx.font = '800 120px "Outfit", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('JK', 160, 160);

            heroImage.src = canvas.toDataURL();
        });
    }

});
