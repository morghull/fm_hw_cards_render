'use strict';

const cteateSelectedActorManager = (contanerId, handlerCardSelection) => {
  const selectedActors = new Map();
  const container = document.getElementById(contanerId);
  const barIdPrefix = 'bar';

  return {
    add: (id, name) => {
      selectedActors.set(id, name);
      const actorBar = createActorBar(id, name, barIdPrefix);
      container.append(actorBar);
      actorBar.querySelector('button').addEventListener(
        'click',
        ({
          target: {
            dataset: { id },
          },
        }) => handlerCardSelection(id)
      );
    },
    delete: (id) => {
      if (!id) return;
      selectedActors.delete(id);
      document.getElementById(`${barIdPrefix}${id}`).remove();
    },
    has: (id) => selectedActors.has(id),
    reset: () => {},
    getSelectedActors: () => selectedActors,
  };
};
