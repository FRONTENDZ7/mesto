import { Popup } from "./Popup.js";

export class PopupNotice extends Popup {
  constructor(popupSelector, { callbackNotice }) {
    super(popupSelector);
    this._submitButton = this._popupItem.querySelector('.popup__form');
    this._callbackNotice = callbackNotice;
  }

  open(cardElement, cardId) {
    this._cardObject = cardElement;
    this._cardId = cardId;
    super.open();
  }

  setEventListeners() {
    this._submitButton.addEventListener('submit', (evt) => { evt.preventDefault(); this._callbackNotice(this._cardObject, this._cardId) })
    super.setEventListeners();
  }
}
