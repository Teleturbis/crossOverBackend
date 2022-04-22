const axios = require('axios');
require('dotenv').config();

const SearchResult = require('./searchConstructor');

async function getData(searchString) {
  const header = {
    headers: {
      Accept: 'application/json',
      Authorization: process.env.API_KEY,
    },
  };

  const arr = searchString.split(' ');

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const search = arr.join(' ');

  let initFetch = await axios.get(
    `https://api.foursquare.com/v3/autocomplete?query=${searchString}`,
    header
  );

  initFetch = initFetch.data.results.find((el) =>
    el.text.primary.includes(search)
  );

  const wiki = await axios
    .get(`https://en.wikipedia.org/api/rest_v1/page/summary/${search}`)
    .catch(() => {
      return false;
    });

  if (!wiki) return false;

  let tripMap;

  if (wiki.data.coordinates) {
    tripMap = await axios.get(
      `https://api.foursquare.com/v3/places/search?ll=${wiki.data.coordinates.lat}%2C${wiki.data.coordinates.lon}&radius=500`,
      header
    );
  } else {
    return false;
  }

  return new SearchResult(wiki.data, tripMap.data.results);
}

module.exports = { getData };
