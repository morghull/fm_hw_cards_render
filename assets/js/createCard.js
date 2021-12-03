'use stricts';

function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({
  target,
  target: {
    dataset: { id },
  },
}) {
  document.getElementById(`cardPhotoWrapper${id}`).append(target);
  document.getElementById(`initials${id}`).classList.add('hidden');
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

const createCard = ({ id, firstName, lastName, profilePicture, contacts }) => {
  const initials = getInitials(firstName, lastName);
  return createElement(
    'article',
    {
      classNames: ['card'],
      attributes: {
        id: `card${id}`,
        ['data-id']: id,
        ['data-name']: `${firstName} ${lastName}`,
      },
      events: {
        click: handleCardClick,
      },
    },
    createElement(
      'div',
      {
        classNames: ['cardPhotoWrapper'],
        attributes: { id: `cardPhotoWrapper${id}`, ['data-id']: id },
        events: {
          click: handleCardClick,
        },
      },
      createElement('img', {
        classNames: ['cardPhoto'],
        attributes: { src: profilePicture, alt: initials, ['data-id']: id },
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
            id: `initials${id}`,
            style: `background-color: ${stringToColour(initials)}`,
            ['data-id']: id,
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
      { classNames: ['cardName'], attributes: { ['data-id']: id } },
      `${firstName} ${lastName}`
    ),
    createElement(
      'ul',
      { classNames: ['cardContacts'] },
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
