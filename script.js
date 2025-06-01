document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a.nav-link, a.scroll-link'); // Include CTA scroll links
    const sections = document.querySelectorAll('main .page-section'); // Get all sections in main
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    // --- Preloader ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.style.overflowY = 'auto';

            // Trigger hero animations after preloader
            const heroAnimations = document.querySelectorAll('#home .animate-on-load');
            heroAnimations.forEach(el => el.classList.add('loaded'));
        }, 500);
    });

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling Navigation & Active Link Highlighting ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Calculate offset for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Intersection Observer for active link highlighting
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: `-${document.querySelector('header').offsetHeight}px 0px 0px 0px`, // Offset for fixed header
        threshold: 0.4 // Trigger when 40% of the section is visible below the header
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === `#${targetId}`) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // --- Mobile Menu Toggle ---
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // --- Portfolio Video Modal (Unchanged from previous version) ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeVideoModal = document.getElementById('closeVideoModal');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video-src');
            if (videoSrc) {
                videoPlayer.src = videoSrc + "?autoplay=1&modestbranding=1&rel=0";
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', () => {
            videoModal.style.display = 'none';
            videoPlayer.src = '';
            document.body.style.overflow = 'auto';
        });
    }
    window.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            videoPlayer.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // --- Gallery Image Lightbox (Unchanged from previous version) ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const captionText = document.getElementById('caption');
    const closeLightbox = document.getElementById('closeLightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.getAttribute('data-full') || this.src;
            captionText.innerHTML = this.alt;
            document.body.style.overflow = 'hidden';
        });
    });
    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- Animate on Scroll (Intersection Observer for general elements) ---
    // This observer is for general content animations, not the nav link highlighting.
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const elementScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Optional: stop observing once visible
            } else {
                // Optional: remove class if you want animation to replay on scroll up/down
                // entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => elementScrollObserver.observe(el));

    // --- Footer: Current Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
