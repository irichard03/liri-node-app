//include dotenv use process.env + .env variable.
require('dotenv').config();

//prevents infinite loops on spotify songs that aren't found.
let loopPrevent = 0;

//helper for parsing objects
const util = require('util');

//file system module
const fs = require('fs');

//import my keys
const keys = require('./key');

//import moment module for formatting date
const moment = require('moment')

//import spotify api
const Spotify = require('node-spotify-api');

//create instance of spotify object with my Id and Secret key value pairs.
const spotify = new Spotify({
  id: keys.myKeys.spotID,
  secret: keys.myKeys.spotSECRET
});
 
//getSpotify searches for a track based on argument passed int the function
function getSpotify(argument){
  spotify
  .search({ type: 'track', query: argument, limit: 20})
  .then(function(response) {
    //Prevent infinite loop if song is not recognized and ace of base is not found.
    if( response.tracks.total === 0 && loopPrevent === 0 ) {
      console.log("Sorry I couldn't find anything. How about some Ace of base ?");
      loopPrevent = 1;
      getSpotify("Ace of Base");
    return;
    }
    else {
      if( loopPrevent === 0) {
        console.log("Okay, here's what I found:\n");              //prevent awkward verbiage if i'm serving default song.
      }
      console.log(response.tracks.items[0].album.artists[0].name)
      console.log(response.tracks.items[0].name);
      console.log(response.tracks.items[0].album.name);
      console.log(response.tracks.items[0].preview_url);
      writeText("\n***Spotify Api Call***\n");
    }
  })
  .catch(function(err) {
    console.log(err);
  });

}

//include request module for bands in town api and online movie database (omdb) api calls
const request = require('request');

//get concert info based on band passed as argument
function getBands(argument){
  let bandsURL = "https://rest.bandsintown.com/artists/" + argument + "/events?app_id=" + keys.myKeys.bandsKEY + "";
  request(bandsURL, function (error, response, body) {
    if(error){
      console.log("I'm sorry, I couldn't find anything.");
      console.log('error:', error); 
      console.log("statusCode: " , response && respnse.statusCode);
    }
    else {
      let concert = JSON.parse(body)[0].venue.name;
      let concertDate = JSON.parse(body)[0].datetime;
      let ticketsUrl = JSON.parse(body)[0].offers[0].url; 
      concertDate = moment(concertDate).format('LLLL');
      console.log("It looks like " + argument + " is playing at the " + concert + " on " + concertDate + " ." );
      console.log("\n you can get tickets at " + ticketsUrl + " ."); 
      writeText("\n***Bands In Town Api Call***\n");
    }
  });
}

//Call the OMDB url
function getMovie(argument){
  let omdbURL;
  if(!argument){
    omdbURL = "http://www.omdbapi.com/?t=Mr.Nobody&apikey=" + keys.myKeys.omdbKEY;
  }
  else{
    omdbURL = "http://www.omdbapi.com/?t=" + argument + "&apikey=" + keys.myKeys.omdbKEY;
  }
  request(omdbURL, function (error, response, body) {
    if(error){
      console.log("I'm sorry, I couldn't find anything.");
      console.log('error:', error); // Print the error if one occurred
      console.log("statusCode: " , response && respnse.statusCode );
    }
    else {
      console.log("Film: " + JSON.parse( body ).Title );
      console.log("Writer(s): " + JSON.parse( body ).Writer );
      console.log("Released: " + JSON.parse( body ).Released );
      console.log("IMDB Rating: " + JSON.parse( body ).Ratings[0].Value );
      console.log("Rotten Tomatoes Rating: " + JSON.parse( body ).Ratings[1].Value );
      console.log("Produced in: " + JSON.parse( body ).Country );
      console.log("Language(s): " + JSON.parse( body ).Language );
      console.log("\nPlot: " + JSON.parse( body ).Plot );
      console.log("Starring: " + JSON.parse( body ).Actors );
      writeText("\n***Movies Api Call***\n");
    }
  });
}
//Read from random.txt, split into array and pass command and argument to get command function.
function readText(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log("I had a problem with the instructions, see below:");
      return console.log(error);
    }
    else{
      var textArray = data.split(",");
      getCommand(textArray[0],[textArray[1]]);
    }
  });
}

//Function for logging to log.txt, only takes in input and mentions api called.
function writeText(response){
  fs.appendFile("log.txt", response, function(err) {
    if (err) {
      console.log("I'm having trouble with the logs, see below:");
      return console.log(err);
    }
  });
}
//call function 
startCLI();

//Function allows user to type input, assigns 2nd process.argv to a command, and any additional prcoess.argv's to single string so you can type a song/moview with spaces.
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
  
  //call function to execute desired api request.
  getCommand(command,argument);
}

//This function feeds command parameter and argument parameter into a switch case, calling the desired api function. Default lists acceptable commands.
function getCommand(command,argument){
  let inputArray = [command,argument];
  if(!argument){
      writeText("\nCommand: " + inputArray[0] + "\nParameter: Read from Text");
  }
  else{
      writeText("\nCommand: " + inputArray[0] + "\nParameter:" + inputArray[1] + "");
  }
  
  switch(command){
   case 'spotify-this-song':
    getSpotify(argument);
    break;
    case 'concert-this':
    getBands(argument);
    break;
    case 'movie-this':
    getMovie(argument);
    break;
    case 'do-what-it-says':
    readText();
    break;
    default :
    console.log("I'm sorry, that's not a command I recognize, try running one of the following commands:\n****\nspotify-this-song [track you'd like to listen to]\ne.g. spotify-this-song All the Small Things\n****\nconcert-this [bandname]\ne.g. concert-this Metallica\n****\nmovie-this [movie]\ne.g movie-this Robocop\n***\ndo-what-it-says\nThis will read from the random.txt");
  }
}
