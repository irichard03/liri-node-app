//import modules
require("dotenv").config(); //what does this do?
var keys = require("./key.js");

//assign process argument values to an array.
var parameterArray = [];
process.argv.forEach(element => {
    parameterArray.push(element);
});

//Create Spotify object
var spotify = new Spotify(keys.spotify);


console.log(spotify);