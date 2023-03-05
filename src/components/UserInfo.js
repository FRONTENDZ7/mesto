export class UserInfo {
  constructor({ profileTitle, profileSubtitle, profileAvatar }) {
    this._profileAuthor = profileTitle;
    this._profileProfession = profileSubtitle;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const getName = this._profileAuthor.textContent;
    const getProfession = this._profileProfession.textContent;

    return { getName, getProfession };
  }

  setUserInfo(autor, profession, avatar) {
    this._profileAuthor.textContent = autor;
    this._profileProfession.textContent = profession;
    this._profileAvatar.src = avatar;
  }
}
