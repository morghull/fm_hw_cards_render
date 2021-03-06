'use strict';

const cardsContainerId = 'cardsContainer';
const barsContainerId = 'barsContainer';
let selectedActorManager = null;

const getActorsCards = () => {
  fetch('./assets/data/data.json')
    .then((response) => response.json())
    .then((actors) => {
      const props = { actors, cardsContainerId, barsContainerId };
      selectedActorManager = cteateSelectedActorManager(props);
    })
    .catch((err) => {
      const props = { err, errorContainerId: cardsContainerId };
      createError(props);
    });
};
getActorsCards();
