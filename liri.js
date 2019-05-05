// add code to read & set any environment var with dotenv package
require("dotenv").config();
// import the keys.js file then store it into a var
var keys = require("./keys.js");
//require axios
var axios = require('axios')
//need for the npm spotify api to work
var Spotify = require('node-spotify-api')
// bandsintown request
// var concert = require('concert')
//movie request
var request = require('request')
//will be used for the do-what-it-says case
var fs = require('fs')
var input = process.argv
//will process the users first input after the filename
var search = input[2];
//in case your response has multiple words
var term = input.slice(3).join(" ");

switch(search) {
    case 'concert-this':
    console.log('*Loading concerts near you*')
    bands(term)
    break;
    case 'spotify-this-song':
    console.log('*Loading song info*')
    spotify(term);
    break;
    case 'movie-this':
    console.log('*Loading movie info*')
    movie(term)
    break;
    case 'do-what-it-says':
    console.log('placeholder what')
}

function bands(term) {
    var URL = `https://rest.bandsintown.com/artists/${term}/events?app_id=codingbootcamp`

    request(URL, function(error, response, body) {
        //If no term is provided input Mr Nobody as the term
        if (!term) {
            term = 'Earl Sweatshirt';
        }
        //if there is a term then display
        if(!error && response.statusCode === 200) {
        console.log("Venue Name: " + JSON.parse(body).url);

        }
    })

}

// function for the spotify call, taken from documentation
function spotify(term) {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: term }, function(err,data) {
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

//function for calling the omdb api
function movie(term) {
    var URL = `http://www.omdbapi.com/?t=${term}&y=&plot=short&apikey=d8f8789e`;

    axios.get(URL).then(function (response) {
        var jsonData = response.data
        console.log("Title: " + jsonData.Title)
        console.log("Release Date: " + jsonData.Released)
        console.log("IMDB Rating: " + jsonData.imdbRating)
        console.log("Rotten Tomatoe Rating: " + jsonData.Ratings[1].Value)
        console.log("Country: " + jsonData.Country)
        console.log("Language: " + jsonData.Language)
        console.log("Plot: " + jsonData.Plot)
        console.log("Actors: " + jsonData.Actors)
    })

}