'use strict';

(function () {
  var PHOTO_QUANTITY = 25;

  var messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var names = [
    'Саша',
    'Вася',
    'Ибрагим',
    'Олег',
    'Эдуард',
    'Максимилиан',
    'Валера',
    'Алеша'
  ];

  var descriptions = [
    'Норм',
    'Не оч',
    'Отлично',
    'В Майами',
    'На Москве',
    'На России',
    'На Омске',
  ];

  var publishedPhotos = [];

  var picturesContainer = document.querySelector('.pictures');

  var generateComment = function () {
    return {
      avatar: 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg',
      message: window.utils.getRandomElement(messages),
      name: window.utils.getRandomElement(names)
    };
  };

  var generateComments = function () {
    var comments = [];
    for (var i = 0; i < window.utils.getRandomNumber(1, 5); i++) {
      comments.push(generateComment());
    }
    return comments;
  };

  var getPhotoTemplate = function (count) {
    return {
      url: 'photos/' + (count + 1) + '.jpg',
      description: window.utils.getRandomElement(descriptions),
      likes: window.utils.getRandomNumber(15, 200),
      comments: generateComments()
    };
  };

  var getPublishedPhotos = function () {
    for (var i = 0; i < PHOTO_QUANTITY; i++) {
      publishedPhotos.push(getPhotoTemplate(i));
    }
    return publishedPhotos;
  };

  var renderPictures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < publishedPhotos.length; i++) {
      fragment.appendChild(window.picture.renderPicture(publishedPhotos[i]));
    }
    picturesContainer.appendChild(fragment);
  };

  getPublishedPhotos();
  renderPictures();
})();
