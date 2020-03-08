'use strict';
(function () {
  var MAX_DISPLAYED_COMMENTS = 5;
  var bigPicture = document.querySelector('.big-picture');
  var pictureCloseButton = document.querySelector('.big-picture__cancel');

  var renderBigPicture = function (picture) {
    var commentsList = bigPicture.querySelector('.social__comments');

    var renderComment = function (comment) {
      return ('<li class="social__comment"> <img class="social__picture" src="' + comment.avatar + '" alt="' + comment.name + '" width="35" height="35"> <p class="social__text">' + comment.message + '</p> </li>');
    };

    var renderComments = function () {
      var maxDisplayedComments = MAX_DISPLAYED_COMMENTS;
      if (picture.comments.length < maxDisplayedComments) {
        maxDisplayedComments = picture.comments.length;
      }
      for (var i = 0; i < maxDisplayedComments; i++) {
        commentsList.insertAdjacentHTML('beforeend', renderComment(picture.comments[i]));
      }
    };
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    commentsList.innerHTML = '';
    renderComments();
  };

  var closePicturePopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPictureEscapePress);
  };

  var openPicturePopup = function (picture) {
    bigPicture.classList.remove('hidden');
    renderBigPicture(picture);

    document.addEventListener('keydown', onPictureEscapePress);
  };

  var onPictureEscapePress = function (evt) {
    if (evt.key === 'Escape' && !evt.target.matches('input[type="text"]')) {
      closePicturePopup();
    }
  };

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  pictureCloseButton.addEventListener('click', function () {
    closePicturePopup();
  });

  window.preview = {
    openPicturePopup: openPicturePopup
  };
})();
