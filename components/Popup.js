class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_visible");
  }

  close() {
    this._popup.classList.remove("popup_visible");
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close(this._popup);
    }
  }

  setEventListeners() {
    this._closeBtn = document.querySelector(".popup__close");
    this._closeBtn.addEventListener("click", () => this.close());
  }
}
