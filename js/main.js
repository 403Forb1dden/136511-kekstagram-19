'use strict';

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

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var picturesContainer = document.querySelector('.pictures');

var bigPicture = document.querySelector('.big-picture');

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomElement = function (array) {
  var index = (Math.round(Math.random() * (array.length - 1)));
  return array[index];
};

var generateComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: getRandomElement(messages),
    name: getRandomElement(names)
  };
};

var generateComments = function () {
  var comments = [];
  for (var i = 0; i < getRandomNumber(1, 5); i++) {
    comments.push(generateComment());
  }
  return comments;
};

var getPhotoTemplate = function (count) {
  return {
    url: 'photos/' + (count + 1) + '.jpg',
    description: getRandomElement(descriptions),
    likes: getRandomNumber(15, 200),
    comments: generateComments()
  };
};

var publishedPhotos = [];

var getPublishedPhotos = function () {
  for (var i = 0; i < PHOTO_QUANTITY; i++) {
    publishedPhotos.push(getPhotoTemplate(i));
  }
  return publishedPhotos;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < publishedPhotos.length; i++) {
    fragment.appendChild(renderPicture(publishedPhotos[i]));
  }
  picturesContainer.appendChild(fragment);
};

var renderBigPicture = function (picture) {
  var commentsList = bigPicture.querySelector('.social__comments');

  var renderComment = function (comment) {
    return ('<li class="social__comment"> <img class="social__picture" src="' + comment.avatar + '" alt="' + comment.name + '" width="35" height="35"> <p class="social__text">' + comment.message + '</p> </li>');
  };

  var renderComments = function () {
    for (var i = 0; i < picture.comments.length; i++) {
      commentsList.insertAdjacentHTML('beforeend', renderComment(picture.comments[i]));
    }
  };
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  commentsList.innerHTML = '';
  renderComments();
};

getPublishedPhotos();
var firstPicture = publishedPhotos[0];
renderPictures();
bigPicture.classList.remove('hidden');
renderBigPicture(firstPicture);

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.body.classList.add('modal-open');
