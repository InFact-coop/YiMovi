(function() {

  function toggleDropDown() {
    var dropDown = document.querySelector('#drop-down');
    var dropDownClasses = dropDown.className.split(' ');
    if (dropDownClasses.indexOf('dn') < 0) {
      dropDownClasses = dropDownClasses.concat([ 'dn', ]);
      dropDown.className = dropDownClasses.join(' ');
    } else {
      dropDown.className = dropDownClasses.filter(function(className) {
        return className != 'dn';
      }).join(' ');
    }
  }

  function menuPointClick(e) {
    toggleDropDown();
    var point = e.target;
    menuPoints.forEach(function(menuPoint) {
      if (menuPoint.textContent === point.textContent) {
        return point.className = point.className + ' bb';
      }
      menuPoint.className = point.className.replace(/\sbb/g, '');
    });
  }

  var menuPoints = document.querySelectorAll('.menuPoint');

  menuPoints.forEach(function(point) {
    point.addEventListener('click', menuPointClick);
  });

  var mobileMenu = document.querySelector('#menu-mobile');

  if (mobileMenu) {
    mobileMenu.addEventListener('click', toggleDropDown);
  }
})();
