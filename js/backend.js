// 'use strict';
//
// (function () {
//
//   window.load = function (onSuccess, onError) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';
//
//     xhr.addEventListener('load', function () {
//       if (xhr.status === StatusCode.OK) {
//         onSuccess(xhr.response);
//       } else {
//         onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
//       }
//     });
//     xhr.addEventListener('error', function () {
//       onError('Произошла ошибка соединения');
//     });
//     xhr.addEventListener('timeout', function () {
//       onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
//     });
//
//     xhr.timeout = TIMEOUT_IN_MS; // 10s
//
//     xhr.open('GET', URL);
//     xhr.send();
//   };
//
//   window.upload = function (data, onSuccess, onError) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';
//     xhr.addEventListener('load', function () {
//       if (xhr.status === StatusCode.OK) {
//         onSuccess(xhr.response);
//       } else {
//         onError();
//       }
//     });
//     xhr.addEventListener('error', function () {
//       onError();
//     });
//     xhr.addEventListener('timeout', function () {
//       onError();
//     });
//
//     xhr.timeout = TIMEOUT_IN_MS;
//
//     xhr.open('POST', URL_UPLOAD);
//     xhr.send(data);
//   };
// })();


'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
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
