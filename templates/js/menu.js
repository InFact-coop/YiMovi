(function() {
  function toggleDropDownVisibility() {
    var dropDown = document.querySelector('#drop-down');
    var dropDownClasses = dropDown.className.split(' ');
    if (dropDownClasses.indexOf('dn') < 0) {
      dropDownClasses = dropDownClasses.concat([ 'dn', ]);
      dropDown.className = dropDownClasses.join(' ');
    } else {
      dropDown.className = dropDownClasses
        .filter(function(className) {
          return className != 'dn';
        })
        .join(' ');
    }
  }

  function menuPointClick(e) {
    toggleDropDownVisibility();
    var point = e.target;
    [].forEach.call(menuPoints, function(menuPoint) {
      if (menuPoint.textContent === point.textContent) {
        return (point.className = point.className + ' bb');
      }
      menuPoint.className = point.className.replace(/\sbb/g, '');
    });
  }

  var menuPoints = document.querySelectorAll('.menuPoint');

  [].forEach.call(menuPoints, function(point) {
    point.addEventListener('click', menuPointClick);
  });

  var mobileMenu = document.querySelector('#menu-mobile');

  if (mobileMenu) {
    mobileMenu.addEventListener('click', toggleDropDownVisibility);
  }
})();
