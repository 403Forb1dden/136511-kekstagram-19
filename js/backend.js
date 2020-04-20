'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/kekstagram';
  var STATUS_OK = 200;
  var TIMEOUT_IN_MS = 10000;

  var getXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = getXhr(onSuccess, onError);
      xhr.open('GET', URL);
      xhr.send();
    },
    upload: function (data, onSuccess, onError) {
      var xhr = getXhr(onSuccess, onError);
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
