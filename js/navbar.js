/* ============================================================
   NAVBAR — Scroll behavior, mobile menu, active links
   ============================================================ */

window.SalonApp = window.SalonApp || {};

window.SalonApp.initNavbar = function () {
    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    var navLinks = document.querySelectorAll('.nav-link');
    var mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    var sections = document.querySelectorAll('section[id]');

    if (!navbar) return;

    /* ---- Scroll: add .scrolled class ---- */
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    /* ---- Mobile menu toggle ---- */
    function openMobileMenu() {
        document.body.classList.add('mobile-menu-open');
        document.body.classList.add('no-scroll');
    }

    function closeMobileMenu() {
        document.body.classList.remove('mobile-menu-open');
        document.body.classList.remove('no-scroll');
    }

    function toggleMobileMenu() {
        if (document.body.classList.contains('mobile-menu-open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    /* ---- Close mobile menu when a link is clicked ---- */
    mobileNavLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMobileMenu();
        });
    });

    /* ---- Close on Escape key ---- */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
            closeMobileMenu();
        }
    });

    /* ---- Smooth scroll for nav links ---- */
    function smoothScrollTo(targetId) {
        var target = document.querySelector(targetId);
        if (!target) return;

        var navbarHeight = navbar.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });

    mobileNavLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            // Small delay to let menu close animation play
            setTimeout(function () {
                smoothScrollTo(targetId);
            }, 100);
        });
    });

    /* ---- Active link highlighting via IntersectionObserver ---- */
    var observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    var activeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');

                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(function (section) {
        activeObserver.observe(section);
    });
};
