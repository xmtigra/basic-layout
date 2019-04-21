console.log('Allo!');

var mainSearch = document.getElementById('mainSearch');
if (mainSearch) {
  mainSearch.addEventListener('keyup', function (event) {
    var value = event.target.value;
    var parent = event.target.closest('form');

    if (value.length) {
      if (!parent.classList.contains('search-active')) {
        parent.classList.add('search-active');
      }

    } else {
      if (parent.classList.contains('search-active')) {
        parent.classList.remove('search-active');
      }
    }
  })
}


var body = document.getElementsByTagName('body');
if (body && body.length) {
  body = body[0];
  body.addEventListener('click', function (event) {

    var isForm = event.target.closest('.search');
    var mainSearch = body.querySelector('.search');
    if (!isForm) {
      if (mainSearch && mainSearch.classList.contains('search-active')) {
        mainSearch.classList.remove('search-active');
      }
    }
  })
}
