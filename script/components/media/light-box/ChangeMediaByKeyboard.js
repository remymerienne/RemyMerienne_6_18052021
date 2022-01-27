export const changeMediaByKeyboard = (data, mediaInLightBox) => {

  const uiNodeToInjectMedia = document.querySelector('.box-media');
  const uiNavButton = document.querySelectorAll('span.box-button');
  const uiNodeToInjectLegend = document.querySelector('.box-media__legend');
  const photoToResize = [342550, 9025895, 92758372, 32958383, 87367293, 73852953, 23394384, 398847109];
  const photographerId = window.location.search.slice(1);
  const allMedia = data.media.filter(p => p.photographerId == photographerId);

  let shortName = data.photographers.filter(p => p.id == photographerId);
  shortName = shortName[0].name.split(' ').shift();

  uiNavButton.forEach(element => {

    element.addEventListener('keydown', (e) => {

      let mediaPosition = allMedia.indexOf(mediaInLightBox);

      if (e.target.className == 'fas fa-chevron-right box-button' && (e.key === 'Enter' || e.code === 'Space')) {

        e.preventDefault();
        mediaPosition = mediaPosition === allMedia.length - 1 ? 0 : mediaPosition + 1;
        mediaInLightBox = allMedia[mediaPosition];

      } else if (e.target.className == 'fas fa-chevron-left box-button' && (e.key === 'Enter' || e.code === 'Space')) {

        e.preventDefault();
        mediaPosition === 0 ? mediaPosition = allMedia.length - 1 : mediaPosition = mediaPosition - 1;
        mediaInLightBox = allMedia[mediaPosition];
      }

      if (Object.keys(mediaInLightBox)[3] == 'image') {

        const mediaUrl = `Sample-Photos/${shortName}/${mediaInLightBox.image}`;

        if (photoToResize.includes(mediaInLightBox.id)) {

          uiNodeToInjectMedia.innerHTML = `<img class="box-media__img resizeImg" src="./images/${mediaUrl}" alt="">`;
          uiNodeToInjectMedia.classList.add('resize');

        } else {

          uiNodeToInjectMedia.innerHTML = `<img class="box-media__img" src="./images/${mediaUrl}" alt="">`;

        }

      } else if (Object.keys(mediaInLightBox)[3] == 'video') {

        const mediaUrl = `Sample-Photos/${shortName}/${mediaInLightBox.video}`;

        uiNodeToInjectMedia.innerHTML = `  
          <video controls>
            <source src="./images/${mediaUrl}" type="video/mp4">
            <track kind="captions" src="./images/subtitleFR.vtt" label="french" srclang="fr">
            <track kind="captions" src="./images/subtitleEN.vtt" label="english" srclang="en">
            Le fichier vidéo ne peut pas être lu
          </video>
        `;

      }

      const legend = mediaInLightBox.title;
      uiNodeToInjectLegend.textContent = legend;

    });

  });

};

// * End
// **************************
