'use strict';

const cteateSelectedActorManager = ({
  actors,
  cardsContainerId,
  barsContainerId,
}) => {
  const selectedActors = new Map();
  const cardsContainer = document.getElementById(cardsContainerId);
  const barsContainer = document.getElementById(barsContainerId);
  const cardIdPrefix = 'card';
  const barIdPrefix = 'bar';

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
    if (isSelected && hasActor(id)) deselectActor(id);
    else if (!isSelected && !hasActor(id)) selectActor(id, name);
  };

  const selectActor = (id, name) => {
    selectedActors.set(id, name);
    const props = { id, name, barIdPrefix };
    const actorBar = createBar(props);
    barsContainer.append(actorBar);
    actorBar.querySelector('button').addEventListener(
      'click',
      ({
        target: {
          dataset: { id },
        },
      }) => handlerCardSelection(id)
    );
  };
  const deselectActor = (id) => {
    if (!id) return;
    selectedActors.delete(id);
    document.getElementById(`${barIdPrefix}${id}`).remove();
  };
  const hasActor = (id) => selectedActors.has(id);

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
    cardsContainer.append(card);
  });
};
