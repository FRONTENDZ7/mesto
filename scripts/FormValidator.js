export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  };

  _checkValidityInput = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hidesInputError(inputElement);
    } else {
      this._showsInputError(inputElement, inputElement.validationMessage);
    }
  }; 

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }; 

  _hidesInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }; 

  _showsInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  _disabledButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        this._checkValidityInput(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this._disabledButton();
    } else {
      this._enableButton();
    }
  }; 

  resetValidation = () => {  
    this._disabledButton();

    this._inputList.forEach((inputElement) => {
      this._hidesInputError(inputElement);
    });
  };

  enableValidation = () => {
      this._setEventListeners();
  };
  
};