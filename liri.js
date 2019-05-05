// add code to read & set any environment var with dotenv package
require("dotenv").config();
// import the keys.js file then store it into a var
var keys = require("./keys.js");
//need for the npm spotify api to work
var Spotify = require('node-spotify-api')
//will be used for the do-what-it-says case
var fs = require('fs')
var input = process.argv
//will process the users first input after the filename
var command = input[2];
//in case your response has multiple words
var Inputname = input.slice(3).join(" ");
// var Concert = require()



switch(command) {
    case 'concert-this':
    console.log('concerts')
    break;
    case 'spotify-this-song':
    console.log('Loading song info')
    spotify(Inputname);
    break;
    case 'movie-this':
    console.log('movie')
    break;
    case 'do-what-it-says':
    console.log('placeholder what')
}
// function for the spotify call, taken from documentation
function spotify(Inputname) {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: Inputname }, function(err,data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return
        }
        //parse the data given by the api
        jsonData = data.tracks.items
        //displays the information using the parsed jsonData
        console.log("Artist(s): " + jsonData[0].artists[0].name);
        console.log("Song Name: " + jsonData[0].name);
        console.log("Preview Link: " + jsonData[0].preview_url);
        console.log("Album: " + jsonData[0].album.name);

    });
}