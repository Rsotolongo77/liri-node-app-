//require modules and global variables established
require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var userCall = process.argv[2];
var userInput = process.argv.slice(3).join(" ");
//spotify song search function
function song(input) {
    if (input == undefined) {
        input = "The Sign by Ace of Base"
    }
    spotify
        .search({ type: 'track', query: input })
        .then(function (response) {
            for (i = 0; i < response.tracks.items.length; i++) {
                console.log(JSON.stringify("Artist: " + response.tracks.items[i].album.artists[0].name, null, 2));
                console.log(JSON.stringify("Song name: " + response.tracks.items[i].name, null, 2));
                console.log(JSON.stringify("Album that the song is from: " + response.tracks.items[i].album.name, null, 2));
                console.log(JSON.stringify("Preview of the song: " + response.tracks.items[i].preview_url, null, 2));
                console.log("---------------");
                console.log("---------------");
                console.log("---------------");
            }
        })

        .catch(function (err) {
            console.log(err);
        });

};
//omdb movie search function
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
            console.log(JSON.stringify("Plot of the movie: " + response.data.Plot));
            console.log(JSON.stringify("Actors in the movie: " + response.data.Actors));
            console.log("---------------");
            console.log("---------------");
            console.log("---------------");


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


};
//bandsintown search function
function concert(input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log("Name of venue: ", response.data[i].venue.name);
                console.log("Venue location: ", response.data[i].venue.city);
                var date = (response.data[i].datetime);
                console.log(moment(date).format("MM/DD/YY hh:mm:ss"));
                console.log("---------------");
                console.log("---------------");
                console.log("---------------");
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

};
//random fucntion that pulls data from random.txt file via readFile fs package for node js
function random() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        var dataArr = data.split(",")
        var userCall0 = dataArr[0];
        var userCall1 = dataArr[1];

        if (userCall0 === "spotify-this-song") {
            song(userCall1);
        }
        if (userCall0 === "movie-this") {
            movies(userCall1);
        }
        if (userCall0 === "concert-this") {
            concert(userCall1);
        }
    });

}
//switch establishes which function to run from process.argv[2] position, function the establishes userinput to use for search parameter
switch (userCall) {

    case "spotify-this-song":
        song(userInput)
        break

    case "movie-this":
        movies(userInput)
        break

    case "concert-this":
        concert(userInput)
        break

    case "do-what-it-says":
        random()
        break
}
