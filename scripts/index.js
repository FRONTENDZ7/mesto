let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__button-edit');
let close = document.querySelector('.popup__close');

let formBody = document.querySelector('.popup__form-body');
let inputName = document.querySelector('.popup__input_name');
let inputJob = document.querySelector('.popup__input_profession');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

edit.addEventListener('click',()=>{
    inputName.value = title.textContent;
    inputJob.value = subtitle.textContent;
    popup.classList.add('popup_opened')
});

close.addEventListener('click',()=>{
    popup.classList.remove('popup_opened')
});


function formSave(evt) {
    evt.preventDefault();
    title.textContent = inputName.value;
    subtitle.textContent = inputJob.value;
    popup.classList.remove('popup_opened');
}

formBody.addEventListener('submit', formSave);