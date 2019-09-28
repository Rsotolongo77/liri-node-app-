require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var userCall = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function song(input) {
    if (input == undefined) {
        input = "The Sign by Ace of Base"
    }
    spotify
        .search({ type: 'track', query: input })
        .then(function (response) {
            for (i = 0; i < response.tracks.items.length; i++) {
                console.log(JSON.stringify("\nArtist: \n" + response.tracks.items[i].album.artists[0].name, null, 2));
                console.log(JSON.stringify("\nSong name: \n" + response.tracks.items[i].name, null, 2));
                console.log(JSON.stringify("\nAlbum that the song is from: \n" + response.tracks.items[i].album.name, null, 2));
                console.log(JSON.stringify("\nPreview of the song: \n" + response.tracks.items[i].preview_url, null, 2));
                console.log("---------------");
                console.log("---------------");
                console.log("---------------");
            }
        })

        .catch(function (err) {
            console.log(err);
        });

};

function movies(input) {
    if (input == undefined) {
        input = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            console.log(JSON.stringify("\nTitle: \n" + response.data.Title));
            console.log(JSON.stringify("\nYear Released: \n" + response.data.Year));
            console.log(JSON.stringify("\nIMDB Rating: \n" + response.data.imdbRating));
            console.log(JSON.stringify("\nRotten Tomatoes Rating: \n" + response.data.Ratings[1].Value));
            console.log(JSON.stringify("\nCountry where the movie was produced: \n" + response.data.Country));
            console.log(JSON.stringify("\nLanguage of the movie: \n" + response.data.Language));
            console.log(JSON.stringify("\nActors in the movie: \n" + response.data.Actors));
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

function concert(input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log("\nName of venue: \n", response.data[i].venue.name);
                console.log("\nVenue location: \n", response.data[i].venue.city);
                var date = (response.data[i].datetime);
                console.log(moment(date).format("\nMM/DD/YY hh:mm:ss\n"));
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
            console.log(userCall0, userCall1);
        }
    });

}

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
