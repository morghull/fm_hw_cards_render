'use strict';

const container = document.getElementById('cardsContainer');
const idSelectedCardsContainer = 'selectedCardsWrapper';
const selectedActorManager = cteateSelectedActorManager(
  idSelectedCardsContainer
);

const handlerCardClick = ({
  target: {
    dataset: { cardid },
  },
}) => {
  if (!cardid) return;
  const card = document.getElementById(cardid);
  const { id, name } = card.dataset;
  const selected = card.getAttribute('selected');
  console.log(id, name, selected);
  if (selected && !selectedActorManager.has(id))
    selectedActorManager.add(id, name);
  else if (!selected && selectedActorManager.has(id))
    selectedActorManager.delete(id);
  console.log(selectedActorManager.getSelectedActors());
};

const getActorsCards = () => {
  fetch('./assets/data/data.json')
    .then((response) => response.json())
    .then((actors) =>
      actors.map((actor) => {
        const card = createCard(actor);
        card.addEventListener('click', handlerCardClick);
        container.append(card);
      })
    );
};
getActorsCards();
