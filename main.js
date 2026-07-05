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

  // Intake form -> mailto handoff
  var form = document.getElementById('intakeForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = {
        fullName: form.fullName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        clientType: form.clientType.value,
        interest: form.interest.value,
        entity: form.entity.value,
        budget: form.budget.value,
        timeline: form.timeline.value,
        message: form.message.value.trim()
      };

      var subject = 'New Enquiry — Trusted Tanzania Host (' + data.interest + ')';
      var bodyLines = [
        'Name: ' + data.fullName,
        'Email: ' + data.email,
        'Phone/WhatsApp: ' + data.phone,
        'Client Type: ' + data.clientType,
        'Area of Interest: ' + data.interest,
        'Local Entity Registered: ' + data.entity,
        'Budget Range: ' + data.budget,
        'Timeline: ' + data.timeline,
        '',
        'Mission Briefing:',
        data.message
      ];
      var body = bodyLines.join('\n');

      var mailto = 'mailto:info@ghikasadventures.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailto;

      if (status) {
        status.textContent = 'Your email app should now be open with this briefing pre-filled. If nothing opened, message us directly on WhatsApp instead.';
        status.classList.add('show');
      }
    });
  }
});
