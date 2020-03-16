'use strict';
(function () {
  var ON_START_DISPLAYED_COMMENTS = 5;
  var SHOWING_COMMENTS_COUNT_BY_BUTTON = 5;
  var bigPicture = document.querySelector('.big-picture');
  var pictureCloseButton = document.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoaderButton = document.querySelector('.comments-loader');

  var showLoadMoreButton = function () {
    commentsLoaderButton.classList.remove('hidden');
  };

  var hideLoadMoreButton = function () {
    commentsLoaderButton.classList.add('hidden');
  };

  var renderComment = function (comment) {
    return ('<li class="social__comment"> <img class="social__picture" src="' + comment.avatar + '" alt="' + comment.name + '" width="35" height="35"> <p class="social__text">' + comment.message + '</p> </li>');
  };

  var renderBigPicture = function (picture) {
    var commentsList = bigPicture.querySelector('.social__comments');
    var showingCommentsCount;

    var renderComments = function (array) {
      for (var i = 0; i < array.length; i++) {
        commentsList.insertAdjacentHTML('beforeend', renderComment(array[i]));
      }
      if (showingCommentsCount > picture.comments.length) {
        socialCommentCount.textContent = picture.comments.length + ' из ' + picture.comments.length + ' комментариев';
      } else {
        socialCommentCount.textContent = showingCommentsCount + ' из ' + picture.comments.length + ' комментариев';
      }
    };

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    commentsList.innerHTML = '';
    showingCommentsCount = ON_START_DISPLAYED_COMMENTS;
    renderComments(picture.comments.slice(0, showingCommentsCount));

    if (showingCommentsCount < picture.comments.length) {
      showLoadMoreButton();
    }

    var onShowMoreButtonClick = function () {
      var prevCommentsCount = showingCommentsCount;
      showingCommentsCount = showingCommentsCount + SHOWING_COMMENTS_COUNT_BY_BUTTON;
      if (picture.comments.length < showingCommentsCount) {
        showingCommentsCount = picture.comments.length;
      }
      renderComments(picture.comments.slice(prevCommentsCount, showingCommentsCount));

      if (showingCommentsCount >= picture.comments.length) {
        hideLoadMoreButton();
        commentsLoaderButton.removeEventListener('click', onShowMoreButtonClick);
      }
    };

    commentsLoaderButton.addEventListener('click', onShowMoreButtonClick);
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
      window.showingCommentsCount = 0;
    }
  };

  document.body.classList.add('modal-open');

  pictureCloseButton.addEventListener('click', function () {
    closePicturePopup();
  });

  window.preview = {
    openPicturePopup: openPicturePopup
  };
})();
