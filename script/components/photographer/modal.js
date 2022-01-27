// domElement
const uiNodeFormWrap = document.querySelector('.form-wrapping');
const uiNodeSubmit = document.querySelector('.form__button');
const uiNodeModal = document.querySelector('.form-content');
// inputListened
const firstName = document.getElementById('prenom');
const lastName = document.getElementById('nom');
const eMail = document.getElementById('e-mail');
const userRequest = document.getElementById('request');
// regExp
const regExpName = /^([A-Za-zéèêëîïôç]{2,15})([-\s]?)([A-Za-zéèêëîïôç]{0,15})$/;
const regExpMail = /^([A-Za-z0-9\-.]+)@([A-Za-z0-9-]+)\.([a-z]{2,3})$/;
const regExpRequest = /(.{5,500})\n?/;
// errorMessage
const errorMessageFirstName = 'Veuillez renseigner votre prénom (2 lettres minimum).';
const errorMessageLastName = 'Veuillez renseigner votre nom (2 lettres minimum).';
const errorMessageMail = 'Merci de saisir un adresse E-mail valide.';
const errorMessageRequest = 'Merci de saisir votre message (5 caractères minimum et 500 maximum).';

let isOpen = false;
let index = 0;

// = Fonctions secondaires :
// ==========================

const focusControl = (e) => {
  const focusSelector = 'input, textarea, svg';
  const focusElement = Array.from(uiNodeModal.querySelectorAll(focusSelector));
  e.preventDefault();
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index == focusElement.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusElement.length - 1;
  }
  focusElement[index].focus();
};

const resetAttributs = () => {
  const uiNodeFormFields = document.querySelectorAll('.form__field');
  const uiNodeFormInput = document.querySelectorAll('input');
  uiNodeFormFields.forEach(element => {
    element.setAttribute('data-error', '');
    element.setAttribute('data-error-visible', 'false');
  });
  uiNodeFormInput.forEach(element => {
    element.setAttribute('aria-invalid', 'false');
  });
  uiNodeModal.setAttribute('aria-hidden', 'true');
};

const closeModal = () => {
  uiNodeFormWrap.style.display = 'none';
  document.querySelector('.page').style.position = 'initial';
  isOpen = false;
  resetAttributs();
};

const selectParent = (childrenId) => {
  switch (childrenId) {
    case firstName:
      return document.querySelector('.form__field#firstName');
    case lastName:
      return document.querySelector('.form__field#lastName');
    case eMail:
      return document.querySelector('.form__field#eMail');
    case userRequest:
      return document.querySelector('.form__field#userRequest');
  }
};

const countGoodAnswer = () => {
  const allEntry = document.querySelectorAll('.form__field[data-error-visible="false"]');
  let i = 0;
  allEntry.forEach(() => i += 1);
  return i;
};

const displayUserData = () => {
  const userData = {
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    eMail: localStorage.getItem('eMail'),
    userRequest: localStorage.getItem('userRequest'),
  };
  for (let property in userData) {
    console.log(`${property}: ${userData[property]}`);
  }
};

const testValidation = () => {
  if (countGoodAnswer() === 4) {
    closeModal();
    displayUserData();
  }
};

// = Fonctions principales :
// ==========================

const openModal = () => {
  const uiNodeToOpenModal = document.querySelector('.photographer__contact');
  const uiNodeForm = document.querySelector('form');
  uiNodeToOpenModal.addEventListener('click', () => {
    localStorage.clear();
    uiNodeForm.reset();
    console.clear();
    uiNodeFormWrap.style.display = 'flex';
    document.querySelector('.page').style.position = 'fixed';
    uiNodeModal.setAttribute('aria-hidden', 'false');
    document.getElementById('js-re').focus();
    window.scrollTo(0, 25);
    isOpen = true;
  });
};

const disableSubmit = () => {
  uiNodeSubmit.addEventListener('click', (e) => e.preventDefault());
};

const listenKeyPress = () => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeModal();
    }
    if (e.key === 'Tab' && isOpen === true) {
      focusControl(e);
    }
    if (e.key === 'Enter' && isOpen === true) {
      e.preventDefault();
      if (index === 0) {
        closeModal();
      }
      if (index === 5) {
        testValidation();
      }
    }
  });
};

const closeModalOnEvent = () => {
  const uiNodeToCloseModal = document.querySelector('svg');
  uiNodeToCloseModal.addEventListener('click', () => {
    closeModal();
  });
  uiNodeToCloseModal.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      closeModal();
    }
  });  
};

const displayPhotographersName = (data) => {
  const uiNodeToInjectName = document.querySelector('.form-content__photographer');
  const id = window.location.search.slice(1);
  const photographer = data.photographers.filter(p => p.id == id);
  const name = photographer[0].name;
  uiNodeToInjectName.textContent = name;
};

const checkValidityOnFocusChange = (inputListened, regExp, errorMessage, keyName) => {
  inputListened.addEventListener('focusout', (e) => {
    const validate = regExp.test(e.target.value);
    if (validate) {
      selectParent(inputListened).setAttribute('data-error-visible', 'false');
      selectParent(inputListened).setAttribute('data-error', '');
      inputListened.setAttribute('aria-invalid', 'false');
    } else {
      selectParent(inputListened).setAttribute('data-error-visible', 'true');
      selectParent(inputListened).setAttribute('data-error', errorMessage);
      inputListened.setAttribute('aria-invalid', 'true');
    }
    const data = inputListened.value;
    localStorage.setItem(keyName, data);
  });
};

const checkValidityOnSubmit = (inputListened, errorMessage) => {
  uiNodeSubmit.addEventListener('click', () => {
    if (inputListened.value == '') {
      selectParent(inputListened).setAttribute('data-error-visible', 'true');
      selectParent(inputListened).setAttribute('data-error', errorMessage);
      inputListened.setAttribute('aria-invalid', 'true');
    }
  });
};

const validationOnClick = () => {
  uiNodeSubmit.addEventListener('click', () => {
    testValidation();
  });
};

// = Exécution :
// ==========================

export const displayModal = (data) => {
  openModal();
  disableSubmit();
  listenKeyPress();
  closeModalOnEvent();
  displayPhotographersName(data);
  checkValidityOnFocusChange(firstName, regExpName, errorMessageFirstName, 'firstName');
  checkValidityOnFocusChange(lastName, regExpName, errorMessageLastName, 'lastName');
  checkValidityOnFocusChange(eMail, regExpMail, errorMessageMail, 'eMail');
  checkValidityOnFocusChange(userRequest, regExpRequest, errorMessageRequest, 'userRequest');
  checkValidityOnSubmit(firstName, errorMessageFirstName);
  checkValidityOnSubmit(lastName, errorMessageLastName);
  checkValidityOnSubmit(eMail, errorMessageMail);
  checkValidityOnSubmit(userRequest, errorMessageRequest);
  validationOnClick();
};

// * End
// **************************
