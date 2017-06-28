(function setLogoColor() {

  function getColor(view) {
    switch(view) {
    case 'movies':
      return 'svg-fill--light-blue';
    case 'themes':
      return 'svg-fill--light-purple';
    case 'directors':
      return 'svg-fill--light-green';
    case 'genres':
      return 'svg-fill--light-yellow';
    default:
      return 'st0';
    }
  }

  var url = window.location.pathname;
  var view = url.split('/')[2];
  var logoParts = document.querySelectorAll('.st0');

  [].forEach.call(logoParts, function(part) {

    if (!part.classList) return;

    part.classList.remove('st0');
    part.classList.add(getColor(view));
  });
})();
