# LIRI-node js-app

## LIRI is a node js app that makes API calls, and returns the relevant data from the users command line inputs. 


### The four comand line inputs are :
* spotify-this-song
* movie-this
* concert-this
* do-what-it-says


### spotify-this-song :
1. For this command input at process.argv[2], a funtion is triggered that runs the API call to spotify on node js.
2. The command input at process.argv[3] takes in the parameter that brings in the song name as the input for the API call. 
3. The returning results are the artists and albums listing that song in the spotify database. 


### movie-this:
1. For this command input at process.argv[2], a funtion is triggered that runs the axios package on node js for OMDB API .
2. The command input at process.argv[3] takes in the parameter that brings in the movie name as the input for the axios call. 
3. The returning results are the following data points on the movie name inputed for the API call :
      * Title of the movie.
      * Year the movie came out.
      * IMDB Rating of the movie.
      * Rotten Tomatoes Rating of the movie.
      * Country where the movie was produced.
      * Language of the movie.
      * Plot of the movie.
      * Actors in the movie.
      
      
### concert-this :
1.  For this command input at process.argv[2], a funtion is triggered that runs the axios package on node js for the bandsintown API .
2. The command input at process.argv[3] takes in the parameter that brings in the artist name as the input for the axios call.
3. The returning results are the following data points from the bandsintown database for that artist :
    * Name of the venue
    * Venue location
    * Date of the Event (use moment to format this as "MM/DD/YYYY")
    
    
### do-what-it-says :
1.  For this command input at process.argv[2], a funtion is triggered that uses the fs package in node js. It reads the file called random.txt and turns the strings into an array. Then it uses item at index [0] as the user input referencing the spotify-this-song, movie-this, or concert-this function accordingly. 
2. The array item at index[1] is then replaced as the input point for the search of  each respective API call. For example, If spotify-this-song is listed at the index[0] of the array created from the read me file; then song name will be inserted as the input for the search parameter of the API call. 


