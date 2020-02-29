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
// bigPicture.classList.remove('hidden');
renderBigPicture(firstPicture);

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.body.classList.add('modal-open');


var fileUpload = document.querySelector('#upload-file');
var fileUploadOverlay = document.querySelector('.img-upload__overlay');
var fileUploadCancel = document.querySelector('#upload-cancel');
var effectLevelPin = document.querySelector('.effect-level__pin');
var imageUploadPreview = document.querySelector('.img-upload__preview');
var imageUploadEffectsFieldset = document.querySelector('.img-upload__effects');
var effectDefaultLine = document.querySelector('.img-upload__effect-level');

var closeUploadPopup = function () {
  fileUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscapePress);
  fileUpload.value = null;
};
var openUploadPopup = function () {
  fileUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscapePress);
};

var onEscapePress = function (evt) {
  if (evt.key === 'Escape' && !evt.target.matches('input[type="text"]') && !evt.target.matches('textarea')) {
    closeUploadPopup();
  }
};

fileUpload.addEventListener('change', function () {
  openUploadPopup();
});

fileUploadCancel.addEventListener('click', function () {
  closeUploadPopup();
});

effectLevelPin.addEventListener('mouseup', function (evt) {
  var controlPosition = evt.target.offsetLeft;
  var filterLineWidth = evt.target.offsetParent.offsetWidth;
  var intensivityPercent = (controlPosition / (filterLineWidth / 100)) / 100;
  switch (imageUploadPreview.classList[1]) {
    case 'effects__preview--chrome':
      imageUploadPreview.style = 'filter: grayscale(' + (1 * intensivityPercent) + ')';
      break;
    case 'effects__preview--sepia':
      imageUploadPreview.style = 'filter: sepia(' + (1 * intensivityPercent) + ')';
      break;
    case 'effects__preview--marvin':
      imageUploadPreview.style = 'filter: invert(' + (100 * intensivityPercent) + '%)';
      break;
    case 'effects__preview--phobos':
      imageUploadPreview.style = 'filter: blur(' + (3 * intensivityPercent) + 'px)';
      break;
    case 'effects__preview--heat':
      imageUploadPreview.style = 'filter: brightness(' + (2 * intensivityPercent) + 1 + ')';
      break;
  }
});

effectDefaultLine.classList.add('hidden');

imageUploadEffectsFieldset.addEventListener('change', function (evt) {
  imageUploadPreview.className = 'img-upload__preview';
  imageUploadPreview.style = 'filter: none';
  effectDefaultLine.classList.remove('hidden');
  switch (evt.target.id) {
    case 'effect-chrome':
      imageUploadPreview.classList.add('effects__preview--chrome');
      imageUploadPreview.style = 'filter: grayscale(1)';
      break;
    case 'effect-sepia':
      imageUploadPreview.classList.add('effects__preview--sepia');
      imageUploadPreview.style = 'filter: sepia(1)';
      break;
    case 'effect-marvin':
      imageUploadPreview.classList.add('effects__preview--marvin');
      imageUploadPreview.style = 'filter: invert(100%)';
      break;
    case 'effect-phobos':
      imageUploadPreview.classList.add('effects__preview--phobos');
      imageUploadPreview.style = 'filter: blur(3px)';
      break;
    case 'effect-heat':
      imageUploadPreview.classList.add('effects__preview--heat');
      imageUploadPreview.style = 'filter: brightness(3)';
      break;
    default:
      effectDefaultLine.classList.add('hidden');
      break;
  }
});


var formPreload = document.querySelector('.img-upload__form');
var inputHashtag = formPreload.querySelector('.text__hashtags');
inputHashtag.addEventListener('input', function () {
  var inputHashtagString = inputHashtag.value.trim();
  var inputHashtagArray = inputHashtagString.split(' ');
  if (inputHashtagArray.length < 1) {
    return;
  }

  // Функция для проверки одинаковых хештегов в массиве
  var checkSimilarElement = function (array, item) {
    var index = inputHashtagArray.indexOf(item);
    var restOfArray = array.slice(index + 1, array.length);
    if (restOfArray.includes(item)) {
      return true;
    } else {
      return false;
    }
  };

  var checkInputHashtag = function () {
    inputHashtagArray.forEach(function (item) {
      if (checkSimilarElement(inputHashtagArray, item)) {
        inputHashtag.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      } else if (item.length < 2 && item.length > 0) {
        inputHashtag.setCustomValidity('Хештег должен состоять минимум из 2-х символов');
      } else if (item.length > 20) {
        inputHashtag.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (item[0] !== '#' && item.length > 0) {
        inputHashtag.setCustomValidity('хэш-тег должен начинаться с символа # (решётка)');
      } else if (item.substr(1, item.length).includes('#')) {
        inputHashtag.setCustomValidity('символ "#" (решётка) может быть только первым по счету в хештеге');
      } else {
        inputHashtag.setCustomValidity('');
      }
    });
  };

  if (inputHashtagArray.length > 5) {
    inputHashtag.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  } else {
    checkInputHashtag();
  }
});
