# liri-node-app

LIRI is an application run in the terminal using node.js showing the use of various npm packages (node-spotify-api, request, moment, & dotenv) and APIs (OMDB, Spotify & Bandsintown).

Search for a concert using "node liri.js concert-this <artist/band name here>"

Search for a song on Spotify using "node liri.js spotify-this-song '<song name here>'"

Search for a movie on OMDB using "node liri.js movie-this '<movie name here>'"

You can also list commands to be run in a text file (random.txt) in a comma separated format which can be run using "node liri.js do-what-it-says".  

For example, the random.txt could contain "movie-this,'Rush Hour',spotify-this-song,'I Want it That Way'" if you want to first search for the movie "Rush Hour" followed by a search for the song "I Want it That Way".