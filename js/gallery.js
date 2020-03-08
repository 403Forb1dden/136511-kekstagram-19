'use strict';

(function () {

  var picturesContainer = document.querySelector('.pictures');

  var onSuccess = function (publishedPhotos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < publishedPhotos.length; i++) {
      fragment.appendChild(window.picture.renderPicture(publishedPhotos[i]));
    }
    picturesContainer.appendChild(fragment);
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

  var renderPictures = function () {
    window.load(onSuccess, onError);
  };

  renderPictures();
})();
