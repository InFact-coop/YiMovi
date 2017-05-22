(function() {

  function toggleDisplay(el) {
    if (el.className.split(' ').indexOf('dn') > -1) {
      return el.className = el.className.replace(' dn', '');
    }

    el.className = el.className + ' dn';
  }

  function toggleShowMore(el) {
    if (el.textContent === 'Show more') {
      return el.textContent = 'Show less';
    }
    el.textContent = 'Show more';
  }

  function readMore(event) {
    var parent = event.target.parentNode;
    var initialParagraph = parent.childNodes[1];
    var hiddenParagraph = parent.childNodes[3];
    toggleDisplay(initialParagraph);
    toggleDisplay(hiddenParagraph);
    toggleShowMore(event.target);
  }

  var links = document.querySelectorAll('.showMore');
  links.forEach(function(link) {
    link.addEventListener('click', readMore);
  });

})();
