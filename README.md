# liri-node-app

LIRI is a CLI App which takes in 4 possible parameters and gives the user back data.

## The Liri app uses:

* [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
* [Axios](https://www.npmjs.com/package/axios)
    * [OMDb API](http://www.omdbapi.com/)
    * [bandsintown API](http://www.artists.bandsintown.com/bandsintown-api)
* [moment](https://www.npmjs.com/package/moment)
* [dotenv](https://www.npmjs.com/package/dotenv)

**Axios** will be needed to send requests and retrieve data.

LIRI searches the node-spotify-api for song info, bandsintown API for concert info, and OMDb for movie info.

## How to use LIRI:

To use Liri you must open the directory in which liri.js is located in the command line. 

Then then choose one of the four possible paremters.

# 4 Parameters:

* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

You type into the command line for example **node liri spotify-this-song** then provide a term for this command, pick a song, lets say Graduation by Kanye West. Which will look like this **node liri spotify-this-song graduation** after just presss enter.

You should see this in the command line

![First exmaple](./images/first-example.PNG)

That's the basics of it!
I will now go into more detail on each command.

## concert-this

Type **node liri concert-this** then an artist's name for an example i'll use Ariana Grande.

This would look like **node liri concert-this ariana grande**

![concert exmaple](./images/concert-this-ex.PNG)

You will see information about 5 different venues. It will display the venue's name, location and the date of the event using [moment](https://www.npmjs.com/package/moment) for formatting.

If the user does not provide a term and leaves it as **node liri concert-this** the program will default to a preset term which is set to 'Earl Sweatshirt' and then show the 5 venues for that term.

![concert default](./images/concert-default.PNG)

