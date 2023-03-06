import './index.css';
import {
  configuration,
  profileTitle,
  profileSubtitle,
  profileBlockAvatar,
  profileAvatar,
  inputName,
  inputJob,
  profileButtonAdd,
  popupEdit,
  popupAdd,
  popupUpdateAvatar,
  profileButtonEdit,
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

let idUser;
let sectionGallery;

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-60',
  'ea6d0234-cad7-4863-ab35-40a0835bbbf9'
);

const popupWithImage = new PopupWithImage('.popup_open-image');
popupWithImage.setEventListeners();

const handleCardDelete = (cardId, cardDelete) => {
  api
    .deleteCard('DELETE', cardId)
    .then(() => {
      cardDelete.remove();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

const popupDeleteCard = new PopupDeleteCard('.popup_delete', handleCardDelete);
popupDeleteCard.setEventListeners();

const userInfo = new UserInfo({
  profileTitle,
  profileSubtitle,
  profileAvatar,
});

Promise.all([api.getUserInfoProfile(), api.getInitialCards()])
  .then(([getInfo, card]) => {
    userInfo.setUserInfo(getInfo.name, getInfo.about, getInfo.avatar);
    idUser = getInfo._id;
    sectionGallery = new Section(
      {
        items: card,
        renderer: (item) => {
          const newCard = createCard(item, getInfo._id);
          sectionGallery.addItem(newCard);
        },
      },
      '.gallery'
    );
    sectionGallery.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });


const handleSubmitFormAddCard = new PopupWithForm('.popup_add', {
  handleFormSubmit: (formData) => {
    return api
      .sendNewCard('POST', formData)
      .then((dataPostRequest) => {
        const newCard = createCard(dataPostRequest, idUser);
        sectionGallery.addItem(newCard);
        handleSubmitFormAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
  },
});
handleSubmitFormAddCard.setEventListeners();

const createCard = (formData, Info) => {
  const card = new Card(
    {
      item: formData,
      handleCardClick: () => {
        popupWithImage.open({ name: formData.name, link: formData.link });
      },
      handleLiked: (cardId) => {
        const newLiked = api.liking('PUT', cardId);
        return newLiked;
      },
      handleCardDelete: (cardId, cardDelete) => {
        popupDeleteCard.open(cardId, cardDelete);
      },
      handleLikedDelete: (cardId) => {
        const likedDelete = api.deleteLiking('DELETE', cardId);
        return likedDelete;
      },
      idUser: Info,
    },
    '#gallery'
  );

  const cardElement = card.generateCard();
  return cardElement;
};

const openResetAddCard = () => {
  formValidAddCard.resetValidation();
  handleSubmitFormAddCard.open();
};

const handleSubmitFormProfile = new PopupWithForm('.popup_edit', {
  handleFormSubmit: (formData) => {
    return api
      .updateEditProfile('PATCH', formData)
      .then((userRequest) => {
        userInfo.setUserInfo(
          userRequest.name,
          userRequest.about,
          userRequest.avatar
        );
        handleSubmitFormProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
  },
});
handleSubmitFormProfile.setEventListeners();

const formProfileAvatar = new PopupWithForm('.popup_update', {
  handleFormSubmit: (linkAvatar) => {
    return api
      .updateAvatar('PATCH', linkAvatar)
      .then((resultAvatarRequest) => {
        formProfileAvatar.setEventListeners(resultAvatarRequest);
        userInfo.setUserInfo(
          resultAvatarRequest.name,
          resultAvatarRequest.about,
          resultAvatarRequest.avatar
        );
        formProfileAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
  },
});
formProfileAvatar.setEventListeners();

const handleOpenProfilePopup = () => {
  const dataUser = userInfo.getUserInfo();
  inputName.value = dataUser.getName;
  inputJob.value = dataUser.getProfession;
  formValidProfile.resetValidation();
  handleSubmitFormProfile.open();
};

const updateAvatarProfile = () => {
  formValidProfileAvatar.resetValidation();
  formProfileAvatar.open();
};

profileButtonAdd.addEventListener('click', () => {
  openResetAddCard();
});

profileButtonEdit.addEventListener('click', () => {
  handleOpenProfilePopup();
});

profileBlockAvatar.addEventListener('click', () => {
  updateAvatarProfile();
});

const formValidProfile = new FormValidator(configuration, popupEdit);
formValidProfile.enableValidation();

const formValidAddCard = new FormValidator(configuration, popupAdd);
formValidAddCard.enableValidation();

const formValidProfileAvatar = new FormValidator(configuration, popupUpdateAvatar);
formValidProfileAvatar.enableValidation();
