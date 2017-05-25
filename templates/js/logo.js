(function setLogoColor() {

  var blue = 'RGB(36,117,120)';
  var purple = 'RGB(129,59,149)';
  var yellow = 'RGB(215,144,40)';
  var green = 'RGB(72,141,65)';

  function getColor(view) {
    switch(view) {
    case 'movies':
      return blue;
    case 'themes':
      return purple;
    case 'directors':
      return yellow;
    case 'genres':
      return green;
    default:
      return;
    }
  }

  var url = window.location.pathname;
  var view = url.split('/')[1];
  var logoParts = document.querySelectorAll('.st0');
  logoParts.forEach(function(part) {
    part.style.fill = getColor(view);
  });

})();
