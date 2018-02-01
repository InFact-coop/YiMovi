(function() {
  var burger = document.querySelector('#burger');
  var nav = document.querySelector('#main-mobile-nav');
  burger.addEventListener('click', function() {
    burger.classList.toggle('change');
    nav.classList.toggle('dn');
  });
})();
