'use strict';

const cteateSelectedActorManager = ({ contanerId }) => {
  const selectedActors = new Map();
  return {
    add: (id, name) => {
      console.log(id, name);
      selectedActors.set(id, name);
    },
    delete: (id) => {
      {
        selectedActors.delete(id);
      }
    },
    has: (id) => selectedActors.has(id),
    reset: () => {},
    getSelectedActors: () => selectedActors,
  };
};
