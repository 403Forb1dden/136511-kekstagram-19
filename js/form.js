'use strict';

(function () {
  var fileUpload = document.querySelector('#upload-file');
  var fileUploadOverlay = document.querySelector('.img-upload__overlay');
  var fileUploadCancel = document.querySelector('#upload-cancel');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var imageUploadEffectsFieldset = document.querySelector('.img-upload__effects');
  var effectDefaultLine = document.querySelector('.img-upload__effect-level');
  var formPreload = document.querySelector('.img-upload__form');
  var inputHashtag = formPreload.querySelector('.text__hashtags');

  var closeUploadPopup = function () {
    fileUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEscapePress);
    fileUpload.value = null;
  };
  var openUploadPopup = function () {
    fileUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscapePress);
  };

  var onUploadEscapePress = function (evt) {
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
})();
