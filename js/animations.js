/* ============================================================
   ANIMATIONS — Scroll-triggered fade/scale animations
   ============================================================ */

window.SalonApp = window.SalonApp || {};

window.SalonApp.initAnimations = function () {
    var animatedElements = document.querySelectorAll('.scroll-animate');

    if (!animatedElements.length) return;

    /* ---- IntersectionObserver for scroll animations ---- */
    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    var animationObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var delay = el.getAttribute('data-delay');

                if (delay) {
                    setTimeout(function () {
                        el.classList.add('visible');
                    }, parseInt(delay, 10));
                } else {
                    el.classList.add('visible');
                }

                // Only trigger once — don't re-animate on scroll back up
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    animatedElements.forEach(function (el) {
        animationObserver.observe(el);
    });

    /* ---- Counter animation for trust metrics ---- */
    var counters = document.querySelectorAll('.counter-animate');

    if (counters.length) {
        var counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(el) {
        var target = el.getAttribute('data-target');
        if (!target) return;

        var isFloat = target.includes('.');
        var targetNum = parseFloat(target);
        var suffix = el.textContent.replace(/[0-9.]/g, ''); // grab '+' or any suffix
        var duration = 1500;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = eased * targetNum;

            if (isFloat) {
                el.textContent = current.toFixed(1) + suffix;
            } else {
                el.textContent = Math.floor(current) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Ensure final value is exact
                if (isFloat) {
                    el.textContent = targetNum.toFixed(1) + suffix;
                } else {
                    el.textContent = Math.floor(targetNum) + suffix;
                }
            }
        }

        requestAnimationFrame(step);
    }
};
