# LARDAC
Before the rise of Gotham's HARDAC there was LARDAC, which will fetch Tweets, song tracks from Spotify, and movie info from OMDB.  Need a little help?  LARDAC will recommend a random movie or song for you and keeps track of requests in the log file.  

This back-end application is built with JavaScript and Node.js NPM packages. It is designed to run from your terminal.  The application showcases the use of FS Read, FS Write, the "Request" NPM package, the OMDB API, the Spotify API, the Twitter API, and "dotenv" package to protect API keys.  It also includes a randomization function that randomly picks unique (i.e. non-duplicate) numbers using a recursive approach.

<h2>How To Run</h2>
<li>Install Node.js (https://nodejs.org/en/)
<li>Clone This Entire Directory To Your Local Machine (git@github.com:SigmaVX/LARDAC.git)
<li>Create A “.env” File To Hold Keys Using The Example Below
<li>Run The lardac.js File Using The Commands Below

<h3>Commands - From Root In Terminal</h3>
<li>node lardac.js my-tweets <br>
<li>node lardac.js spotify-this-song {song name}<br>
<li>node lardac.js movie-this {movie name}<br>
<li>node lardac.js do-what-it-says

<h2>Creating Your .env
This application secures data using dotenv.  You will need to have API keys from Twitter, OMDB, and Spotify to run this application. Crate a .env file in the root of the LARDAC folder and add the following.  You will put your keys where it is marked "Your_API_Key_Goes_Here".

# OMDB API keys
OMDB_KEY=&apikey=Your_API_Key_Goes_Here

# Spotify API keys
SPOTIFY_ID=Your_API_Key_Goes_Here
SPOTIFY_SECRET=Your_API_Key_Goes_Here

# Twitter API keys
TWITTER_CONSUMER_KEY=Your_API_Key_Goes_Here
TWITTER_CONSUMER_SECRET=Your_API_Key_Goes_Here
TWITTER_ACCESS_TOKEN_KEY=Your_API_Key_Goes_Here
TWITTER_ACCESS_TOKEN_SECRET=Your_API_Key_Goes_Here


Note: Some Spotify requests my time generate errors if there are too many concurrent requests.  Simply enter your command again to retry.  