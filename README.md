# LARDAC
Before the rise of Gotham's HARDAC there was LARDAC, which will fetch Tweets, song tracks from Spotify, and movie info from OMDB.  Need a little help?  LARDAC will recommend a random movie or song for you and keeps track of requests in the log file.  

This back-end application is built with JavaScript and Node.js NPM packages. It is designed to run from your terminal.  The application showcases the use of FS Read, FS Write, the "Request" NPM package, the OMDB API, the Spotify API, the Twitter API, and "dotenv" package to protect API keys.  It also includes a randomization function that randomly picks unique (i.e. non-duplicate) numbers using a recursive approach.   
<h2>Commands - From Root In Terminal</h2>
<ul>
<li>node lardac.js my-tweets <br>
<li>node lardac.js spotify-this-song {song name}<br>
<li>node lardac.js movie-this {movie name}<br>
<li>node lardac.js do-what-it-says
</ul>

Note: Some Spotify requests my time generate errors if there are too many concurrent requests.  Simply enter your command again to retry.  