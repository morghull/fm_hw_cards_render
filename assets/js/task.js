'use strict';

const container = document.getElementById('cardsContainer');
const idSelectedCardsContainer = 'selectedCardsWrapper';
const selectedActorManager = cteateSelectedActorManager('selectedCardsWrapper');
const cardIdPrefix = 'card';

const handlerCardClick = ({
  target: {
    dataset: { cardid },
  },
}) => {
  if (!cardid) return;
  const card = document.getElementById(cardid);
  const { id, name } = card.dataset;
  const selected = card.getAttribute('selected');
  if (selected && !selectedActorManager.has(id))
    selectedActorManager.add(id, name);
  else if (!selected && selectedActorManager.has(id))
    selectedActorManager.delete(id);
};

const getActorsCards = () => {
  fetch('./assets/data/data.json')
    .then((response) => response.json())
    .then((actors) =>
      actors.map((actor) => {
        const card = createCard(actor, cardIdPrefix);
        card.addEventListener('click', handlerCardClick);
        container.append(card);
      })
    );
};
getActorsCards();
