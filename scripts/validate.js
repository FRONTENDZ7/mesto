const enableValidation = (configuration) => {
  const formConfig = Array.from(document.querySelectorAll(configuration.formSelector));
  formConfig.forEach((formElement) => {
    setEventListeners(formElement, configuration);
  });
};

const setEventListeners = (formElement, configuration) => {
  const inputFields = Array.from(formElement.querySelectorAll(configuration.inputSelector));
  const buttonElement = formElement.querySelector(configuration.submitButtonSelector);
  toggleButtonStatus(inputFields, buttonElement, configuration)
  inputFields.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
      controlsInputValidity(formElement, inputElement, configuration);
      toggleButtonStatus(inputFields, buttonElement, configuration);
      });
  });
};


const removeInputError = (formElement, inputElement, configuration) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(configuration.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(configuration.inputErrorClass);
}; 

const outputAnInputError = (formElement, inputElement, configuration) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(configuration.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(configuration.inputErrorClass);
};

const controlsInputValidity = (formElement, inputElement, configuration) => {
  if (inputElement.validity.valid) {
    removeInputError(formElement, inputElement, configuration);
  } else {
    outputAnInputError(formElement, inputElement, configuration);
  }
}; 


const disabledButton = (buttonElement, configuration) => {
  buttonElement.classList.add(configuration.inactiveButtonClass); 
  buttonElement.disabled = true; 
};
const enableButton = (buttonElement, configuration) => {
  buttonElement.classList.remove(configuration.inactiveButtonClass); 
  buttonElement.disabled = false; 
};
const toggleButtonStatus = (inputFields, buttonElement, configuration) => {
  if (hasInvalidInput(inputFields)) {
    disabledButton(buttonElement, configuration);
  } else {
    enableButton(buttonElement, configuration);
  }
};  

const hasInvalidInput = (inputFields) => {
  return inputFields.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 
 



 

