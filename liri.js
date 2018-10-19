//include dotenv use process.env + .env variable.
require('dotenv').config();

//include my keys
const keys = require('./key');

//include spotify
var Spotify = require('node-spotify-api');


//include request module
const request = require('request');

//include moment module
const moment = require('moment');

//OMDB url
const film;
const omdbURL = "http://www.omdbapi.com/?t=" + film + "&apikey=" + keys.omdbKEY;





cliStart();



function cliStart(){
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
}
