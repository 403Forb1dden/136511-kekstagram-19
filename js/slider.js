'use strict';

(function () {
  var INDEX_FOR_GRAYSCALE_FILTER = 1;
  var INDEX_FOR_SEPIA_FILTER = 1;
  var INDEX_FOR_BLUR_FILTER = 3;
  var INDEX_FOR_BRIGHTNESS_FILTER = 2;
  var SECOND_INDEX_FOR_BRIGHTNESS_FILTER = 1;
  var DIVIDER_OF_VALUE = 100;
  var MULTIPLIER_OF_VALUE = 100;
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var effectDefaultLine = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectDefaultLineChild = effectDefaultLine.querySelector('.effect-level__line');
  var effectLevelInput = effectDefaultLine.querySelector('.effect-level__value');
  var effectLevelDepth = effectDefaultLine.querySelector('.effect-level__depth');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var minPinPosition = effectDefaultLineChild.clientLeft;
    var maxPinPosition = effectDefaultLineChild.clientWidth - effectDefaultLineChild.clientLeft;

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };
      var newPosition = effectLevelPin.offsetLeft - shift.x;
      if (newPosition < minPinPosition) {
        effectLevelPin.style.left = (minPinPosition) + 'px';
      } else if (newPosition > maxPinPosition) {
        effectLevelPin.style.left = (maxPinPosition) + 'px';
      } else {
        effectLevelPin.style.left = (newPosition) + 'px';
      }

      var controlPosition = moveEvt.target.offsetLeft;
      var filterLineWidth = moveEvt.target.offsetParent.offsetWidth;
      var intensivityPercent = (controlPosition / (filterLineWidth / DIVIDER_OF_VALUE)) / DIVIDER_OF_VALUE;
      effectLevelInput.value = Math.round(intensivityPercent * MULTIPLIER_OF_VALUE);
      effectLevelDepth.style.width = intensivityPercent * MULTIPLIER_OF_VALUE + '%';
      switch (imageUploadPreview.classList[1]) {
        case 'effects__preview--chrome':
          imageUploadPreview.style = 'filter: grayscale(' + (INDEX_FOR_GRAYSCALE_FILTER * intensivityPercent) + ')';
          break;
        case 'effects__preview--sepia':
          imageUploadPreview.style = 'filter: sepia(' + (INDEX_FOR_SEPIA_FILTER * intensivityPercent) + ')';
          break;
        case 'effects__preview--marvin':
          imageUploadPreview.style = 'filter: invert(' + (MULTIPLIER_OF_VALUE * intensivityPercent) + '%)';
          break;
        case 'effects__preview--phobos':
          imageUploadPreview.style = 'filter: blur(' + (INDEX_FOR_BLUR_FILTER * intensivityPercent) + 'px)';
          break;
        case 'effects__preview--heat':
          imageUploadPreview.style = 'filter: brightness(' + (INDEX_FOR_BRIGHTNESS_FILTER * intensivityPercent) + SECOND_INDEX_FOR_BRIGHTNESS_FILTER + ')';
          break;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });
})();
