import { createPhotographer } from './PhotographerClass';

export const buildThumbnail = (data) => {

  localStorage.clear();

  const uiNodeToInject = document.querySelector('main.layout__main');
  const tagChoice = window.location.search.slice(1);

  let photographersToDisplay;

  if (tagChoice === '') {
    photographersToDisplay = data.photographers;
  } else {
    photographersToDisplay = data.photographers.filter(p => p.tags.includes(tagChoice) == true);
  }

  for (let i in photographersToDisplay) {

    let tags = '';
    for (let j = 0; j < photographersToDisplay[i].tags.length; j++) {
      tags += `
        <div class="js-tags" role="link" tabindex="0">
          <span class="sr-only">Tag</span>
          <span class="tag">${photographersToDisplay[i].tags[j]}</span>
        </div>
      `;
    }

    const photographer = createPhotographer(
      photographersToDisplay[i].city,
      photographersToDisplay[i].country,
      photographersToDisplay[i].id,
      photographersToDisplay[i].name,
      photographersToDisplay[i].portrait,
      photographersToDisplay[i].price,
      photographersToDisplay[i].tagline,
      tags,
      uiNodeToInject
    );

    photographer.displayPhotographerThumbnail();

  }

};

// * End
// **************************
