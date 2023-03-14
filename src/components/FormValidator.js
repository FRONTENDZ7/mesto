export class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._validationSettings.submitButtonSelector)
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
  }

  _showError(itemInput, errorMessage) {
    const itemError = this._formElement.querySelector(`.${itemInput.id}-error`)
    itemInput.classList.add(this._validationSettings.inputErrorClass);
    itemError.textContent = errorMessage;
    itemError.classList.add(this._validationSettings.errorClass);
  }
  
  _hideError(itemInput) {
    const itemError = this._formElement.querySelector(`.${itemInput.id}-error`)
    itemInput.classList.remove(this._validationSettings.inputErrorClass);
    itemError.classList.remove(this._validationSettings.errorClass);
    itemError.textContent = '';
  }

  _checkValidityInput(itemInput) {
    if (!itemInput.validity.valid) {
      this._showError(itemInput, itemInput.validationMessage);
    } else {
      this._hideError(itemInput);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((itemInput) => {
      itemInput.addEventListener('input', () => {
        this._checkValidityInput(itemInput);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((itemInput) => {
      return !itemInput.validity.valid;
    });
  }

  _disableSubmitButton() {
    this._submitButton.setAttribute('disabled', 'true');
    this._submitButton.classList.add(this._validationSettings.inactiveButtonClass);
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._validationSettings.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  resetValidation() {
    this._inputList.forEach((itemInput) => { this._hideError(itemInput); })
    this._toggleButtonState();
  }
 
  enableValidation() {
    this._setEventListeners();
  }
}
