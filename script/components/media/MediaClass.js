export const createMediaFactory = (mediaToFactory, shortName) => {

  const uiNodeToInject = document.querySelector('div.production__photo');
  const mediaType = (Object.keys(mediaToFactory))[3];

  const setMedia = () => {

    let media;

    switch (mediaType) {

      case 'image':
        media = createImage(
          mediaToFactory.price,
          shortName,
          mediaToFactory.image,
          mediaToFactory.title,
          mediaToFactory.likes,
          mediaToFactory.id,
          mediaToFactory.alt,
          uiNodeToInject
        );
        break;

      case 'video':
        media = createVideo(
          mediaToFactory.price,
          shortName,
          mediaToFactory.video,
          mediaToFactory.title,
          mediaToFactory.likes,
          mediaToFactory.id,
          uiNodeToInject
        );
        break;
    }
    return media;
  };

  return {
    mediaToFactory,
    shortName,
    setMedia
  };

  };

  const createImage = (price, shortName, image, title, likes, id, alt, uiNodeToInject) => {

    const displayMedia = () => {

      const photoToResize = [342550, 9025895, 92758372, 32958383, 87367293, 73852953, 23394384, 398847109];

      uiNodeToInject.innerHTML += `
        <figure class="production__photo-thumbnail">
          <p class="production__photo-thumbnail-price">${price}</p>
          <div ${photoToResize.includes(id) ? 'class="production__photo-thumbnail-bloc resize"' : 'class="production__photo-thumbnail-bloc"'}>
            <img tabindex="0" ${photoToResize.includes(id) ? 'class="resizeImg"' : ''} src="./images/Sample-Photos/${shortName}/${image}" alt="${alt}" data-photo-id="${id}">
          </div>
          <figcaption class="production__photo-thumbnail-legende">
            <p class="title">${title}</p>
            <div class="layout__like-heart">
              <p class="like">${likes}</p>
              <span class="fas fa-heart" tabindex="0" role="button" aria-label="J'aime" data-photo-id="${id}"></span>
            </div>
          </figcaption>
        </figure>
      `;

    };

    return {
      price, 
      shortName, 
      image, 
      title, 
      likes, 
      id, 
      alt, 
      uiNodeToInject,
      displayMedia
    };

  };

  const createVideo = (price, shortName, video, title, likes, id, uiNodeToInject) => {

    const displayMedia = () => {
      uiNodeToInject.innerHTML += `
        <figure class="production__photo-thumbnail">
          <p class="production__photo-thumbnail-price">${price}</p>
          <div class="production__photo-thumbnail-bloc">
            <video controls data-video-id="${id}" tabindex="0">
              <source src="./images/Sample-Photos/${shortName}/${video}" type="video/mp4">
              <track kind="captions" src="./images/subtitleFR.vtt" label="french" srclang="fr">
              <track kind="captions" src="./images/subtitleEN.vtt" label="english" srclang="en">
              Le fichier vidéo ne peut pas être lu
            </video>
          </div>
          <figcaption class="production__photo-thumbnail-legende">
            <p class="title">${title}</p>
            <div class="layout__like-heart">
              <p class="like">${likes}</p>
              <span class="fas fa-heart" tabindex="0" role="button" aria-label="J'aime" data-video-id="${id}"></span>
            </div>
          </figcaption>
        </figure>
      `;
    };

    return {
      price,
      shortName,
      video,
      title,
      likes,
      id,
      uiNodeToInject,
      displayMedia
    };

  };

// * End
// **************************
