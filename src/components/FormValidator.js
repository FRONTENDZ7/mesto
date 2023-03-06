export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  _checkValidityInput = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disabledButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disabledButton();
    } else {
      this._enableButton();
    }
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidityInput(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  resetValidation = () => {
    this._disabledButton();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };
  
  enableValidation = () => {
    this._setEventListeners();
  };
}
