require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment");



var userCall = process.argv[2];
var userInput = process.argv[3];

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


}


function concert() {


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