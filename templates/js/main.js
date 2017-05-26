(function() {

  function includesClass(el, className) {
    if (!el.className) return false;
    return el.className.split(' ').indexOf(className) > -1;
  }

  function toggleDisplay(el) {
    if (includesClass(el, 'dn')) {
      return el.className = el.className.replace(' dn', '');
    }

    el.className = (el.className + ' dn').trim();
  }

  function toggleShowMore(el) {
    if (el.textContent === 'Show more') {
      return el.textContent = 'Show less';
    }
    el.textContent = 'Show more';
  }

  function filterByClassName(arr, className) {
    return arr.filter(function(node) {
      return includesClass(node, className);
    })[0];
  }

  function readMore(event) {
    var parent = event.target.parentNode;
    var childArray = [];
    parent.childNodes.forEach(function(node) {
      childArray.push(node);
    });

    var initialParagraph = filterByClassName(childArray, 'initial-text');
    var hiddenParagraph = filterByClassName(childArray, 'hidden-text');

    toggleDisplay(initialParagraph);
    toggleDisplay(hiddenParagraph);
    toggleShowMore(event.target);
  }

  var links = document.querySelectorAll('.showMore');
  links.forEach(function(link) {
    link.addEventListener('click', readMore);
  });
})();
