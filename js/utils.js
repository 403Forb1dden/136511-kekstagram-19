'use strict';
(function () {
  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomElement = function (array) {
    var index = (Math.round(Math.random() * (array.length - 1)));
    return array[index];
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement
  };
})();
