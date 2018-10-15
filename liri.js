//import modules
var envv = require("dotenv").config();
var keys = require("./key.js");
var parameterArray = [];

var spotify = new Spotify(keys.spotify);


process.argv.forEach(element => {
    parameterArray.push(element);
});

console.log(spotify);