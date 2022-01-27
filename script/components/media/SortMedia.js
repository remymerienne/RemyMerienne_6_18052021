const setSortingChoiceAndReload  = (e) => {

  const sortChoice = e.target.innerText.toLowerCase();
  localStorage.setItem('sorting', sortChoice);
  location.reload();

};

export const listenSortingChoice = () => {

  const uiNodeListened = document.querySelectorAll('li.js-sorting');

  uiNodeListened.forEach(element => {

    element.addEventListener('click', e => {
      setSortingChoiceAndReload(e);
    });

    element.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        setSortingChoiceAndReload(e);
      }
    });

  });

};

// fonctions de comparaison :

export const sortByDate = (a, b) => {
  if (a.date < b.date) {
    return 1;
  }
  if (a.date > b.date) {
    return -1;
  }
  return 0;
};

export const sortByPopularity = (a, b) => {
  if (a.likes < b.likes) {
    return 1;
  }
  if (a.likes > b.likes) {
    return -1;
  }
  return 0;
};

export const sortByTitle = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

// Gestion du comportement de la liste déroulante

export const manageSortListBehavior = () => {
  
  const uiNodeTrigger = document.querySelector('button.production__navigation-trigger');
  const uiNodeOptionsList = document.querySelector('ul.production__navigation-optionslist');
  const uiNodeOtherFocus = document.querySelectorAll('video, img, button.production__navigation-trigger');


  // Ouverture de la liste déroulante au click ou sur 'enter' sur le trigger
  uiNodeTrigger.addEventListener('click', () => {
    uiNodeOptionsList.style.display = 'block';
    uiNodeTrigger.setAttribute('aria-expanded', 'true');
    document.querySelector('li.item--first').focus();

  });

  // Fermeture de la liste déroulante au changement de focus
  uiNodeOtherFocus.forEach(element => {
    element.addEventListener('focusin', () => {
      uiNodeOptionsList.style.display = 'none';
      uiNodeTrigger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fermeture de la liste déroulante au sortir de la souris
  uiNodeOptionsList.addEventListener('mouseleave', () => {
    uiNodeOptionsList.style.display = 'none';
    uiNodeTrigger.setAttribute('aria-expanded', 'false');
  });

};

// * End
// **************************
