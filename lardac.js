
require('dotenv').config();


var keys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('node-spotify-api');
const cTable = require('console.table');
var inquirer = require("inquirer");

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
 
// Capture User Input - Not Used For Inquirer Prompts Upgrade 
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

// -------------------------------------
var options = ["View My Tweets","Find Movie Info On OMDB","Find Song Info On Spotify","Recommend Music & Movies\n"];

console.log("\n\n\n")
console.log("Language * Assisted * Reciprocating * Digital * Awesomeness * Computer");
console.log("_____________________________________________________________________");
console.log("\nWelcome To LARDAC's Music, Movie, & Tweet Portal!\n\n");


function start(){
    inquirer.prompt([
            {
              name: 'pickFunction',
              message: '\nLARDAC Commands: ',
              type: 'list',
              choices: options
            }
        ]).then(function(answers) {

        // Run Switch Case To Trigger A Function
        switch (answers.pickFunction) {
            case "View My Tweets":
                twitterRun();
                setTimeout(start, 2000);
                break;
            case "Find Song Info On Spotify":
                spotifyRun();
                break;
            case "Find Movie Info On OMDB":
                omdbRun();
                break;
            case "Recommend Music & Movies\n":
                lardacRun();
                break;
            default:
                console.log("LARDAC Did Not Recognize That Command. Please Check Your Syntax.");
                start();
        }
    });
};

// OMDB Function
function omdbRun(){

    inquirer.prompt([
        {
          name: 'pickMovie',
          message: 'Please Enter A Movie Title: ',
          type: 'input',
          default: 'Mr. Nobody'
        }
      ]).then(function(answers) {
            input = answers.pickMovie;  
            movieLogic();
            appendLog();
            setTimeout(start, 1000);
            // console.log("Select Down Arrow To See LARDAC Commands");
    });
}

// Logic Move To Global Level To Run Both OMDB & Random Functions
function movieLogic(){
    // Create API URL
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short" + omdbKey;

    // Run Request
    request(queryUrl, function(error, response, data){
        // Log Paths
        if (!error && response.statusCode===200){
            // console.log(JSON.parse("All Data: " + data));

            console.log("\n");
            console.log("Movie Title: " + JSON.parse(data).Title);
            console.log("______________________________________________");
            console.log("Release Year: " + JSON.parse(data).Year);
            console.log("IMDB Rating: " + JSON.parse(data).imdbRating);
            console.log("Rotten Tomatoes: " + JSON.parse(data).Ratings[1].Value);
            console.log("Produced In: " + JSON.parse(data).Country);
            console.log("Languages: " + JSON.parse(data).Language);
            console.log("Actors: " + JSON.parse(data).Actors);
            console.log("\nPlot: " + JSON.parse(data).Plot);
            console.log("______________________________________________\n");  
        } else {
            return console.log(error);
        }
    });
}



// Spotify Function
function spotifyRun(){
    
    inquirer.prompt([
        {
          name: 'pickSong',
          message: 'Please Enter A Song Title: ',
          type: 'input',
          default: 'The Sign Ace of Base'
        }
    ]).then(function(answers) {
        input = answers.pickSong;          
        spotifyLogic();
        appendLog();
        setTimeout(start, 1000);
        // console.log("Select Down Arrow To See LARDAC Commands");
    });
}

// Logic For Both Spotify & Random Functions
function spotifyLogic(){
    // Search for track using Spotify API
    spotifyKey.search({ type: 'track', query: input }, function(err, data) {
    // spotifyKey.search({ type: 'track', query: input }).then(function(err, data) {
        if (err) {
            return console.log(err);
        }else{
            // console.log(data.tracks.items[0]); 
            console.log("\n");
            console.log("Song: " + data.tracks.items[0].name);
            console.log("______________________________________________");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("______________________________________________\n");
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
           
            console.log("\n");
            console.log("           Your Last 10 Tweets");
            console.log("______________________________________________");
            for (var i = 0; i < 10; i++){
                // Created At & Tweet Path
                console.log("Created On: "+ tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("______________________________________________");
            }

            console.log("\n");
            appendLog();
        }
    }); 
}

// // Pick Random Music Or Movie Reocomendation
function lardacRun(){
    
    luckArray = [];

    // Fill Random Luck Array
    randomPick();
    randomPick();

    // Runs FS To Read The Text File
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }else{
            
            console.log("\n\n");
            console.log("LARDAC's Thinks Your Should Check These Out!");
            console.log("______________________________________________\n");
            
            // Convert Random Text File To An Array 
            var newArray = data.slice(0).split("|");
                // console.log(newArray);

            randomPicks();
            // Uses Async Await To Prevent System From Proceeding Before API Filled
            async function randomPicks(){   
                for(var i = 0; i < luckArray.length; i++){
                    // Sets New Input & Command From Random Pick Of Array
                    // console.log("loop");
                    luckSpot = luckArray[i];

                    command = newArray[luckSpot].split(",").slice(0,1);
                        // console.log("Random Command: " + command);
                    
                    input = newArray[luckSpot].split(",").slice(-1);
                        // console.log("Random Input: " + input); 
                    
                    // Selects The Right Function To Run Based On Pick
                    if(command=='"spotify-this-song"'){
                        // console.log("Song Picked");
                        await spotifyLogic();
                    } else if(command=='"movie-this"') {
                        // console.log("Movie Picked")
                        await movieLogic();
                    } else {
                        console.log("Something Went Wrong!" + luckArray);
                    }

                    if(i === (luckArray.length -1)){
                        setTimeout(start, 1500);   
                    }
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
            console.log("\nRequest Logged :)\n");
        }
    });
}

// Picks Unique Random Number | Same Number Is Not Picked Twice In A Row
function randomPick(){
    // Picks Number between 0 (inclusive) and 9 (inclusive) 
    newLuck = Math.floor((Math.random() * 10));
        // console.log("New Luck Is: " + newLuck);
        // console.log("Luck Array Is: " + luckArray);
        // console.log("Check: " + luckArray.indexOf(newLuck));
    
        // Checks If Number Is In Luck Array - True If > -1
    if (luckArray.indexOf(newLuck) > -1){
        match = true;
        while (match === true){
            // console.log("++++++++++++++++ running loop +++++++++++++++++");
            newLuck = Math.floor((Math.random() * 10) + 1);
            // Checks If In Luck Array - False If = -1
            if(luckArray.indexOf(newLuck) === -1){
                // changes condition
                match = false;
                // sets luck to new number
                luck = newLuck;
                // adds new luck to array
                luckArray.push(luck);
                // console.log("Loop Picked New Number: " + luck);
                // console.log("Luck Array Modified: " + luckArray);

            // Do Nothing If Random Picks Same - Start Loop Again 
            } else {
                // console.log("No Luck");
            }
        }
    } else {
        luck = newLuck;
        luckArray.push(luck);
        // console.log("Added Luck To Array: " + luckArray);
    }
}

start();
