const popups = document.querySelectorAll('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupOpenImage = document.querySelector('.popup_open-image');
const popupEditClose = document.querySelector('.popup__close_edit');
const popupImageClose = document.querySelector('.popup__close_image');
const popupAddClose = document.querySelector('.popup__close_add');
const popupFormAdd = popupAdd.querySelector('.popup__form_add');
const popupFormEdit = document.querySelector('.popup__form_edit');

const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_profession');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const popupImg = document.querySelector('.popup__img');
const popupFigureCaption = document.querySelector('.popup__figure-caption');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add'); 

const sectionGallery = document.querySelector('.gallery');
const galleryTemplate = document.querySelector('#gallery').content;
const galleryPicture = document.querySelector('.gallery__picture'); 

function createCard(name, link) {
  const itemClone = galleryTemplate.querySelector('.gallery__item').cloneNode(true);
  itemClone.querySelector('.gallery__picture').src = link;
  itemClone.querySelector('.gallery__picture').alt = name;
  itemClone.querySelector('.gallery__title').textContent = name;
  
  itemClone.querySelector('.gallery__picture').addEventListener('click', () => {
    popupImg.src = itemClone.querySelector('.gallery__picture').src;
    popupImg.alt = itemClone.querySelector('.gallery__title').textContent;
    popupFigureCaption.textContent = itemClone.querySelector('.gallery__title').textContent;
    openPopup(popupOpenImage);
  });

  itemClone.querySelector('.gallery__button').addEventListener('click', () => {
    itemClone.querySelector('.gallery__button').classList.toggle('gallery__button_active');
  });

  itemClone.querySelector('.gallery__button-remove').addEventListener('click', () => {
    itemClone.remove();
  });

  return itemClone;
};




function submitCardForm(evt) {
  evt.preventDefault();
  sectionGallery.prepend(createCard(inputTitle.value, inputLink.value));
  closePopup(popupAdd);
};


function turnCard(name, link) {
  sectionGallery.append(createCard(name, link));
};

initialCards.forEach(elementCard => {
  turnCard(elementCard.name, elementCard.link);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
};

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOverlay);
});

function returnsButtonEvent(popup) {
  const button = popup.querySelector('.popup__button');
  button.classList.add(configuration.inactiveButtonClass);
};

profileButtonEdit.addEventListener('click',()=>{
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
  openPopup(popupEdit);
  returnsButtonEvent(popupEdit);
});

profileButtonAdd.addEventListener('click',()=>{
  inputTitle.value = '';
  inputLink.value = '';
  openPopup(popupAdd);
  returnsButtonEvent(popupAdd);
});

popupEditClose.addEventListener('click',()=>{
  closePopup(popupEdit);
  
});

popupAddClose.addEventListener('click',()=>{
  closePopup(popupAdd);
});

popupImageClose.addEventListener('click',()=>{
  closePopup(popupOpenImage);
});

function submitEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupEdit);
};


popupFormEdit.addEventListener('submit', submitEditForm);

popupFormAdd.addEventListener('submit', submitCardForm);



const configuration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(configuration);