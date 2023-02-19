import * as index from '../scripts/index.js';

export class Card {
    constructor(data, templateSelector) {
      this._templateSelector = templateSelector;
      this._name = data.name;
      this._link = data.link;
    };

    generateCard() {
      this._element = this._getTemplate();
      this._elementLike = this._element.querySelector('.gallery__button');
      this._element.querySelector('.gallery__title').textContent = this._name;
      this._element.querySelector('.gallery__picture').alt = this._name;
      this._element.querySelector('.gallery__picture').src = this._link;
      this._setEventListeners();
      return this._element;
    };
    
    _handleClickOpenPopup() {
      index.popupImg.alt = this._name;
      index.popupImg.src = this._link;
      index.popupFigureCaption.textContent = this._name;
      index.handleOpenPopup(index.popupOpenImage);
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
      
      this._element.querySelector('.gallery__button').addEventListener('click', () => {
        this._handleClickLikeCard();
      });
      
      this._element.querySelector('.gallery__button-remove').addEventListener('click', () => {
        this._handleClickDeleteCard();
      });
      
      this._element.querySelector('.gallery__picture').addEventListener('click', () => {
        this._handleClickOpenPopup();
      });
      
    }; 
  };