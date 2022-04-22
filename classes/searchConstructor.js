const { v4: uuidv4 } = require('uuid');

class SearchResult {
  constructor(wikiData, tripMap) {
    this.name = wikiData.title;
    this.id = uuidv4();
    this.coordinates = [wikiData.coordinates.lat, wikiData.coordinates.lon];
    this.adress = {
      city: tripMap[0].location.locality,
      zipcode: tripMap[0].location.postcode,
      street: tripMap[0].location.cross_street,
      region: tripMap[0].location.region,
    };
    this.img = wikiData.thumbnail.source;
    this.wikiLink = wikiData.content_urls.desktop.page;
    this.description = wikiData.extract;
  }
}

module.exports = SearchResult;
