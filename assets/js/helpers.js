'use strict';

const socialsClassNames = new Map()
  .set('www.facebook.com', 'facebook')
  .set('twitter.com', 'twitter')
  .set('www.instagram.com', 'instagram');

function getInitials(fname, lname) {
  if (fname && lname) return fname[0].toUpperCase() + lname[0].toUpperCase();
  return 'UN';
}

function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}
