
const enableValidation = (structure) => {
  const formConfig = Array.from(document.querySelectorAll(structure.formSelector));
  formConfig.forEach((formElement) => {
    getEventListeners(formElement, structure);
  });
};

const getEventListeners = (formElement, structure) => {
  const inputFields = Array.from(formElement.querySelectorAll(structure.inputSelector));
  const buttonElement = formElement.querySelector(structure.submitButtonSelector);
  toggleButtonStatus(inputFields, buttonElement, structure)
  inputFields.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
      controlsInputValidity(formElement, inputElement, structure);
      toggleButtonStatus(inputFields, buttonElement, structure);
      });
  });
};

const concealTheButton = (popupButton) => {
  const button = popupButton.querySelector('.popup__button');
  button.classList.add(structure.inactiveButtonClass);
  button.disabled = true;
};

const removeInputError = (formElement, inputElement, structure) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(structure.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(structure.inputErrorClass);
}; 

const outputAnInputError = (formElement, inputElement, structure) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(structure.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(structure.inputErrorClass);
};

const controlsInputValidity = (formElement, inputElement, structure) => {
  if (inputElement.validity.valid) {
    removeInputError(formElement, inputElement, structure);
  } else {
    outputAnInputError(formElement, inputElement, structure);
  }
}; 

const toggleButtonStatus = (inputFields, buttonElement, structure) => {
  if (hasInvalidInput(inputFields)) {
    buttonElement.classList.add(structure.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(structure.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}; 

const hasInvalidInput = (inputFields) => {
  return inputFields.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 



 

