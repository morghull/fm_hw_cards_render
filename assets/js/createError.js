'use strict';

const createError = ({ err, errorContainerId }) => {
  if (!errorContainerId || !err) return;
  document
    .getElementById(errorContainerId)
    .append(
      createElement(
        'article',
        { classNames: ['error'] },
        createElement('h2', {classNames: ['errorTitle']}, 'Oops. Error has been occured!'),
        createElement('span', {classNames: ['errorDetails']}, err.message)
      )
    );
};
