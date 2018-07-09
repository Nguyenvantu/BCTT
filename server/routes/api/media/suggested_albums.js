const { request } = require('utils');
const Scraper = require('lib/PageScraper');

module.exports = function getSuggestedAlbums(req, res, next) {
  const { id } = req.query;
  const url = `https://mp3.zing.vn/xhr/recommend?target=%23block-recommend&count=15&start=0&type=album&id=${id}`
  request(url)
    .then(body => {
      res.json(JSON.parse(body).data.items);
    })
    .catch(err => next(err));
};
