const { request } = require('utils');
const Scraper = require('lib/PageScraper');

module.exports = function getSuggestedArtists(req, res, next) {
  const { name } = req.query;
  request(`http://mp3.zing.vn/nghe-si/${name}/bai-hat`)
    .then(html => {
      const parser = new Scraper(html);

      parser
        .list('.widget-content > ul > li')
        .setKey('data')
        .extractAttr('src', 'img', 'thumb')
        .extractAttrs(['title', 'href'], 'a', ['name', 'link'])

      res.json(parser.get());
    })
    .catch(err => next(err));
};
