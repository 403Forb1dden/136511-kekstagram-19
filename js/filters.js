'use strict';

(function () {
  // var filterDefaultButton = document.querySelector('#filter-default');
  var filterRandomButton = document.querySelector('#filter-random');
  var filterDiscussedButton = document.querySelector('#filter-discussed');

  var sortPhotosByRandom = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr.slice(0, 10);
  };

  var sortPhotosByDiscussed = function (array) {
    array.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  filterRandomButton.addEventListener('click', function () {
    sortPhotosByRandom(window.gallery.defaultSortedPhotos);
  });

  filterDiscussedButton.addEventListener('click', function () {
    var discussedSortedPhotos = window.gallery.defaultSortedPhotos.slice();
    sortPhotosByDiscussed(discussedSortedPhotos);
    window.gallery.renderPictures(discussedSortedPhotos);
  });
})();
