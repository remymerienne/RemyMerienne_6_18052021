// = Fonctions :
// ==========================

const setDataToUpdate = (e, data) => {

  if (Object.keys(e.target.dataset)[0] === 'photoId') {

    const likedPhoto = e.target.dataset.photoId;
    let mediaToBeLiked = data.media.filter(p => p.id == likedPhoto);
    mediaToBeLiked = mediaToBeLiked[0];

    const dataToUpdate = {
      id: mediaToBeLiked.id,
      photographerId: mediaToBeLiked.photographerId,
      title: mediaToBeLiked.title,
      image: mediaToBeLiked.image,
      tags: mediaToBeLiked.tags,
      likes: mediaToBeLiked.likes += 1,
      date: mediaToBeLiked.date,
      price: mediaToBeLiked.price
    };

    return dataToUpdate;

  } else if (Object.keys(e.target.dataset)[0] === 'videoId') {

    const likedVideo = e.target.dataset.videoId;
    let mediaToBeLiked = data.media.filter(p => p.id == likedVideo);
    mediaToBeLiked = mediaToBeLiked[0];

    const dataToUpdate = {
      id: mediaToBeLiked.id,
      photographerId: mediaToBeLiked.photographerId,
      title: mediaToBeLiked.title,
      video: mediaToBeLiked.video,
      tags: mediaToBeLiked.tags,
      likes: mediaToBeLiked.likes += 1,
      date: mediaToBeLiked.date,
      price: mediaToBeLiked.price
    };

    return dataToUpdate;

  }
  
};

const updateByFetch = (dataToUpdate) => {
  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToUpdate)
  };
  fetch(`http://localhost:3000/media/${dataToUpdate.id}`, init)
    .catch(error => console.log(`Erreur avec le message : ${error}`));
};

// = Exécution :
// ==========================

export const updateLikes = (data) => {

  const uiNodeListened = document.querySelectorAll('.fa-heart');

  uiNodeListened.forEach(element => {

    element.addEventListener('click', (e) => {
      const dataToUpdate = setDataToUpdate(e, data);
      updateByFetch(dataToUpdate);
    });

    element.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        const dataToUpdate = setDataToUpdate(e, data);
        updateByFetch(dataToUpdate);
      }
    });

  });

};

// * End
// **************************
