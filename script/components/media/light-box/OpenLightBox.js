export const openLightBox = (e, data) => {
 
  const uiNodeLightWrapping = document.querySelector('.light-wrapping');
  const uiNodeToInjectMedia = document.querySelector('.box-media');
  const uiNodeToInjectLegend = document.querySelector('.box-media__legend');

  const mediaName = e.target.currentSrc.split('/').pop();
  const Photoid = e.target.dataset.photoId;
  const photographerId = window.location.search.slice(1);
  const allMedia = data.media.filter(p => p.photographerId == photographerId);
  const photoToResize = [342550, 9025895, 92758372, 32958383, 87367293, 73852953, 23394384, 398847109];

  let mediaUrl = e.target.currentSrc.split('images/').pop();
  let mediaInLightBox;

  uiNodeLightWrapping.style.display = 'flex';
  document.querySelector('.page').style.position = 'fixed';
  document.querySelector('.light-box').focus();

  if (Object.keys(e.target.dataset)[0] === 'photoId') {

    mediaInLightBox = allMedia.filter(p => p.image == mediaName)[0];
    if (photoToResize.includes(Number(Photoid))) {
      uiNodeToInjectMedia.innerHTML = `<img class="box-media__img resizeImg" src="./images/${mediaUrl}" alt="">`;
      uiNodeToInjectMedia.classList.add('resize');
    } else {
      uiNodeToInjectMedia.innerHTML = `<img class="box-media__img" src="./images/${mediaUrl}" alt="">`;
    }

    const legend = mediaInLightBox.title;
    uiNodeToInjectLegend.textContent = legend;

    return mediaInLightBox;

  } else if (Object.keys(e.target.dataset)[0] === 'videoId') {

    mediaInLightBox = allMedia.filter(p => p.video == mediaName)[0];
    uiNodeToInjectMedia.innerHTML = `  
      <video controls>
        <source src="./images/${mediaUrl}" type="video/mp4">
        <track kind="captions" src="./images/subtitleFR.vtt" label="french" srclang="fr">
        <track kind="captions" src="./images/subtitleEN.vtt" label="english" srclang="en">
        Le fichier vidéo ne peut pas être lu
      </video>
    `;

    const legend = mediaInLightBox.title;
    uiNodeToInjectLegend.textContent = legend;

    return mediaInLightBox;

  }
  
};

// * End
// **************************
