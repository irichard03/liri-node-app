//import modules
require("dotenv").config(); //what does this do?
var keys = require('./key.js');
var Spotify = require('node-spotify-api');

//assign process argument values to an array.
var parameterArray = [];
process.argv.forEach(element => {
    parameterArray.push(element);
});

// create spotify object, with the Key from the .environment file
var spotify = new Spotify({
    id: keys.id,
    secret: keys.secret
  });

  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data[0]); 
  });