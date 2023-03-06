export class Card {
  constructor(
    {
      item,
      handleCardClick,
      handleCardDelete,
      handleLiked,
      handleLikedDelete,
      idUser,
    },
    templateSelector
  ) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._cardId = item;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = idUser;
    this._handleCardDelete = handleCardDelete;
    this._handleLiked = handleLiked;
    this._handleLikedDelete = handleLikedDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    
    if (this._cardId.owner._id !== this._userId) {
      this._element.querySelector('.gallery__button-remove').remove();
    }

    if (this._cardId.owner._id === this._userId) {
      this._element.setAttribute('data-id', this._cardId._id);
    }

    this._elementImg = this._element.querySelector('.gallery__picture');
    this._elementLikeCount = this._element.querySelector('.gallery__like-count');

    this._element.querySelector('.gallery__title').textContent = this._name;
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;

    this._likes.forEach((elem) => {
      if (elem._id === this._userId) {
        this._element
          .querySelector('.gallery__button')
          .classList.toggle('gallery__button_active');
      }
    });

    this._elementLikeCount.textContent =
      this._likes.length;

    this._setEventListeners();

    return this._element;
  }

  _handleClickOpenPopup() {
    this._handleCardClick();
  }

  _handleClickDeleteCard(cardId, elementCard) {
    this._handleCardDelete(cardId, elementCard);
  }

  _handleClickLikeCard() {
    this._handleLiked(this._cardId._id).then((res) => {
      if (this._elementLike.classList.toggle('gallery__button_active')) {
        this._elementLikeCount.textContent =
          res.likes.length;
      } else {
        this._handleLikedDelete(this._cardId._id).then((res) => {
          this._elementLikeCount.textContent =
            res.likes.length;
        });
      }
    });
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.gallery__button');

    this._elementImg.addEventListener('click', () => {
      this._handleClickOpenPopup();
    });

    if (this._cardId.owner._id === this._userId) {
      this._element
        .querySelector('.gallery__button-remove')
        .addEventListener('click', () => {
          this._handleClickDeleteCard(this._cardId._id, this._element);
        });
    }

    this._elementLike.addEventListener('click', () => {
      this._handleClickLikeCard();
    });
  }
}
