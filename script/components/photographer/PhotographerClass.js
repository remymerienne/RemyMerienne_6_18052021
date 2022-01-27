export const createPhotographer = (city, country, id, name, portrait, price, tagline, tags, uiNode) => {

  const displayPhotographerThumbnail = () => {
    uiNode.innerHTML += `  
      <section class="thumbnail">
        <a class="layout__photo-name" href="photographer.html?${id}" aria-labelledby="${id}">
          <div class="thumbnail__portrait">
            <img src="./images/Sample-Photos/Photographers-ID-Photos/${portrait}` + '"' + `alt="">
          </div>
          <h2 class="thumbnail__name" id="${id}">${name}</h2>
        </a>
        <div class="thumbnail__location">
          <p class="thumbnail__location--city">${city}</p>
          <p class="thumbnail__location--country">${country}</p>
        </div>
        <p class="thumbnail__tagline">${tagline}</p>
        <p class="thumbnail__price">${price}</p>
        <div class="thumbnail__tags">
          ${tags}
        </div>
      </section>
    `;
  };

  const displayPhotographerHeader = () => {
    uiNode.innerHTML += `  
      <section class="photographer">
        <div class="layout__container">
          <div class="layout__title-button">
            <h2 class="photographer__title">${name}</h2>
            <button class="button photographer__contact" type="button">Contactez-moi</button>
          </div>
          <div class="photographer__location">
            <p class="city">${city}</p>
            <p class="country">${country}</p>
          </div>
          <p class="photographer__tagline">${tagline}</p>
          <div class="photographer__tags">
            ${tags}
          </div>
        </div>
        <div class="photographer__portrait">
          <img src="./images/Sample-Photos/Photographers-ID-Photos/${portrait}" alt="">
        </div>
      </section>
      <div class="count">
      </div>
      <div class="production">
        <div class="production__navigation">
          <p id="sort-by" class="production__navigation-paragraph">Trier par</p>
          <button class="button production__navigation-trigger" aria-labelledby="sort-by" aria-haspopup="listbox" aria-expanded="false" type="button">Popularité</button>
          <ul class="production__navigation-optionslist" role="listbox">
            <li id="option-popularite" class="button item item--first js-sorting" tabindex="0" role="option">Popularité</li>
            <li id="option-date" class="button item js-sorting" tabindex="0" role="option">Date</li>
            <li id="option-titre" class="button item js-sorting" tabindex="0" role="option">Titre</li>
          </ul>
        </div>
        <div class="production__photo">
        </div>
      </div>
    `;
  };

  return {
    city, 
    country, 
    id, 
    name, 
    portrait, 
    price, 
    tagline, 
    tags, 
    uiNode,
    displayPhotographerThumbnail,
    displayPhotographerHeader
  };

};

// * End
// **************************
