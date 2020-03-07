'use strict';

(function () {

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
      var intensivityPercent = (controlPosition / (filterLineWidth / 100)) / 100;
      effectLevelInput.value = intensivityPercent * 100;
      effectLevelDepth.style.width = intensivityPercent * 100 + '%';
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
