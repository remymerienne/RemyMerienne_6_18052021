export const currentPage = () => {

  let pageName = window.location.href.split('/').pop();
  pageName = pageName.split('?').shift();

  return pageName;

};

export const listenChosenTag = () => {

  const uiNodeListened = document.querySelectorAll('div.js-tags');

  uiNodeListened.forEach(element => {

    element.addEventListener('click', e => {
      const tagChoice = e.target.innerText.toLowerCase();
      window.location = `index.html?${tagChoice}`;
    });

    element.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        let tagChoice = e.target.innerText.toLowerCase().split('\n');
        tagChoice = tagChoice[1];
        window.location = `index.html?${tagChoice}`;
      }
    });

  });

};

export const goToMain = () => {

  const uiNodeGoToMain = document.querySelector('.button-main');

  window.addEventListener('scroll', () => {

    if (window.scrollY > 400) {
      uiNodeGoToMain.style.display = 'flex';
    
    } else {
      uiNodeGoToMain.style.display = 'none';
    }
  
  });

};

// * End
// **************************
