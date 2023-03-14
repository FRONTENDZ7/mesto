import './index.css';

import { 
  configuration, profileButtonEdit,
  profileButtonAdd, 
  formProfile,  
  formCards, inputName, 
  inputJob, 
  popupAvatarEditForm, iconAvatarEdit } from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupNotice } from '../components/PopupNotice.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const apiFindings = {
  link: 'https://mesto.nomoreparties.co/v1/cohort-60/',
  headers: {
    authorization: 'ea6d0234-cad7-4863-ab35-40a0835bbbf9',
    'Content-Type': 'application/json'
  }
};

const apiRelations = new Api(apiFindings);

let userId;

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

const renderCard = function (cardElement) {
  const cardItem = new Card(cardElement, '#card-template', userId, { cardId: cardElement._id, authorId: cardElement.owner._id, }, {
    makeCardZoom: (name, image) => { popupImageCard.open(name, image) },
    makeCardDelete: (cardElement, cardId) => { popupDeleteNotice.open(cardElement, cardId) },
    makeCardLike: (cardId) => { apiRelations.putLikeCard(cardId)
        .then((res) => {
          cardItem.renderCardLike(res);
        })
        .catch((err) => { console.log(`При лайке карточки возникла ошибка, ${err}`) })
    },
    makeCardDeleteLike: (cardId) => { apiRelations.deleteLikeCard(cardId)
        .then((res) => {
          cardItem.renderCardLike(res);
        })
        .catch((err) => { console.log(`При дизлайке карточки возникла ошибка, ${err}`) })
    },
  });
  return cardItem.makeCard();
}

const renderInitialCards = new Section({
  renderer: (cardElement) => {
    renderInitialCards.addItem(renderCard(cardElement));
  }
}, '.cards');

Promise.all([ apiRelations.getUserData(), apiRelations.getInitialCards() ]).then(([ userProfileData, cardElement ]) => {
    userId = userProfileData._id;
    userInfo.setUserInfo({ username: userProfileData.name, description: userProfileData.about });
    renderInitialCards.renderItems(cardElement.reverse());
    userInfo.setUserAvatar(userProfileData.avatar);
  })
  .catch((err) => { console.log(`Возникла глобальная ошибка, ${err}`) })

const popupImageCard = new PopupWithImage('#popup-image');
popupImageCard.setEventListeners();

const popupUpdateAvatar = new PopupWithForm('#popup-update-avatar', {
  callbackFormSubmit: (userProfileData) => { popupUpdateAvatar.putSavingProcessText(); apiRelations.sendAvatarData(userProfileData)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupUpdateAvatar.close();
      })
      .catch((err) => { console.log(`При обновлении аватара возникла ошибка, ${err}`) })
      .finally(() => {
        popupUpdateAvatar.returnSavingProcessText();
      })
  }
});
popupUpdateAvatar.setEventListeners();

const popupDeleteNotice = new PopupNotice("#popup-delete-card", {
  callbackNotice: (cardElement, cardId) => { apiRelations.deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard();
        popupDeleteNotice.close();
      })
      .catch((err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
  }
});
popupDeleteNotice.setEventListeners();

const popupProfileEdit = new PopupWithForm('#popup-edit', {
  callbackFormSubmit: (userProfileData) => { popupProfileEdit.putSavingProcessText(); apiRelations.sendUserData(userProfileData)
      .then((res) => {
        userInfo.setUserInfo({ username: res.name, description: res.about });
        popupProfileEdit.close();
      })
      .catch((err) => { console.log(`При редактировании профиля возникла ошибка, ${err}`) })
      .finally(() => {
        popupProfileEdit.returnSavingProcessText();
      })
  }
});
popupProfileEdit.setEventListeners();

const popupCardAdd = new PopupWithForm('#popup-add', {
  callbackFormSubmit: (formValues) => { popupCardAdd.putSavingProcessText(); apiRelations.addNewCard({ name: formValues.placename, link: formValues.placeimage })
      .then((card) => {
        renderInitialCards.addItem(renderCard(card));
        popupCardAdd.close();
      })
      .catch((err) => { console.log(`При добавлении новой карточки возникла ошибка, ${err}`) })
      .finally(() => {
        popupCardAdd.returnSavingProcessText();
      })
  }
});
popupCardAdd.setEventListeners();

const cardValidate = new FormValidator(configuration, formCards);
cardValidate.enableValidation();
const profileValidateEdit = new FormValidator(configuration, formProfile);
profileValidateEdit.enableValidation();
const profileAvatarValidate = new FormValidator(configuration, popupAvatarEditForm);
profileAvatarValidate.enableValidation();

profileButtonEdit.addEventListener('click', function () {
  popupProfileEdit.open();
  profileValidateEdit.resetValidation();
  const actualUserInfo = userInfo.getUserInfo();
  inputName.value = actualUserInfo.username;
  inputJob.value = actualUserInfo.description;
});

iconAvatarEdit.addEventListener('click', function () {
  popupUpdateAvatar.open();
  profileAvatarValidate.resetValidation();
});

profileButtonAdd.addEventListener('click', function () {
  popupCardAdd.open();
  cardValidate.resetValidation();
});