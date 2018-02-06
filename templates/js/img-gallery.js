(function() {
  var imgLinks = document.querySelectorAll('.slider-change');
  var imgHolder = document.querySelector('.image-holder');

  var onSliderClick = function(e) {
    [].forEach.call(imgLinks, function(imgLink) {
      imgLink.classList.remove('bg-light-blue');
      imgLink.classList.add('bg-gray');
    });

    [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ].map(num => {
      imgHolder.classList.remove(`image${num}`);
    });
    imgHolder.classList.toggle(e.target.id);
    e.target.classList.add('bg-light-blue');
  };

  [].forEach.call(imgLinks, function(imgLink) {
    imgLink.addEventListener('click', onSliderClick);
  });
})();
