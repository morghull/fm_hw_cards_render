'use strict';

const container = document.getElementById('cardsContainer');

const getActorsCards = () => {
  fetch('./assets/data/data.json')
    .then((response) => response.json())
    .then((actors) =>
      actors.map((actor) => container.append(createCard(actor)))
    );
};
getActorsCards();
