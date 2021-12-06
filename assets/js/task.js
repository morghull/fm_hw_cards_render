'use strict';

const container = document.getElementById('cardsContainer');
const idSelectedCardsContainer = 'selectedCardsWrapper';

const getActorsCards = () => {
  fetch('./assets/data/data.json')
    .then((response) => response.json())
    .then((actors) =>
      actors.map((actor) =>
        container.append(createCard(actor, idSelectedCardsContainer))
      )
    );
};
getActorsCards();

const cards = document.getElementsByClassName('card');
console.log(cards);
cards.foreach((card) => {
  console.log(card);
});
