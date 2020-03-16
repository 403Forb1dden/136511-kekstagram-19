'use strict';

(function () {
  var fileUpload = document.querySelector('#upload-file');
  var fileUploadOverlay = document.querySelector('.img-upload__overlay');
  var fileUploadCancel = document.querySelector('#upload-cancel');
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var imageUploadEffectsFieldset = document.querySelector('.img-upload__effects');
  var formPreload = document.querySelector('.img-upload__form');
  var inputHashtag = formPreload.querySelector('.text__hashtags');
  var effectDefaultLine = document.querySelector('.img-upload__effect-level');
  var inputTextArea = document.querySelector('.text__description');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var resetForm = function () {
    var defaultRadio = document.querySelector('.effects__radio');

    inputHashtag.value = null;
    inputTextArea.value = null;
    imageUploadPreview.style = 'filter: none';
    imageUploadPreview.className = 'img-upload__preview';
    defaultRadio.checked = true;
    effectDefaultLine.classList.add('hidden');
  };

  var closeUploadPopup = function () {
    fileUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEscapePress);
    fileUpload.value = null;
  };
  var openUploadPopup = function () {
    fileUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscapePress);
    removeInputErrorEffect(inputHashtag);
  };

  var onUploadEscapePress = function (evt) {
    if (evt.key === 'Escape' && !evt.target.matches('input[type="text"]') && !evt.target.matches('textarea')) {
      closeUploadPopup();
    }
  };

  fileUpload.addEventListener('change', function () {
    openUploadPopup();
    resetForm();
  });

  fileUploadCancel.addEventListener('click', function () {
    closeUploadPopup();
  });

  effectDefaultLine.classList.add('hidden');

  imageUploadEffectsFieldset.addEventListener('change', function (evt) {
    imageUploadPreview.className = 'img-upload__preview';
    imageUploadPreview.style = 'filter: none';
    effectDefaultLine.classList.remove('hidden');
    imageUploadPreview.style.transform = 'scale(1)';
    scaleControlValue.value = 100 + '%';
    var effectLevelPin = document.querySelector('.effect-level__pin');
    var effectDefaultLineChild = effectDefaultLine.querySelector('.effect-level__line');
    var effectLevelDepth = effectDefaultLine.querySelector('.effect-level__depth');
    var pinInitialPosition = effectDefaultLineChild.clientWidth - effectDefaultLineChild.clientLeft;
    effectLevelPin.style.left = pinInitialPosition + 'px';
    effectLevelDepth.style.width = '100%';

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

  var showSuccessMessage = function () {
    var mainElement = document.querySelector('main');
    var successMessageTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successMessageElement = successMessageTemplate.cloneNode(true);

    mainElement.insertAdjacentElement('afterbegin', successMessageElement);

    window.addEventListener('click', function (evt) {
      if (!(evt.target === document.querySelector('.success__inner')) && !(evt.target === document.querySelector('.success__title'))) {
        successMessageElement.remove();
      }
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        successMessageElement.remove();
      }
    });
  };

  var showErrorMessage = function () {
    var mainElement = document.querySelector('main');
    var errorMessageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessageElement = errorMessageTemplate.cloneNode(true);

    mainElement.insertAdjacentElement('afterbegin', errorMessageElement);

    window.addEventListener('click', function (evt) {
      if (!(evt.target === document.querySelector('.error__inner')) && !(evt.target === document.querySelector('.error__title'))) {
        errorMessageElement.remove();
      }
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        errorMessageElement.remove();
      }
    });
  };

  formPreload.addEventListener('submit', function (evt) {
    window.upload(new FormData(formPreload), function () {
      fileUploadOverlay.classList.add('hidden');
      showSuccessMessage();
    }, function () {
      fileUploadOverlay.classList.add('hidden');
      showErrorMessage();
    });
    evt.preventDefault();
  });

  var addInputErrorEffect = function (field) {
    // debugger;
    field.style.border = '3px solid red';
  };

  var removeInputErrorEffect = function (field) {
    field.style.border = 'none';
  };

  inputHashtag.addEventListener('invalid', function () {
    addInputErrorEffect(inputHashtag);
  });

  inputHashtag.addEventListener('change', function () {
    removeInputErrorEffect(inputHashtag);
  });
})();
