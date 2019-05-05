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
        for (i = 0; i<5; i++) {
        var jsonData = response.data[i]

        console.log("Venue Name: " + jsonData.venue.name)
        console.log("Venue Location: " + jsonData.venue.city + ", " + jsonData.venue.region)
        console.log("Date of Event: " + jsonData.datetime)
        console.log("-------------------------------------")
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
        console.log("-------------------------------------")

    });
}

//function for calling the omdb api
function movie(term) {
    var URL = `http://www.omdbapi.com/?t=${term}&y=&plot=short&apikey=trilogy`;

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
        console.log("-------------------------------------")
    })

}

function random() {
    fs.readFile('random.txt', 'utf8', function(err, data) {

        if(err) {
            return console.log(err);
        }
        console.log(data)
        console.log("-------------------------------------")
        console.log("Running 'spotify-this-song' for 'I Want it That Way'")
        var dataArr = data.split(',');
        console.log(dataArr[1])
        console.log("-------------------------------------")

        spotify(dataArr[1])




    })
}