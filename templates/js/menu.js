var menuPoints = document.querySelectorAll('.menuPoint');

function selectPoint(e) {
  var point = e.target;
  menuPoints.forEach(function(menuPoint) {
    if (menuPoint.textContent === point.textContent) {
      return point.className = point.className + ' bb';
    }
    menuPoint.className = point.className.replace(/\sbb/g, '');
  });
}

menuPoints.forEach(function(point) {
  point.addEventListener('click', selectPoint);
});
