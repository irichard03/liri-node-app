//include dotenv use process.env + .env variable.
require('dotenv').config();

//include my keys
const keys = require('./key');

//include spotify
const Spotify = require('node-spotify-api');

//this makes me sad.
const spotify = new Spotify({
  id: keys.myKeys.spotID,
  secret: keys.myKeys.spotSECRET
});
 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response.tracks);
  })
  .catch(function(err) {
    console.log(err);
  });


//include request module
const request = require('request');

//include moment module
const moment = require('moment');

//OMDB url
const film = "Sneakers";
const omdbURL = "http://www.omdbapi.com/?t=" + film + "&apikey=" + keys.myKeys.omdbKEY;




/**
 *  EXECUTION CODE
 * 
 */

startCLI();

//Function for taking in arguments and executing various api calls.
function startCLI(){
  const parameterArray = [];
  process.argv.forEach(element => {
      parameterArray.push(element);
  });

  const command = parameterArray[2];
  const arg1 = parameterArray[3];
  const arg2 = parameterArray[4];
  console.log(command);
  console.log(arg1);
  console.log(arg2);
  console.log(keys.omdbKEY);
  console.log(keys.spotID);
  console.log(keys.spotSECRET);
}
