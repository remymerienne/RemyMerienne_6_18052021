import { createPhotographer } from './PhotographerClass';

export const buildHeader = (data) => {

  const id = window.location.search.slice(1);
  const uiNode = document.querySelector('main.layout__main');

  let photographerToDisplay = data.photographers.filter(p => p.id == id);
  photographerToDisplay = photographerToDisplay[0];

  let tags = '';
  for (let j = 0; j < photographerToDisplay.tags.length; j++) {
    tags += `
      <div class="js-tags" role="link" tabindex="0">
        <span class="sr-only">Tag</span>
        <span class="tag">${photographerToDisplay.tags[j]}</span>
      </div>
    `;
  }

  const photographer = createPhotographer(
    photographerToDisplay.city,
    photographerToDisplay.country,
    photographerToDisplay.id,
    photographerToDisplay.name,
    photographerToDisplay.portrait,
    photographerToDisplay.price,
    photographerToDisplay.tagline,
    tags,
    uiNode
  );

  photographer.displayPhotographerHeader();

};

// * End
// **************************
