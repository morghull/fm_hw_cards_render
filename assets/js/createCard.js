'use stricts';

function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({
  target,
  target: {
    dataset: { photowrapperid, initialsid },
  },
}) {
  document.getElementById(photowrapperid).append(target);
  document.getElementById(initialsid).classList.add('hidden');
}

const createCard = (
  { id, firstName, lastName, profilePicture, contacts },
  { cardIdPrefix}
) => {
  const initials = getInitials(firstName, lastName);
  const cardId = `${cardIdPrefix}${id}`;
  const cardPhotoWrapperId = `cardPhotoWrapper${id}`;
  const cardInitialsId = `initials${id}`;
  const attributesForSelection = {
    ['data-id']: id,
  };
  return createElement(
    'article',
    {
      classNames: ['card'],
      attributes: {
        id: cardId,
        ['data-name']: `${firstName} ${lastName}`,
        ...attributesForSelection,
      },
    },
    createElement(
      'div',
      {
        classNames: ['cardPhotoWrapper'],
        attributes: { id: cardPhotoWrapperId, ...attributesForSelection },
      },
      createElement('img', {
        classNames: ['cardPhoto'],
        attributes: {
          src: profilePicture,
          alt: initials,
          ['data-photowrapperid']: cardPhotoWrapperId,
          ['data-initialsid']: cardInitialsId,
          ...attributesForSelection,
        },
        events: {
          error: handleImageError,
          load: handleImageLoad,
        },
      }),
      createElement(
        'span',
        {
          classNames: ['initials'],
          attributes: {
            id: cardInitialsId,
            style: `background-color: ${stringToColour(initials)}`,
            ...attributesForSelection,
          },
        },
        initials
      )
    ),
    createElement(
      'div',
      { classNames: ['cardName'], attributes: { ...attributesForSelection } },
      `${firstName} ${lastName}`
    ),
    createElement(
      'ul',
      {
        classNames: ['cardContacts'],
        attributes: { ...attributesForSelection },
      },
      ...contacts.map((contact) => {
        return createElement(
          'li',
          { classNames: ['contactWrapper'] },
          createElement('a', {
            classNames: [
              'contact',
              socialsClassNames.get(new URL(contact).hostname),
            ],
            attributes: { href: contact },
          })
        );
      })
    )
  );
};
