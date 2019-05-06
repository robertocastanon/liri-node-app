/* ==================== INITIAL VARIABLES ==================== */

require("dotenv").config(); // add code to read & set any environment var with dotenv package
var keys = require("./keys.js"); // import the keys.js file then store it into a var
var axios = require('axios'); // require axios for the omdb and bandsintown api
const moment = require('moment') // required for use of moment.js
var Spotify = require('node-spotify-api'); // need for the npm spotify api to work
var fs = require('fs'); // will be used for the do-what-it-says case
var input = process.argv // var to reuse in the next two vars
var search = input[2]; // will process the users first input after the filename
var term = input.slice(3).join(" "); // in case your response has multiple words

/* ==================== SWITCH CASE ==================== */

switch(search) { // switch case for the 4 possible choices
    case 'concert-this':
    if(!term) { // if no term is given then it will default to "Earl Sweatshirt"
        term = "Earl Sweatshirt"
        console.log("Since no term was provided the program will input 'Earl Sweatshirt' as the term")
    }
    console.log('*Loading concerts near you*')
    console.log("-------------------------------------")
    concert(term) // calls the concert function
    break;
    case 'spotify-this-song':
    if(!term) { //if no term is given then it will default to "The Sign by Ace of Base"
        term = "The Sign by Ace of Base"
        console.log("Since no term was provided the program will input 'The Sign by Ace of Base' as the term")
    }
    console.log('*Loading song info*')
    console.log("-------------------------------------")
    spotify(term); // calls the spotify function
    break;
    case 'movie-this':
    if(!term) { // if no term is given then it will default to "Mr. Nobody"
        term = "Mr. Nobody"
        console.log("Since no term was provided the program will input 'Mr. Nobody' as the term")
    }
    console.log('*Loading movie info*')
    console.log("-------------------------------------")
    movie(term) // calls the movie function
    break;
    case 'do-what-it-says':
    random() // calls the random function
}

/* ==================== FUNCTIONS ==================== */

function concert(term) { // function for concert-this command
    var URL = `https://rest.bandsintown.com/artists/${term}/events?app_id=codingbootcamp`; // variable to store the bandsintown api url
    axios.get(URL).then(function (response) {
        for (i = 0; i<5; i++) { // will display information about the first 5 venues
        var jsonData = response.data[i] // stores the json data in a variable times 5
        var momentDate = moment(jsonData.datetime).format('MM/DD/YYYY') // variable to store information about the venues date and covert it using moment.js
        var concertDisplay = [ // variable to store concert info
        `Venue Name: ${jsonData.venue.name}`,
        `Venue Location: ${jsonData.venue.city}, ${jsonData.venue.region}`,
        `Date of Event: ${momentDate}`,
        `-------------------------------------`
        ].join('\n\n')
        console.log(concertDisplay); // display information
        fs.appendFile('log.txt', concertDisplay, function (err) { // append/send data to log.txt
            if (err) throw err
        })
        }
    })
}

function spotify(term) { // function for spotify-this command
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: term }, function(err,data) { // parameters for spotify npm
        if (err) {
            console.log('Error occurred: ' + err);
            return
        }
        jsonData = data.tracks.items //store the json data in a variable and parse it
        var spotifyDisplay = [ // variable to store and spotify info
        `Artist(s): ${jsonData[0].artists[0].name}`,
        `Song Name: ${jsonData[0].name}`,
        `Preview Link: ${jsonData[0].preview_url}`,
        `Album: ${jsonData[0].album.name}`,
        `-------------------------------------`
        ].join('\n\n')
        fs.appendFile('log.txt', spotifyDisplay, function (err) { // append/send data to log.txt
            if (err) throw err
            console.log(spotifyDisplay); // display information
        })
    });
}

function movie(term) { //function for movie-this command
    var URL = `http://www.omdbapi.com/?t=${term}&y=&plot=short&apikey=trilogy`; // variable to store omdb api url
    axios.get(URL).then(function (response) {
        //store json data in var
        var jsonData = response.data // store the json data in a variable
        var movieDisplay = [ // variable to store the movie info
        `Title: ${jsonData.Title}`,
        `Release Date: ${jsonData.Released}`,
        `IMDB Rating: ${jsonData.imdbRating}`,
        `Rotten Tomatoe Rating: ${jsonData.Ratings[1].Value}`,
        `Country: ${jsonData.Country}`,
        `Language: ${jsonData.Language}`,
        `Plot: ${jsonData.Plot}`,
        `-------------------------------------`
        ].join('\n\n')
        fs.appendFile('log.txt', movieDisplay, function (err) { // append/send data to log.txt
            if (err) throw err
            console.log(movieDisplay); // display information
        })
    })

}

function random() { // function for do-what-it-says command
    fs.readFile('random.txt', 'utf8', function(err, data) { // reads the random.txt file and sets it as 'data'
        if(err) {
            return console.log(err);
        }
        var dataArr = data.split(','); // grabs data except for comma
        var randomDisplay = [ // variable to store info for later usage
        `Running 'spotify-this-song' for 'I Want it That Way'`,
        `-------------------------------------`,
        spotify(dataArr[1]) // calls the spotify-this function for 'I Want it That Way' text
        ].join('\n\n')
        fs.appendFile('log.txt', randomDisplay, function (err) { // append/sends data to log.txt
            if (err) throw err
            console.log(randomDisplay); // disaplay information
        })
    })
}

/* ==================== END ==================== */
