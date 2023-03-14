export const profileButtonEdit = document.querySelector('.profile__editor');
export const profileButtonAdd = document.querySelector('.profile__add-mesto');
export const popupEdit = document.querySelector('#popup-edit');
export const formProfile = popupEdit.querySelector('.popup__form');
export const popupAdd = document.querySelector('#popup-add');
export const formCards = popupAdd.querySelector('.popup__form');
export const inputName = popupEdit.querySelector('#username-input');
export const inputJob = popupEdit.querySelector('#description-input');
export const popupUpdateAvatar = document.querySelector('#popup-update-avatar');
export const popupAvatarEditForm = popupUpdateAvatar.querySelector('.popup__form');
export const iconAvatarEdit = document.querySelector('.profile__avatar-edit');

export const configuration = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_type_visible'
};

