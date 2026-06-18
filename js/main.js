/* ============================================================
   MAIN — Entry point, initializes all modules
   ============================================================ */

window.SalonApp = window.SalonApp || {};

document.addEventListener('DOMContentLoaded', function () {

    // Initialize all modules
    if (typeof window.SalonApp.initNavbar === 'function') {
        window.SalonApp.initNavbar();
    }

    if (typeof window.SalonApp.initAnimations === 'function') {
        window.SalonApp.initAnimations();
    }

    if (typeof window.SalonApp.initFAQ === 'function') {
        window.SalonApp.initFAQ();
    }

    if (typeof window.SalonApp.initGallery === 'function') {
        window.SalonApp.initGallery();
    }

    /* ---- WhatsApp click tracking ---- */
    var whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            console.log('[Tracking] WhatsApp click:', this.id || 'unnamed', '→', this.href);
        });
    });

    /* ---- Call click tracking ---- */
    var callLinks = document.querySelectorAll('a[href^="tel:"]');
    callLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            console.log('[Tracking] Call click:', this.id || 'unnamed');
        });
    });

    console.log('✨ The Royal Men\'s Grooming Studio — Website Initialized');
});
