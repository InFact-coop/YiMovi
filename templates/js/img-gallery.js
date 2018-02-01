(function() {
  var imgLinks = document.querySelectorAll('.slider-change');

  var onSliderClick = function(e) {
    [].forEach.call(imgLinks, function(imgLink) {
      imgLink.classList.remove('bg-light-blue');
      imgLink.classList.remove('scale');
      imgLink.classList.add('bg-gray');
    });
    e.target.classList.add('bg-light-blue');
    e.target.classList.add('grow');
    e.target.classList.add('scale');
  };

  [].forEach.call(imgLinks, function(imgLink) {
    imgLink.addEventListener('click', onSliderClick);
  });
})();
