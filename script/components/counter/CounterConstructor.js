import { createCounter } from './CounterClass';

export const buildCounter = (data) => {

  const uiNode = document.querySelector('div.count');
  const id = window.location.search.slice(1);
  const mediaToDisplay = data.media.filter(p => p.photographerId == id);
  const priceToDisplay = data.photographers.filter(p => p.id == id);

  let totalLikes = 0;
  let price = 0;

  for (let i in mediaToDisplay) {
    totalLikes += mediaToDisplay[i].likes;
  }

  price = priceToDisplay[0].price;

  const counter = createCounter(totalLikes, price, uiNode);

  counter.displayCounter();

};

// * End
// **************************
