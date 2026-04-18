// Mobile nav toggle
(function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Add shadow to header on scroll
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
})();

// Web3Forms contact form
(function () {
  var form = document.getElementById('contact-form');
  var result = document.getElementById('form-result');
  if (!form || !result) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        result.style.display = 'block';
        if (data.success) {
          result.style.color = '#16a34a';
          result.textContent = 'Sporočilo je bilo poslano. Hvala!';
          form.reset();
        } else {
          result.style.color = '#dc2626';
          result.textContent = 'Napaka pri pošiljanju. Prosimo, poskusite znova.';
          btn.disabled = false;
        }
      })
      .catch(function () {
        result.style.display = 'block';
        result.style.color = '#dc2626';
        result.textContent = 'Napaka pri pošiljanju. Prosimo, poskusite znova.';
        btn.disabled = false;
      });
  });
})();
