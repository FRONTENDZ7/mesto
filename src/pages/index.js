import initialCards from '../utils/cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';
import {
  configuration,
  profileTitle,
  profileSubtitle,
  inputName,
  inputJob,
  inputTitle,
  inputLink,
  profileButtonAdd,
  popupEdit,
  popupAdd,
  profileButtonEdit,
} from '../utils/constants.js';

const popupWithImage = new PopupWithImage('.popup_open-image');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({ profileTitle, profileSubtitle });


const createCard = (formData) => {
  const card = new Card({ item: formData,handleCardClick: () => {
        popupWithImage.open({ name: formData.name, link: formData.link });
      },
    },
    '#gallery'
  );

  const cardElement = card.generateCard();
  return cardElement;
};

const handleSubmitFormAddCard = new PopupWithForm('.popup_add', {
  handleFormSubmit: (formData) => {
    const newObject = createCard(formData);
    sectionGallery.addItem(newObject);

    handleSubmitFormAddCard.close();
  },
});
handleSubmitFormAddCard.setEventListeners();

const handleSubmitFormProfile = new PopupWithForm('.popup_edit', {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData.name, formData.profession);
    handleSubmitFormProfile.close();
  },
});
handleSubmitFormProfile.setEventListeners();

const sectionGallery = new Section({ items: initialCards,renderer: (item) => { 
      const newCard = createCard(item);
      sectionGallery.addItem(newCard);
    },
  },
  '.gallery'
);
sectionGallery.renderItems();

const openResetAddCard = () => {
  formValidAddCard.resetValidation();
  handleSubmitFormAddCard.open();
};

const openAddProfilePopup = () => {
  const getUserInfo = userInfo.getUserInfo();
  inputName.value = getUserInfo.author;
  inputJob.value = getUserInfo.profession;
  formValidProfile.resetValidation();
  handleSubmitFormProfile.open();
};

profileButtonAdd.addEventListener('click', () => {
  openResetAddCard();
});

profileButtonEdit.addEventListener('click', () => {
  openAddProfilePopup();
});

const formValidProfile = new FormValidator(configuration, popupEdit);
formValidProfile.enableValidation();

const formValidAddCard = new FormValidator(configuration, popupAdd);
formValidAddCard.enableValidation();

