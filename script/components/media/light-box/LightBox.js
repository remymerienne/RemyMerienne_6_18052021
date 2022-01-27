import { openLightBox } from './OpenLightBox';
import { changeMediaByClick } from './ChangeMediaByClick';
import { changeMediaByKeyboard } from './ChangeMediaByKeyboard';

const uiNodeLightBox = document.querySelector('div.light-box');

let index = 1;
let isOpen = false;

// = Fonctions secondaires :
// ==========================

const closeLightBox = () => {
  const uiNodeLightWrapping = document.querySelector('.light-wrapping');
  uiNodeLightWrapping.style.display = 'none';
  document.querySelector('.page').style.position = 'initial';
  uiNodeLightBox.setAttribute('aria-hidden', 'true');
  isOpen = false;
};

const focusControl = (e) => {
  const focusSelector = 'span.fas, video';
  const focusElements = Array.from(uiNodeLightBox.querySelectorAll(focusSelector));
  e.preventDefault();
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index == focusElements.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusElements.length - 1;
  }
  focusElements[index].focus();
};

// = Fonctions principales :
// ==========================

const openAndChangeMedia = (data) => {
  const uiNodeListened = document.querySelectorAll('.production__photo-thumbnail-bloc');
  uiNodeListened.forEach(element => {
    element.addEventListener('click', (e) => {
      let mediaInLightBox = openLightBox(e, data);
      isOpen = true;
      uiNodeLightBox.setAttribute('aria-hidden', 'false');
      changeMediaByClick(data, mediaInLightBox);
      changeMediaByKeyboard(data, mediaInLightBox);
    });
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        let mediaInLightBox = openLightBox(e, data);
        isOpen = true;
        uiNodeLightBox.setAttribute('aria-hidden', 'false');
        changeMediaByClick(data, mediaInLightBox);
        changeMediaByKeyboard(data, mediaInLightBox);
      }
    });
  });
};

const listenKeypress = () => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && isOpen === true) {
      focusControl(e);
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      closeLightBox();
    } else if (e.target.className == 'fas fa-times box-button' && (e.key === 'Enter' || e.code === 'Space')) {
      e.preventDefault();
      closeLightBox();
    }
  });
};

const closeLightBoxByClick = () => {
  window.addEventListener('click', (e) => {
    if (e.target.className == 'fas fa-times box-button') {
      closeLightBox();
    }
  });
};

// = Exécution :
// ==========================

export const displayLightBox = (data) => {

  openAndChangeMedia(data);
  listenKeypress();
  closeLightBoxByClick();

};

// * End
// **************************