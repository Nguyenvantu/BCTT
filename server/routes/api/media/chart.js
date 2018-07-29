const { request } = require('utils');
const PageScraper = require('../../../lib/PageScraper');

module.exports = function (req, res, next) {
  const { id } = req.params;

  request(`http://mp3.zing.vn/json/charts?op=get&type=song&id=${id}`)
    .then(data => {
      // redisClient.set(getRedisKey(req), data, 'EX', 60 * 60 * 24 * 5);
      res.json(JSON.parse(data));
    })
    .catch(err => next(err));
};

// pop: 'IWZ9Z0BW'
// kpop: 'IWZ9Z0BO'
// vpop: 'IWZ9Z08I'
// module.exports = function (req, res, next) {
//   const { id } = req.params;
//   let alias = '';
//   switch(id){
//     case 'IWZ9Z0BW': alias = 'Bai-hat-US-UK';break;
//     case 'IWZ9Z0BO': alias = 'Bai-hat-KPop';break;
//     default: alias = 'Bai-hat-Viet-Nam';
//   }
//   request(`https://mp3.zing.vn/zing-chart-tuan/${alias}/${id}.html`)
//     .then(html => {
//       const parser = new PageScraper(html);

//       parser
//         .list('li.group div.po-r')
//         .setKey('data')
//         .extractAttr('src', '.e-item a > img', 'thumbnail')
//         .extractAttr('text', '.e-item h3 > a', 'name')
//         .extractAttr('id', 'span.statistics', 'ids', string => {
//           return string.replace('item-ranking-', '');
//         })
//         .extractList('element', '.e-item .ellipsis h4 a', 'artistName')
      
//       // html = parser.$('.tracking-page-session').html();
      
//       // result.data = result.data.map((origin, index) => {
//       //     const innerParser = new PageScraper(html);
//       //     // rewrite the parser elements
//       //     innerParser.elements = parser.list('.inblock ellipsis').elements.eq(index).find('h4').each(());
//       //     innerParser
//       //       .setKey('artists') // the key will be artists
//       //       .extractAttr('src', 'img', 'thumb')
//       //       .extractAttrs(['href', 'text'], 'a.txt-primary', ['link', 'name']);
  
//       //     return Object.assign(origin, innerParser.get());
//       //   });
//       //   // .list('.e-item .ellipsis h4')
//       //   .setKey('artists')
//       //   .extractAttrs(['text', 'href'], '.e-item .ellipsis h4 a', ['name', 'link'])

//       res.json(parser.get());
//     })
//     .catch(err => next(err));
// };