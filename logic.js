
require('dotenv').config();

var keys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

// Luck Vars
var match = false;
var luck;
var newLuck;
var luckArray = [];
var luckSpot = 0;
var loopCount = 0;

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
        appendLog();
        break;
    case "spotify-this-song":
        spotifyRun();
        appendLog();
        break;
    case "movie-this":
        omdbRun();
        appendLog();
        break;
    case "do-what-it-says":
        hardacRun();
        appendLog();
        break;
    default:
        console.log("HARDAC Did Not Recognize That Command. Please Check Your Syntax.");
        console.log("Valid Inputs: 'node logic.js my-tweets' | 'node logic.js spotify-this-song <song name>'");
        console.log("'node logic.js movie-this <movie name>' | 'node logic.js do-what-it-says'");
        appendLog();
}

// OMDB Function
function omdbRun(){
    // Check for user input
    if(input===""){
        input = "Mr. Nobody";
        console.log("No Song Selected");
    } 

    // Create API URL
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short" + omdbKey;
    // Run Request
    request(queryUrl, function(error, response, data){
        // Log Paths
        if (!error && response.statusCode===200){
            // console.log(JSON.parse("All Data: " + data));
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
            // console.log(data.tracks.items[0]); 
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

// Pick Random Music Or Movie Reocomendation
function hardacRun(){
    luckArray = [];

    // Fill Random Luck Array
    randomPick();
    randomPick();
    randomPick();

    // Runs FS To Read The Text File
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }else{
            // Convert Random Text File To An Array 
            var newArray = data.slice(0).split("|");
                console.log(newArray);

            for(var i = 0; i < luckArray.length; i++){
                // Sets New Input & Command From Random Pick Of Array
                console.log("loop");
                luckSpot = luckArray[i];

                command = newArray[luckSpot].split(",").slice(0,1);
                    console.log("Random Command: " + command);
                
                input = newArray[luckSpot].split(",").slice(-1);
                    console.log("Random Input: " + input); 
                
                // Selects The Right Function To Run Based On Pick
                if(command=='"spotify-this-song"'){
                    console.log("Song Picked");
                    spotifyRun();
                } else if(command=='"movie-this"') {
                    console.log("Movie Picked")
                    omdbRun();
                } else {
                    console.log("Something Went Wrong!")
                }
            }
        }
    });
}

// Write To Log.txt
function appendLog(){
    fs.appendFile("log.txt", command + " " + input + ",", function(error){
        if(error) {
            return console.log(error);
        } else {
            console.log("Request Logged :)");
        }
    });
}

// Picks Random Number But Checks Same Number Is Not Picked Twice In A Row
function randomPick(){
    // Picks Number between 0 (inclusive) and 9 (inclusive) 
    newLuck = Math.floor((Math.random() * 10));
        console.log("New Luck Is: " + newLuck);
        console.log("Luck Array Is: " + luckArray);
        console.log("Check: " + luckArray.indexOf(newLuck));
    
        // Checks If Number Is In Luck Array - True If > -1
    if (luckArray.indexOf(newLuck) > -1){
        match = true;
        while (match === true){
            console.log("++++++++++++++++ running loop +++++++++++++++++");
            loopCount++;
            newLuck = Math.floor((Math.random() * 10) + 1);
            // Checks If In Luck Array - False If = -1
            if(luckArray.indexOf(newLuck) === -1){
                // changes condition
                match = false;
                // sets luck to new number
                luck = newLuck;
                // adds new luck to array
                luckArray.push(luck);
                console.log("Loop Picked New Number: " + luck);
                console.log("Luck Array Modified: " + luckArray);
            // Do Nothing If Random Picks Same - Start Loop Again 
            } else {
                console.log("No Luck");
            }
        }
    } else {
        luck = newLuck;
        luckArray.push(luck);
        console.log("Added Luck To Array: " + luckArray);
    }
}

