'use strict';
(function () {
  var ON_START_DISPLAYED_COMMENTS = 5;
  var SHOWING_COMMENTS_COUNT_BY_BUTTON = 5;
  var bigPicture = document.querySelector('.big-picture');
  var pictureCloseButton = document.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');

  var renderBigPicture = function (picture) {
    var commentsList = bigPicture.querySelector('.social__comments');
    var commentsLoaderButton = document.querySelector('.comments-loader');
    var showingCommentsCount;

    var commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');

    var showLoadMoreButton = function () {
      commentsLoaderButton.classList.remove('hidden');
    };

    var hideLoadMoreButton = function () {
      commentsLoaderButton.classList.add('hidden');
    };

    var renderComment = function (comment) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;

      return commentElement;
    };

    var renderComments = function (array) {
      array.forEach(function (item) {
        commentsList.appendChild(renderComment(item));
      });
      if (showingCommentsCount > picture.comments.length) {
        socialCommentCount.textContent = picture.comments.length + ' из ' + picture.comments.length + ' комментариев';
      } else {
        socialCommentCount.textContent = showingCommentsCount + ' из ' + picture.comments.length + ' комментариев';
      }
    };
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

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    commentsList.innerHTML = '';
    showingCommentsCount = ON_START_DISPLAYED_COMMENTS;
    renderComments(picture.comments.slice(0, showingCommentsCount));

    if (showingCommentsCount < picture.comments.length) {
      showLoadMoreButton();
      commentsLoaderButton.addEventListener('click', onShowMoreButtonClick);
    }
  };

  var closePicturePopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPictureEscapePress);
    document.body.classList.remove('modal-open');
  };

  var openPicturePopup = function (picture) {
    bigPicture.classList.remove('hidden');
    renderBigPicture(picture);

    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onPictureEscapePress);
  };

  var onPictureEscapePress = function (evt) {
    if (evt.key === 'Escape' && !evt.target.matches('input[type="text"]')) {
      closePicturePopup();
      window.showingCommentsCount = 0;
    }
  };

  pictureCloseButton.addEventListener('click', function () {
    closePicturePopup();
  });

  window.preview = {
    openPicturePopup: openPicturePopup
  };
})();
