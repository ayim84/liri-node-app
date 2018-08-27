require("dotenv").config();

var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var moment = require('moment');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var command = process.argv[2].toLowerCase();
var input = process.argv.slice(3).join("+");

function spotifySearch(song)
{
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2)); 
        console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name, null, 2)); 
        console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2)); 
        console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)); 
    
    });
}

function bandsInTownSearch(band)
{
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function(error, response, body)
    {
        if(!error && response.statusCode === 200)
        {
            console.log("Venue: " + JSON.parse(body)[0].venue.name);
            console.log("Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region);
            console.log("Date of Event: " + moment(JSON.parse(body)[0].datetime, "YYYY-MM-DDTHH:mm").format("MM/DD/YYYY"));
        }
    });
}

function omdbSearch(movie)
{
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body)
    {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Production Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    });
}

function runLIRI()
{
    if(command == "spotify-this-song" && input)
    {
        spotifySearch(input);
    }
    else if(command == "spotify-this-song" && !input)
    {
        spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
          .then(function(data) 
          {
            console.log(data.album.artists[0].name); 
            console.log(data.name);
            console.log(data.preview_url);
            console.log(data.album.name);
          })
          .catch(function(err) 
          {
            console.error('Error occurred: ' + err); 
          });
    }
    else if(command == "concert-this")
    {
        bandsInTownSearch(input);
    }
    else if(command == "movie-this" && input)
    {
        omdbSearch(input);
    }
    else if(command == "movie-this" && !input)
    {
        omdbSearch("Mr. Nobody");
    }
    else if(command == "do-what-it-says")
    {
        fs.readFile("random.txt", "utf8", function(error, data)
        {
            var array = data.split(",");
            console.log(array); 
            command = array[0];
            input = array[1];
            runLIRI();
        });
    }
}

runLIRI();