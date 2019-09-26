require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");



var userCall = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function song(input) {
    spotify
        .search({ type: 'track', query: input })
        .then(function (response) {
            console.log(JSON.stringify(response.tracks.items[0], null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });

}

function movies() {
    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("The movie's rating is: " + response.data.imdbRating);
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
            console.log(JSON.stringify(response[0], null, 2));
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