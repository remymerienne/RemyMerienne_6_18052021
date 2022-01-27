import { buildThumbnail } from './components/photographer/ThumbnailConstructor';
import { buildHeader } from './components/photographer/HeaderConstructor';
import { buildMedia } from './components/media/MediaConstructor';
import { manageSortListBehavior } from './components/media/SortMedia';
import { buildCounter } from './components/counter/CounterConstructor';
import { currentPage, listenChosenTag, goToMain } from './components/functions'; 
import { updateLikes } from './components/media/LikesCounter';
import { displayLightBox } from './components/media/light-box/LightBox';
import { displayModal } from './components/photographer/modal';

(async () => {

  // await fetch('http://127.0.0.1:5500/data_base.json');
  await fetch('https://remymerienne.github.io/RemyMerienne_6_18052021/data_base.json')

    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('Mauvaise réponse du réseau');
      }
    })

    .then(data => {

      if (currentPage() === 'index.html') {

        buildThumbnail(data);

      } else if (currentPage() === 'photographer.html') {

        buildHeader(data);
        buildMedia(data);
        buildCounter(data);
        updateLikes(data);
        displayLightBox(data);
        displayModal(data);

        manageSortListBehavior();

      }

      listenChosenTag();
      goToMain();

    })

    .catch(error => console.log(`Erreur avec le message : ${error}`));

})();

// * End
// **************************
