const initialCards = [
  {
    name: 'Роза хутор',
    link: 'https://images.unsplash.com/photo-1601035821612-8cb0ffba4083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupOpenImage = document.querySelector('.popup_open-image');
const popupEditClose = document.querySelector('.popup__close_edit');
const popupImageClose = document.querySelector('.popup__close_image');
const popupAddClose = document.querySelector('.popup__close_add');
const formSaveCard = popupAdd.querySelector('.popup__container');
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
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

profileButtonEdit.addEventListener('click',()=>{
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
  openPopup(popupEdit);
});

profileButtonAdd.addEventListener('click',()=>{
  inputTitle.value = '';
  inputLink.value = '';
  openPopup(popupAdd);
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

function submitSaveForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(popupEdit);
};


popupFormEdit.addEventListener('submit', submitSaveForm);

formSaveCard.addEventListener('submit', submitCardForm);
