(function () {
  var NUM_IMAGES = 5;
  var currentImageIndex = 0;

  var setImageClasses = function() {
    const imageNodes = document
      .getElementById('homeImageContainer')
      .getElementsByTagName('span');

    [].forEach.call(imageNodes, function(imageNode, imageIndex) {
      imageNode.style.opacity = imageIndex === currentImageIndex ? 1 : 0;
    });
  };

  var changeImage = function() {
    currentImageIndex = (currentImageIndex + 1) % NUM_IMAGES;
    setImageClasses();
  };

  setInterval(changeImage, 5 * 1000);

  changeImage();
})();
