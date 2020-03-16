'use strict';

(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imageUploadPreview = document.querySelector('.img-upload__preview');
  var SCALE_VALUE_STEP = 25;

  scaleControlSmaller.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) > 25) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) - SCALE_VALUE_STEP + '%';
      imageUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
    }
  });

  scaleControlBigger.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) < 100) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) + SCALE_VALUE_STEP + '%';
      imageUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
    }
  });
})();
