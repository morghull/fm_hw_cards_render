'use stricts';

function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({
  target,
  target: {
    dataset: { id, photowrapperid, initialsid },
  },
}) {
  document.getElementById(photowrapperid).append(target);
  document.getElementById(initialsid).classList.add('hidden');
}

function handleCardClick({
  target,
  target: {
    dataset: { id },
  },
}) {
  const card = document.getElementById(`card${id}`);
  const isSelected = card.getAttribute('selected');
  if (isSelected) {
    card.removeAttribute('selected');
    card.classList.remove('selected');
  } else {
    card.setAttribute('selected', 'true');
    card.classList.add('selected');
  }
}

const createCard = (
  { id, firstName, lastName, profilePicture, contacts },
  cardIdPrefix
) => {
  const initials = getInitials(firstName, lastName);
  const cardId = `${cardIdPrefix}${id}`;
  const cardPhotoWrapperId = `cardPhotoWrapper${id}`;
  const cardInitialsId = `initials${id}`;
  const attributesForSelection = {
    ['data-id']: id,
    ['data-cardid']: cardId,
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
      events: {
        click: handleCardClick,
      },
    },
    createElement(
      'div',
      {
        classNames: ['cardPhotoWrapper'],
        attributes: { id: cardPhotoWrapperId, ...attributesForSelection },
        events: {
          click: handleCardClick,
        },
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
          click: handleCardClick,
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
          events: {
            click: handleCardClick,
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
