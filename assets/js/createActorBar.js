const createActorBar = (id, name, barIdPrefix) => {
  if (!id) return;
  barIdPrefix = !barIdPrefix ? 'bar' : barIdPrefix;
  const barId = `${barIdPrefix}${id}`;
  const attributesForSelection = {
    ['data-id']: id,
  };
  return createElement(
    'div',
    { classNames: ['barWrapper'], attributes: { id: barId } },
    createElement('span', { classNames: ['barName'] }, name),
    createElement(
      'button',
      {
        classNames: ['barCloseButton'],
        attributes: { ...attributesForSelection },
      },
      'X'
    )
  );
};
