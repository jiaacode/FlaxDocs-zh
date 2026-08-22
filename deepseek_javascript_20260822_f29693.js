plugins: [
  function(hook) {
    hook.doneEach(function() {
      document.querySelectorAll('a[href$=".md"]').forEach(function(el) {
        var href = el.getAttribute('href');
        if (href && !href.startsWith('http')) {
          var newHref = href.replace(/\.md$/, '');
          if (newHref && !newHref.endsWith('/') && !newHref.endsWith('#')) {
            newHref += '/';
          }
          el.setAttribute('href', newHref);
        }
      });
    });
  }
]