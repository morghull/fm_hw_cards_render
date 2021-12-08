'use strict';

const container = document.getElementById('cardsContainer');
const idSelectedCardsContainer = 'selectedCardsWrapper';
const cardIdPrefix = 'card';

const handlerCardSelection = (id) => {
  if (!id) return;
  const card = document.getElementById(`${cardIdPrefix}${id}`);
  const { name } = card.dataset;
  const isSelected = card.getAttribute('selected');

  if (isSelected) {
    card.removeAttribute('selected');
    card.classList.remove('selected');
  } else {
    card.setAttribute('selected', 'true');
    card.classList.add('selected');
  }
  if (isSelected && selectedActorManager.has(id))
    selectedActorManager.delete(id);
  else if (!isSelected && !selectedActorManager.has(id))
    selectedActorManager.add(id, name);
};

const selectedActorManager = cteateSelectedActorManager(
  idSelectedCardsContainer,
  handlerCardSelection
);

const getActorsCards = () => {
  fetch('./assets/data/data.json')
    .then((response) => response.json())
    .then((actors) =>
      actors.map((actor) => {
        const props = { cardIdPrefix };
        const card = createCard(actor, props);
        card.addEventListener(
          'click',
          ({
            target: {
              dataset: { id },
            },
          }) => handlerCardSelection(id)
        );
        container.append(card);
      })
    );
};
getActorsCards();
