export class UserInfo {
    constructor({ profileTitle, profileSubtitle }) {
      this._profileTitle = profileTitle;
      this._profileSubtitle = profileSubtitle;
    };

    setUserInfo(author, profession) {
      this._profileTitle.textContent = author;
      this._profileSubtitle.textContent = profession;
    };

    getUserInfo() {
      const author = this._profileTitle.textContent;
      const profession = this._profileSubtitle.textContent;
      return { author, profession };
    };
  };