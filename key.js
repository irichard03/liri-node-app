
console.log('this is loaded');

var myKeys = {
  spotID: process.env.SPOTIFY_ID,
  spotSECRET: process.env.SPOTIFY_SECRET,
  omdbKEY: process.env.OMDB_KEY
}

module.exports = myKeys;

