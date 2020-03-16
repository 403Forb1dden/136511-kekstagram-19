'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileUpload = document.querySelector('#upload-file');
  // var fileChooser = document.querySelector('.upload input[type=file]');
  // var preview = document.querySelector('.setup-user-pic');
  var preview = document.querySelector('.img-upload__preview img');


  fileUpload.addEventListener('change', function () {
    var file = fileUpload.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
