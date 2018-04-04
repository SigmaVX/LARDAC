
require('dotenv').config();

var keys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require("request");

var omdbKey = keys.omdb.api_key;

var twitterName = {screen_name: 'gameroster'};
var twitterKey = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

var spotifyKey = new spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  }); 
 
  
// Capture User Input  
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

// Build Switch Case

switch(command) {
    case "my-tweets":
        twitterRun();
        break;
    case "spotify-this-song":
        spotifyRun();
        break;
    case "movie-this":
        omdbRun();
        break;
    default:
        console.log("HARDAC Did Not Recognize That Command. Please Check Your Syntax.");
        console.log("Valid Inputs: 'node logic.js my-tweets' | 'node logic.js spotify-this-song <song name>'");
        console.log("'node logic.js movie-this <movie name>' | 'node logic.js do-what-it-says'");
}




function omdbRun(){
    // Create API URL
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short" + omdbKey;
    // Run Request
    request(queryUrl, function(error, response, data){
        // Log Paths
        if (!error && response.statusCode===200){
            console.log("++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("Movie Title: " + JSON.parse(data).Title);
            console.log("Release Year: " + JSON.parse(data).Year);
            console.log("IMDB Rating: " + JSON.parse(data).imdbRating);
            console.log("Rotten Tomatoes: " + JSON.parse(data).Ratings[1].Value);
            console.log("Produced In: " + JSON.parse(data).Country);
            console.log("Languages: " + JSON.parse(data).Language);
            console.log("Actors: " + JSON.parse(data).Actors);
            console.log("Plot: " + JSON.parse(data).Plot);
            console.log("++++++++++++++++++++++++++++++++++++++++++++++");   
        } else {
            return console.log(error);
        }
    });
}

// Spotify Function
function spotifyRun(){
    // Check for user input
    if(input===""){
        input = "The Sign Ace of Base";
        console.log("No Song Selected");
    } 

    // Search for track using Spotify API
    spotifyKey.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
            return console.log(err);
        }else{
            console.log(data.tracks.items[0]); 
            console.log("++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("Track: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("++++++++++++++++++++++++++++++++++++++++++++++");
        }
    });
}


// Twitter Function
function twitterRun(){
    twitterKey.get('statuses/user_timeline', twitterName, function(error, tweets, response) {
        if (error) {
            return console.log(error);
        }else{ 
            // console.log(tweets);
            console.log("++++++++++++++++++++++++++++++++++++++++++++++");
            console.log("Your Last 20 Tweets");
            console.log("++++++++++++++++++++++++++++++++++++++++++++++");
            for (var i = 0; i < 20; i++){
                // Created At & Tweet Path
                console.log("Created On: "+ tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("++++++++++++++++++++++++++++++++++++++++++++++");
            }
        }
    }); 
}



// var spotify = new Spotify({
//     id: process.env.TwitterKey
// })