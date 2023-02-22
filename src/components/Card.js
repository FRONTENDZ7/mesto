export class Card {
  constructor({ item, handleCardClick }, templateSelector) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
    
    _handleClickOpenPopup() {
      this._handleCardClick();
    };

    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.gallery__item')
        .cloneNode(true);
  
      return cardElement;
    };

    _handleClickDeleteCard() {
      this._element.remove();
    };

    _handleClickLikeCard() {
      this._elementLike.classList.toggle('gallery__button_active');
    };
  
    _setEventListeners() {
      
      this._elementLike.addEventListener('click', () => {
        this._handleClickLikeCard();
      });
      
      this._element.querySelector('.gallery__button-remove').addEventListener('click', () => {
        this._handleClickDeleteCard();
      });
      
      this._elementImg.addEventListener('click', () => {
        this._handleClickOpenPopup();
      });
      
    }; 

    generateCard() {
      this._element = this._getTemplate();
      this._elementLike = this._element.querySelector('.gallery__button');
      this._elementImg = this._element.querySelector('.gallery__picture');
      this._element.querySelector('.gallery__title').textContent = this._name;
      this._elementImg.src = this._link;
      this._elementImg.alt = this._name;
      this._setEventListeners();
      return this._element;
    };
  };