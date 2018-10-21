//include dotenv use process.env + .env variable.
require('dotenv').config();

let loopPrevent = 0;
//get info about objects
const util = require('util');

const comma = ',';

//include my keys
const keys = require('./key');

//include moment module for formatting date
const moment = require('moment')

//include spotify
const Spotify = require('node-spotify-api');

//sets spotify parameters.
const spotify = new Spotify({
  id: keys.myKeys.spotID,
  secret: keys.myKeys.spotSECRET
});
 
function getSpotify(argument){
  spotify
  .search({ type: 'track', query: argument, limit: 20})
  .then(function(response) {
    
    if( response.tracks.total === 0 && loopPrevent === 0 ) {
      console.log("Sorry I couldn't find anything. How about some Ace of Bass ?");
      loopPrevent = 1;
      getSpotify("Ace of Base");
    return;
    }
    else {
      if( loopPrevent === 0) {
        console.log("Okay, here's what I found:\n");
      }
      console.log(response.tracks.items[0].album.artists[0].name)
      console.log(response.tracks.items[0].name);
      console.log(response.tracks.items[0].album.name);
      console.log(response.tracks.items[0].preview_url);
    }
  })
  .catch(function(err) {
    console.log(err);
  });

}


//include request module
const request = require('request');

function getBands(argument){
  let bandsURL = "https://rest.bandsintown.com/artists/" + argument + "/events?app_id=" + keys.myKeys.bandsKEY + "";
  request(bandsURL, function (error, response, body) {
    if(error){
      console.log("I'm sorry, I couldn't find anything.");
      console.log('error:', error); // Print the error if one occurred
      console.log("statusCode: " , response && respnse.statusCode);
    }
    else {
      let concert = JSON.parse(body)[0].venue.name;
      let concertDate = JSON.parse(body)[0].datetime;
      let ticketsUrl = JSON.parse(body)[0].offers[0].url; 
      concertDate = moment(concertDate).format('LLLL');
      console.log("It looks like " + argument + " is playing at the " + concert + " on " + concertDate + " ." );
      console.log("\n you can get tickets at " + ticketsUrl + " ."); 
      //console.log(util.inspect(JSON.parse(body)[0], false, null, true /* enable colors */))
    }
  });
}

//OMDB url
const film = "Sneakers";
const omdbURL = "http://www.omdbapi.com/?t=" + film + "&apikey=" + keys.myKeys.omdbKEY;




/**
 *  EXECUTION CODE
 * 
 */

startCLI();

//Function for taking in arguments and executing various api calls, combines additional parameters into an array and converts to string.
function startCLI(){
  const parameterArray = [];
  process.argv.forEach(element => {
      parameterArray.push(element);
  });

  const command = parameterArray[2];
  let temp;
  if (parameterArray.length > 3){
    let convertArray = [];
    for(let i = 3; i < parameterArray.length; i++ ){
      convertArray.push(parameterArray[i]);
    }  
    temp = convertArray.toString();   //turn additional arguments into a string
    temp = temp.replace(/,/g," ");    //scrub commas
  }
  else{
    temp = parameterArray[3];         
  }
  
  const argument = temp;

  console.log(argument);

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
    case 'concert-this':
    getBands(argument);
    break;
    default :
    console.log("I'm sorry, that's not a command I recognize, try running one of the following commands:\n****\nspotify-this-song [track you'd like to listen to]\ne.g. spotify-this-song All the Small Things\n****\nconcert-this [bandname]\ne.g. concert-this Metallica\n****\nmovie-this [movie]\ne.g movie-this Robocop\n***\ndo-what-it-says\nThis will read from the random.txt");
  }
}