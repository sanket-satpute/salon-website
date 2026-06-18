/* ============================================================
   GALLERY — Lightbox with keyboard & swipe navigation
   ============================================================ */

window.SalonApp = window.SalonApp || {};

window.SalonApp.initGallery = function () {
    var galleryItems = document.querySelectorAll('.gallery-item, .transform-before, .transform-after');
    var allImages = [];
    var currentIndex = 0;
    var lightbox = null;
    var lightboxImg = null;
    var touchStartX = 0;
    var touchEndX = 0;

    if (!galleryItems.length) return;

    /* ---- Collect all gallery images ---- */
    galleryItems.forEach(function (item) {
        var img = item.querySelector('img');
        if (img) {
            allImages.push(img.src);
        }
    });

    /* ---- Create lightbox DOM ---- */
    function createLightbox() {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML =
            '<button class="lightbox-close" aria-label="Close lightbox">&times;</button>' +
            '<button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#8249;</button>' +
            '<img class="lightbox-img" src="" alt="Gallery image">' +
            '<button class="lightbox-nav lightbox-next" aria-label="Next image">&#8250;</button>';

        document.body.appendChild(lightbox);

        lightboxImg = lightbox.querySelector('.lightbox-img');
        var closeBtn = lightbox.querySelector('.lightbox-close');
        var prevBtn = lightbox.querySelector('.lightbox-prev');
        var nextBtn = lightbox.querySelector('.lightbox-next');

        // Close on button click
        closeBtn.addEventListener('click', closeLightbox);

        // Close on backdrop click
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Navigation
        prevBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            showPrev();
        });

        nextBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            showNext();
        });

        // Touch/swipe support
        lightbox.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    /* ---- Open lightbox ---- */
    function openLightbox(index) {
        if (!lightbox) createLightbox();

        currentIndex = index;
        lightboxImg.src = allImages[currentIndex];
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    /* ---- Close lightbox ---- */
    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    /* ---- Navigate ---- */
    function showPrev() {
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        lightboxImg.src = allImages[currentIndex];
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % allImages.length;
        lightboxImg.src = allImages[currentIndex];
    }

    /* ---- Swipe handler ---- */
    function handleSwipe() {
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                showNext(); // Swipe left → next
            } else {
                showPrev(); // Swipe right → prev
            }
        }
    }

    /* ---- Click handlers on gallery items ---- */
    galleryItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
            openLightbox(index);
        });
    });

    /* ---- Keyboard navigation ---- */
    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });
};
