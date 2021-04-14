const axios = require('axios');
const cheerio = require('cheerio');

async function getParticipants(url) {
  try {
    const regexp = /(http|https):\/\/www.tinkoff.ru\/invest\/social\/profile\/(.+?)\/.+/;

    if (!regexp.test(url)) {
      return false;
    }

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const participants = [];
    const hostName = url.match(regexp)[2];

    $('div[class^="PulsePostAuthor__nicknameLink_"]').each((_idx, el) => {
      const name = $(el).text();

      if (participants.includes(name) || name === hostName) {
        return;
      }

      participants.push(name);
    });

    return participants;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getParticipants,
};
