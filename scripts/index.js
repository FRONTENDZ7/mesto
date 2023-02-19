import initialCards from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImg = document.querySelector('.popup__img');
const popupForm = document.querySelector('.popup__form');
const formElement = document.querySelector('.popup__container');
const inputName = formElement.querySelector('.popup__input_type_name');
const inputJob = formElement.querySelector('.popup__input_type_profession');
const inputTitle = popupAdd.querySelector('.popup__input_type_title');
const inputLink = popupAdd.querySelector('.popup__input_type_link');
const popupOpenImage = document.querySelector('.popup_open-image');
const buttonSaveCardInfo = popupAdd.querySelector('.popup__container');
const popupFigureCaption = document.querySelector('.popup__figure-caption');
const popupButtonsClose = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonAdd = document.querySelector('.profile__button-add');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const sectionGallery = document.querySelector('.gallery');

const configuration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const closePopupClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    handleClosePopup(evt.target);
  };
};

const closePopupEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    handleClosePopup(popupOpened);
  };
};

export const handleOpenPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};

export const handleClosePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
};

function createCard(item) {
  const card = new Card(item, '#gallery');
  const cardElement = card.generateCard();
  
  return cardElement;
};

const handleSubmitFormAddCard = (evt) => {
  evt.preventDefault();
  const newObject = {
    name: inputTitle.value,
    link: inputLink.value,
  };
  sectionGallery.prepend(createCard(newObject));
  handleClosePopup(popupAdd);
};

const handleSubmitFormProfile = (evt) => {
  evt.preventDefault(); 
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  handleClosePopup(popupEdit);
};

const openResetAddCard = () => {
  inputTitle.value = '';
  inputLink.value = '';
  formValidAddCard.resetValidation();
  handleOpenPopup(popupAdd);
};

const openAddProfilePopup = () => {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
  formValidProfile.resetValidation();
  handleOpenPopup(popupEdit);
};

popupButtonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => handleClosePopup(popup));
});

profileButtonAdd.addEventListener('click', () => {
  openResetAddCard();
});

profileButtonEdit.addEventListener('click', () => {
  openAddProfilePopup();
});

buttonSaveCardInfo.addEventListener('submit', handleSubmitFormAddCard);

popupForm.addEventListener('submit', (evt) => handleSubmitFormProfile(evt));

popups.forEach((element) => {
  const popup = element.closest('.popup');
  popup.addEventListener('click', (evt) => closePopupClick(evt));
});

initialCards.forEach((item) => {
  sectionGallery.append(createCard(item));
});

const formValidProfile = new FormValidator(configuration, popupEdit);
formValidProfile.enableValidation();

const formValidAddCard = new FormValidator(configuration, popupAdd);
formValidAddCard.enableValidation();

export { popupOpenImage, popupImg, popupFigureCaption };