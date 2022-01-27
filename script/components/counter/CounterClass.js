export const createCounter = (likes, price, uiNode) => {

  const displayCounter = () => {
    uiNode.innerHTML += `
      <div class="layout__total-heart">
        <p class="count__like">${likes}</p>
        <span class="fas fa-heart"></span>
      </div>
      <p class="count__price">${price}</p>
    `;
  };

  return {
    likes,
    price,
    uiNode,
    displayCounter
  };

};

// * End
// **************************
