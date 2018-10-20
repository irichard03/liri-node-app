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
 
function getSpotify(argument){
  spotify
  .search({ type: 'track', query: argument, limit: 1})
  .then(function(response) {
    console.log("Okay, here's what I found:\n");
    console.log(response.tracks.items[0].album.artists[0].name)
    console.log(response.tracks.items[0].name);
    console.log(response.tracks.items[0].album.name);
    console.log(response.tracks.items[0].preview_url);
  })
  .catch(function(err) {
    console.log(err);
  });

}


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
  const argument = parameterArray[3];
  
  getCommand(command,argument);
  
  /** Debugging stuff
  console.log(command);
  console.log(arg1);
  console.log(arg2);
  console.log(keys.omdbKEY);
  console.log(keys.spotID);
  console.log(keys.spotSECRET);
   */
}

function getCommand(command,argument){
  switch(command){
    case 'spotify-this-song':
    getSpotify(argument);
    break;
    default :
    console.log("I'm sorry, that's not a command I recognize, try running one of the following commands:\n****\nspotify-this-song [track you'd like to listen to]\ne.g. spotify-this-song All the Small Things\n****\nconcert-this [bandname]\ne.g. concert-this Metallica\n****\nmovie-this [movie]\ne.g movie-this Robocop\n***\ndo-what-it-says\nThis will read from the random.txt");
  }
}