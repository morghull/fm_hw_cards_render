/**
 *
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames
 * @param {object} options.attributes
 * @param {object} options.events
 * @param  {...Node[]} children
 * @returns
 */
function createElement(
  type = div,
  { classNames = [], attributes = {}, events = {} } = {},
  ...children
) {
  const elem = document.createElement(type);
  if (classNames) elem.classList.add(...classNames);
  if (attributes)
    for (const [attrName, attrValue] of Object.entries(attributes)) {
      elem.setAttribute(attrName, attrValue);
    }
  if (events)
    for (const [eventType, eventHandler] of Object.entries(events)) {
      elem.addEventListener(eventType, eventHandler);
    }
  elem.append(...children);
  return elem;
}
