import "./style.scss";

export class Popups {
  constructor(rootEl) {
    this.rootEl = rootEl || document.querySelector("body");
    this.popups = {};
    this.displayedPopupName = "";
    this.displayedPopupEl = null;
  }

  register(name, markupGenerator, onCloseHandler) {
    this.popups[name] = {
      name,
      markupGenerator,
      onCloseHandler,
    };
  }

  trigger(name, ...args) {
    if (!this.popups[name]) {
      return;
    }

    if (this.displayedPopupName === name) {
      // If the currently displayed popup is the one we're triggering
      // then assume that the button has been clicked to hide it again
      this.hide();
      return;
    }

    // If a popup is displayed, but isn't the triggered one,
    // then hide it and display the newly triggered one
    if (this.displayedPopupName) {
      this.hide();
    }

    this.displayedPopupName = name;

    const popup = document.createElement("div");
    popup.setAttribute("id", "popup-window");
    popup.classList.add("popup-window");
    popup.innerHTML = this.popups[name].markupGenerator(...args);

    const closeButton = popup.querySelector("#popup-close");
    if (closeButton) {
      closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.popups[name].onCloseHandler) {
          this.popups[name].onCloseHandler(popup);
        }
        this.hide();
        return false;
      });
    }

    this.displayedPopupEl = popup;
    this.rootEl.appendChild(popup);
  }

  hide() {
    if (this.displayedPopupEl) {
      this.displayedPopupEl.remove();
    }
    this.displayedPopupName = "";
    this.displayedPopupEl = null;
  }
}
