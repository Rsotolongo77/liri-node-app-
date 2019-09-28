require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");



var userCall = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function song(input) {
    if (input == undefined) {
        input = "The Sign by Ace of Base"
    }
    spotify
        .search({ type: 'track', query: input })
        .then(function (response) {
            console.log(JSON.stringify("Artist: " + response.tracks.items[0].album.artists[0].name, null, 2));
            console.log(JSON.stringify("Song name: " + response.tracks.items[0].name, null, 2));
            console.log(JSON.stringify("Album that the song is from: " + response.tracks.items[0].album.name, null, 2));
            console.log(JSON.stringify("Preview of the song: " + response.tracks.items[0].preview_url, null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });

}

function movies(input) {
    if (input == undefined) {
        input = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(JSON.stringify("Title: " + response.data.Title));
            console.log(JSON.stringify("Year Released: " + response.data.Year));
            console.log(JSON.stringify("IMDB Rating: " + response.data.imdbRating));
            console.log(JSON.stringify("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value));
            console.log(JSON.stringify("Country where the movie was produced: " + response.data.Country));
            console.log(JSON.stringify("Language of the movie: " + response.data.Language));
            console.log(JSON.stringify("Actors in the movie: " + response.data.Actors));
            console.log(response.data.Ratings);
        })
        .catch(function (error) {
            if (error.response) {

                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });


}


function concert(input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (let i = 0; i < response.data.length; i++) {
                console.log("Name of venue: ", response.data[i].venue.name);
                console.log("Venue location: ", response.data[i].venue.city);
                //console.log(response.data);
                var date = (response.data[i].datetime);
                console.log(moment(date).format("MM/DD/YY hh:mm:ss"));
            }
        })
        .catch(function (error) {
            if (error.response) {

                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {

                console.log(error.request);
            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

function random() {



}

switch (userCall) {

    case "spotify-this-song":
        song(userInput)
        break


    case "movie-this":
        movies(userInput)
        break


    case "do-what-it-says":
        random(userInput)
        break


    case "concert-this":
        concert(userInput)
        break

}