//import modules
require("dotenv").config();
var Spotify = require('node-spotify-api');

//assign process argument values to an array.
var parameterArray = [];
process.argv.forEach(element => {
    parameterArray.push(element);
});

// create spotify object, with the Key from the .environment file
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});


spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });