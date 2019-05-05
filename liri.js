// add code to read & set any environment var with dotenv package
require("dotenv").config();
// import the keys.js file then store it into a var
var keys = require("./keys.js");
//require axios for the omdb and bandsintown api
var axios = require('axios')
//need for the npm spotify api to work
var Spotify = require('node-spotify-api')
//will be used for the do-what-it-says case
var fs = require('fs')
var input = process.argv
//will process the users first input after the filename
var search = input[2];
//in case your response has multiple words
var term = input.slice(3).join(" ");
//switch case for the four possible choices
switch(search) {
    case 'concert-this':
    console.log('*Loading concerts near you*')
    console.log("-------------------------------------")
    concert(term)
    break;
    case 'spotify-this-song':
    console.log('*Loading song info*')
    console.log("-------------------------------------")
    spotify(term);
    break;
    case 'movie-this':
    console.log('*Loading movie info*')
    console.log("-------------------------------------")
    movie(term)
    break;
    case 'do-what-it-says':
    random()
}
//function for bandsintown api and concert search
function concert(term) {
    var URL = `https://rest.bandsintown.com/artists/${term}/events?app_id=codingbootcamp`;

    axios.get(URL).then(function (response) {
        // will display information about the first 5 venues
        for (i = 0; i<5; i++) {
        var jsonData = response.data[i]

        var concertDisplay = [
        "Venue Name: " + jsonData.venue.name,
        "Venue Location: " + jsonData.venue.city + ", " + jsonData.venue.region,
        "Date of Event: " + jsonData.datetime,
        "-------------------------------------"
        ].join('\n\n')

        fs.appendFile('log.txt', concertDisplay, function (err) {
            if (err) throw err
            console.log(concertDisplay);
        })
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
        var spotifyDisplay = [
        //displays the information using the parsed jsonData
        "Artist(s): " + jsonData[0].artists[0].name,
        "Song Name: " + jsonData[0].name,
        "Preview Link: " + jsonData[0].preview_url,
        "Album: " + jsonData[0].album.name,
        "-------------------------------------"
        ].join('\n\n')

        fs.appendFile('log.txt', spotifyDisplay, function (err) {
            if (err) throw err
            console.log(spotifyDisplay);
        })

    });
}

//function for calling the omdb api
function movie(term) {
    var URL = `http://www.omdbapi.com/?t=${term}&y=&plot=short&apikey=trilogy`;

    axios.get(URL).then(function (response) {
        //store json data in var
        var jsonData = response.data
        var movieDisplay = [
        "Title: " + jsonData.Title,
        "Release Date: " + jsonData.Released,
        "IMDB Rating: " + jsonData.imdbRating,
        "Rotten Tomatoe Rating: " + jsonData.Ratings[1].Value,
        "Country: " + jsonData.Country,
        "Language: " + jsonData.Language,
        "Plot: " + jsonData.Plot,
        "-------------------------------------"
        ].join('\n\n')
        // will append data from movie and then display it to user
        fs.appendFile('log.txt', movieDisplay, function (err) {
            if (err) throw err
            console.log(movieDisplay);
        })
    })

}

function random() {
    fs.readFile('random.txt', 'utf8', function(err, data) {

        if(err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        var randomDisplay = [
        "Running 'spotify-this-song' for 'I Want it That Way'",
        "-------------------------------------",
        spotify(dataArr[1])
        ].join('\n\n')

        fs.appendFile('log.txt', randomDisplay, function (err) {
            if (err) throw err
            console.log(randomDisplay);
        })




    })
}