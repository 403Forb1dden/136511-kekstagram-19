'use strict';

(function () {
  var RANDOM_PHOTOS_COUNT = 10;
  var filterDefaultButton = document.querySelector('#filter-default');
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
    return arr.slice(0, RANDOM_PHOTOS_COUNT);
  };

  var sortPhotosByDiscussed = function (array) {
    array.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  filterDefaultButton.addEventListener('click', window.debounce(function () {
    window.gallery.renderPictures(window.defaultSortedPhotos);
    filterDefaultButton.classList.add('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
  }));

  filterRandomButton.addEventListener('click', window.debounce(function () {
    var randomSortedPhotos = window.defaultSortedPhotos.slice(0, RANDOM_PHOTOS_COUNT);
    sortPhotosByRandom(randomSortedPhotos);
    window.gallery.renderPictures(randomSortedPhotos);
    filterRandomButton.classList.add('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
  }));

  filterDiscussedButton.addEventListener('click', window.debounce(function () {
    var discussedSortedPhotos = window.defaultSortedPhotos.slice();
    sortPhotosByDiscussed(discussedSortedPhotos);
    window.gallery.renderPictures(discussedSortedPhotos);
    filterDiscussedButton.classList.add('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
  }));
})();
