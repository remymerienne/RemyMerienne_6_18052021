import { createMediaFactory } from './MediaClass';
import { listenSortingChoice, sortByDate, sortByPopularity, sortByTitle } from './SortMedia';

export const buildMedia = (data) => {

  listenSortingChoice();

  const sortChoice = localStorage.getItem('sorting');
  const id = window.location.search.slice(1);

  let mediaToDisplay;
  
  let shortName = data.photographers.filter(p => p.id == id);
  shortName = shortName[0].name.split(' ').shift();

  if (sortChoice === null) {

    mediaToDisplay = data.media.filter(p => p.photographerId == id);

  } else if (sortChoice === 'date') {

    mediaToDisplay = data.media.filter(p => p.photographerId == id);
    mediaToDisplay = mediaToDisplay.sort(sortByDate);

  } else if (sortChoice === 'popularité') {

    mediaToDisplay = data.media.filter(p => p.photographerId == id);
    mediaToDisplay = mediaToDisplay.sort(sortByPopularity);

  } else if (sortChoice === 'titre') {

    mediaToDisplay = data.media.filter(p => p.photographerId == id);
    mediaToDisplay = mediaToDisplay.sort(sortByTitle);

  }

  for (let i in mediaToDisplay) {

    const mediaToFactory = mediaToDisplay[i];

    const mediaFactory = createMediaFactory(mediaToFactory, shortName);

    const media = mediaFactory.setMedia();

    media.displayMedia();

  }

};

// * End
// **************************
