const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
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

const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupOpenImage = document.querySelector('.popup_open-image');
const close = document.querySelector('.popup__close');
const closeImage = document.querySelector('.popup__close_image');
const closeAdd = document.querySelector('.popup__close_add');
const saveCard = popupAdd.querySelector('.popup__container');
const formBody = document.querySelector('.popup__form-body');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_profession');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const popupImg = document.querySelector('.popup__img');
const popupFigureCaption = document.querySelector('.popup__figure-caption');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const edit = document.querySelector('.profile__button-edit');
const add = document.querySelector('.profile__button-add'); 

const sectionGallery = document.querySelector('.gallery');
const galleryTemplate = document.querySelector('#gallery').content;
const galleryPicture = document.querySelector('.gallery__picture'); 

function createCard(name, link) {
  const cloneItem = galleryTemplate.querySelector('.gallery__item').cloneNode(true);
  cloneItem.querySelector('.gallery__picture').src = link;
  cloneItem.querySelector('.gallery__picture').alt = name;
  cloneItem.querySelector('.gallery__title').textContent = name;
  
  cloneItem.querySelector('.gallery__picture').addEventListener('click', () => {
    popupImg.src = cloneItem.querySelector('.gallery__picture').src;
    popupImg.alt = cloneItem.querySelector('.gallery__title').textContent;
    popupFigureCaption.textContent = cloneItem.querySelector('.gallery__title').textContent;
    popupOpenImage.classList.add('popup_opened');
  });

  cloneItem.querySelector('.gallery__button').addEventListener('click', () => {
    cloneItem.querySelector('.gallery__button').classList.toggle('gallery__button_active');
  });

  cloneItem.querySelector('.gallery__button-remove').addEventListener('click', () => {
    cloneItem.remove();
  });

  return cloneItem;
};




function formCard(evt) {
  evt.preventDefault();
  sectionGallery.prepend(createCard(inputTitle.value, inputLink.value));
  popupAdd.classList.remove('popup_opened');
};


function turnCard(name, link) {
  sectionGallery.append(createCard(name, link));
};

initialCards.forEach(elementCard => {
  turnCard(elementCard.name, elementCard.link);
});


edit.addEventListener('click',()=>{
  inputName.value = title.textContent;
  inputJob.value = subtitle.textContent;
  popup.classList.add('popup_opened');
});

add.addEventListener('click',()=>{
  inputTitle.value = inputTitle.textContent;
  inputLink.value = inputLink.textContent;
  popupAdd.classList.add('popup_opened');
});

close.addEventListener('click',()=>{
  popup.classList.remove('popup_opened');
});

closeAdd.addEventListener('click',()=>{
  popupAdd.classList.remove('popup_opened');
});

closeImage.addEventListener('click',()=>{
  popupOpenImage.classList.remove('popup_opened');
});

function formSave(evt) {
  evt.preventDefault();
  title.textContent = inputName.value;
  subtitle.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
};

formBody.addEventListener('submit', formSave);

saveCard.addEventListener('submit', formCard);
