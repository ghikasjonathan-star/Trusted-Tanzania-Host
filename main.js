document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header scroll state
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Gallery — auto crossfade spotlight
  var spotlight = document.getElementById('spotlight');
  if (spotlight) {
    var images = Array.from(spotlight.querySelectorAll('.spotlight-img'));
    var dots = Array.from(spotlight.querySelectorAll('.spotlight-dots button'));
    var tagEl = document.getElementById('spotlightTag');
    var titleEl = document.getElementById('spotlightTitle');
    var current = 0;
    var timer = null;

    function showSlide(i) {
      images[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (i + images.length) % images.length;
      images[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      if (tagEl) tagEl.textContent = images[current].dataset.tag;
      if (titleEl) titleEl.textContent = images[current].dataset.title;
    }

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(function () { showSlide(current + 1); }, 4200);
    }
    function stopAutoplay() {
      if (timer) clearInterval(timer);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showSlide(i);
        startAutoplay();
      });
    });

    spotlight.addEventListener('mouseenter', stopAutoplay);
    spotlight.addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  }

  // Intake form -> Formspree AJAX submission with Green Tick
  var form = document.getElementById('intakeForm');
  var status = document.getElementById('formStatus');
  
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Change button text while sending
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.textContent : "Submit";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      var data = new FormData(form);
      
      fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          // Success! Clear the form fields
          form.reset();
          if (status) {
            status.innerHTML = '<span style="color: #2d5a27; font-weight: bold; font-size: 1.2rem;">✓ Briefing Submitted Successfully</span>';
            status.classList.add('show');
          }
          if (submitBtn) {
            submitBtn.textContent = "Submitted";
          }
        } else {
          response.json().then(data => {
            if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
              status.textContent = data Bart.errors.map(error => error.message).join(", ");
            } else {
              status.textContent = "Oops! There was a problem submitting your form.";
            }
          });
        }
      }).catch(error => {
        if (status) {
          status.textContent = "Oops! There was a problem submitting your form.";
        }
      });
    });
  }
