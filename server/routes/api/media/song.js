// const co = require('co');
const { request } = require('utils');
const rp = require('request-promise');
const lrcParser = require('lrc-parser');

module.exports = async function getSong(req, res, next) {
  const { name, id } = req.query;
  // co(function* () {
  try {
    const html = await request(`https://mp3.zing.vn/bai-hat/${name}/${id}.html`);
    let regex = /media\/get-source\?type=(audio|video)&key=(.{33})/; // get the resouce url
    let match = html.match(regex);

    if (!match) {
      throw new Error("can't find the resource URL")
    }
    
    const resource = await request(`https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${match[2]}`);
    let data = JSON.parse(resource).data;

    // data.lyric now is a url
    if (!data.lyric.trim()) {
      data.lyric = [];
    }
    else{
      const lrcFile = await request(data.lyric);
      data.lyric = lrcParser(lrcFile).scripts;
    }
    res.json(data)
    // res.json({url: `https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${match[2]}`})

  }
  catch(err){
    next(err);
  }







  // co(function* () {
  //   const html = yield request(`https://mp3.zing.vn/bai-hat/${name}/${id}.html`);
  //   const regex = /media\/get-source\?type=audio&key=.{33}/; // get the resouce url
  //   const match = html.match(regex);
  //   if (!match) throw new Error("can't find the resource URL");

  //   const [matchUrl] = match;
  //   const resource = yield request(`https://mp3.zing.vn/xhr/${matchUrl}`);
  //   const data = JSON.parse(resource).data;
  //   // data.lyric now is a url
  //   if (!data.lyric.trim()) {
  //     data.lyric = []; // rewrite the {string} url to an array
  //     return data;
  //   }

  //   const lrcFile = yield request(data.lyric);
  //   data.lyric = lrcParser(lrcFile).scripts;
  //   return data;
  // })
  // .then(data => res.json(data))
  // .catch(err => next(err));
};
