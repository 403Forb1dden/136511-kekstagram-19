'use strict';

(function () {
  var SCALE_VALUE_STEP = 25;
  var SCALE_VALUE_MIN = 25;
  var SCALE_VALUE_MAX = 100;
  var DIVIDER_OF_VALUE = 100;
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imageUploadPreview = document.querySelector('.img-upload__preview');

  scaleControlSmaller.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) > SCALE_VALUE_MIN) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) - SCALE_VALUE_STEP + '%';
      imageUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / DIVIDER_OF_VALUE + ')';
    }
  });

  scaleControlBigger.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) < SCALE_VALUE_MAX) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) + SCALE_VALUE_STEP + '%';
      imageUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / DIVIDER_OF_VALUE + ')';
    }
  });
})();
