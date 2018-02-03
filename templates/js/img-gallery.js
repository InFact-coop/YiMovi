(function() {
  var imgLinks = document.querySelectorAll('.slider-change');
  var array = [];
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

  // var preventJump = function(e) {
  //   var hash = window.location.hash;
  //   if (hash) {
  //     setTimeout(function() {
  //       window.scrollTo(0, 0);
  //     }, 1);
  //   }
  // };

  array.forEach.call(imgLinks, function(imgLink) {
    imgLink.addEventListener('click', onSliderClick);
    // imgLink.addEventListener('click', preventJump);
  });
})();
