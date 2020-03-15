'use strict';

(function () {

  var picturesContainer = document.querySelector('.pictures');
  var elementFilters = document.querySelector('.img-filters');

  var renderPictures = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(window.picture.renderPicture(array[i]));
    }
    picturesContainer.appendChild(fragment);
  };

  var showImgFilters = function () {
    elementFilters.classList.remove('img-filters--inactive');
  };

  var defaultSortedPhotos = [];

  var onSuccess = function (data) {
    defaultSortedPhotos = data;
    renderPictures(defaultSortedPhotos);
    showImgFilters();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(onSuccess, onError);

  window.gallery = {
    defaultSortedPhotos: defaultSortedPhotos,
    renderPictures: renderPictures
  };
})();
