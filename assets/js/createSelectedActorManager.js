'use strict';

const cteateSelectedActorManager = (contanerId) => {
  const selectedActors = new Map();
  const container = document.getElementById(contanerId);
  const barIdPrefix = 'bar';

  const handlerDelete = (id) => {
    if (!id) return;
    selectedActors.delete(id);
    document.getElementById(`${barIdPrefix}${id}`).remove();
  };

  return {
    add: (id, name) => {
      selectedActors.set(id, name);
      const actorBar = createActorBar(id, name, barIdPrefix);
      container.append(actorBar);
      actorBar.querySelector('button').addEventListener(
        'click',
        ({
          target: {
            dataset: { barid },
          },
        }) => (handlerDelete(barid))
      );
    },
    delete: (id) => handlerDelete(id),
    has: (id) => selectedActors.has(id),
    reset: () => {},
    getSelectedActors: () => selectedActors,
  };
};
