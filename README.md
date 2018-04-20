# LARDAC
Before the rise of Gotham's HARDAC there was LARDAC (Language * Assisted * Reciprocating * Digital * Awesomeness * Computer), which will fetch Tweets, song tracks from Spotify, and movie info from OMDB.  Need a little help?  LARDAC will recommend a random movie or song for you and keeps track of requests in the log file.  

This back-end application is built with JavaScript and Node.js NPM packages. It runs from your command line and uses inquirer as a proxy for the front end.  The application showcases the use of FS Read, FS Write, the "Request" NPM package, the OMDB API, the Spotify API, the Twitter API, and "dotenv" package to protect API keys.  It also includes a randomization function that randomly picks unique (i.e. non-duplicate) numbers using a recursive approach.

**Video Demo** - https://youtu.be/SQHHRqTVohM


# How To Run
* Install Node.js (https://nodejs.org/en/)
* Open Bash On Your Computer
* Type "git clone git@github.com:SigmaVX/LARDAC.git"
* Change Your Working Directory To LARDAC 
* Type "npm install" To Add NPM Packages  
* Create A “.env” File To Hold Keys Using The Example Below
* Type "node lardac.js" To Start The App

## Key Features
* View Tweets - Will Look Up The Last 10 Tweets
* Movie Look Up - Search For Movie Details Using OMBD's API
* Song Look Up - Find Samples For Songs Using Spotify's API (simply copy and paste the preview URL into your browser)
* Random Picks - Get A Mix Of Random Music & Movie Recommendations. 
* Logs Requests In TXT Files 


## Creating Your .env
This application secures data using dotenv.  You will need to have API keys from Twitter, OMDB, and Spotify to run this application. Crate a .env file in the root of the LARDAC folder and add the following.  You will put your keys where it is marked "Your_API_Key_Goes_Here".

**OMDB API keys**<br>
OMDB_KEY=&apikey=Your_API_Key_Goes_Here

**Spotify API keys**<br>
SPOTIFY_ID=Your_API_Key_Goes_Here
SPOTIFY_SECRET=Your_API_Key_Goes_Here

**Twitter API keys**<br>
TWITTER_CONSUMER_KEY=Your_API_Key_Goes_Here
TWITTER_CONSUMER_SECRET=Your_API_Key_Goes_Here
TWITTER_ACCESS_TOKEN_KEY=Your_API_Key_Goes_Here
TWITTER_ACCESS_TOKEN_SECRET=Your_API_Key_Goes_Here<br>

**Screenshot**
![LARDAC Screenshot](./lardac.png)

