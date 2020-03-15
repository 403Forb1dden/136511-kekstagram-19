'use strict';
(function () {
  var ON_START_DISPLAYED_COMMENTS = 5;
  var SHOWING_COMMENTS_COUNT_BY_BUTTON = 5;
  var bigPicture = document.querySelector('.big-picture');
  var pictureCloseButton = document.querySelector('.big-picture__cancel');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var socialCommentsAllCount = document.querySelector('comments-count');
  var commentsLoaderButton = document.querySelector('.comments-loader');
  // document.querySelector('.social__comment-count').classList.add('hidden');
  // document.querySelector('.comments-loader').classList.add('hidden');
  // var showingCardsCount = SHOWING_COMMENTS_COUNT_ON_START;

  // this._renderCards(this._showingCardsCount, this._filmsCardsContainer, array);

  var renderBigPicture = function (picture) {
    var commentsList = bigPicture.querySelector('.social__comments');

    var renderComment = function (comment) {
      return ('<li class="social__comment"> <img class="social__picture" src="' + comment.avatar + '" alt="' + comment.name + '" width="35" height="35"> <p class="social__text">' + comment.message + '</p> </li>');
    };

    var showingCommentsCount = ON_START_DISPLAYED_COMMENTS;
    if (picture.comments.length < showingCommentsCount) {
      showingCommentsCount = picture.comments.length;
    }

    var renderComments = function (array) {
      for (var i = 0; i < array.length; i++) {
        commentsList.insertAdjacentHTML('beforeend', renderComment(array[i]));
      }
      // debugger;
      socialCommentCount.textContent = showingCommentsCount + ' из ' + picture.comments.length + ' комментариев';
      // socialCommentsAllCount.textContent = picture.comments.length;
    };

    var onShowMoreButtonClick = function () {
      var prevCommentsCount = showingCommentsCount;
      showingCommentsCount = showingCommentsCount + SHOWING_COMMENTS_COUNT_BY_BUTTON;

      // picture.comments.slice(prevCommentsCount, showingCommentsCount)
      //   .forEach(function (comment) {
      //     renderComment(comment);
      //   });

      renderComments(picture.comments.slice(prevCommentsCount, showingCommentsCount));

      if (showingCommentsCount >= picture.comments.length) {
        commentsLoaderButton.classList.add('hidden');
      }
    };

    commentsLoaderButton.addEventListener('click', onShowMoreButtonClick);

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    commentsList.innerHTML = '';
    renderComments(picture.comments.slice(0, showingCommentsCount));
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

  document.body.classList.add('modal-open');

  pictureCloseButton.addEventListener('click', function () {
    closePicturePopup();
  });

  window.preview = {
    openPicturePopup: openPicturePopup
  };
})();
