# liri-node-app
NODE.JS Assignment


This is my Liri Personal assistant, access liri by typing node liri in terminal.

Liri accepts the following commands, don't worry if you forget, liri will help you out if you don't know them.

1. Liri spotify-this-song

    If you leave it blank, liri will get info and a preview link for the song The Sign by Ace of Base, neato!

    If you enter a song title, liri will get info and a preview link for a song that matches what you entered.

    spotify-this-song uses the Spotify API and the "node-spotify-api" module.

2. Liri concert-this 

    Enter a band name to get venue and ticketing information about a band.

    concert-this uses Bands In Town api and the "request" node module.

3. Liri movie-this

    Enter a movie title to get information about a movie, if you leave this blank it will provide information about "Mr.Nobody" by default.

    movie this uses the OMDB api and the "request" node module.

4. Liri do-what-it-says

    Liri will read from a text file and will perform one of the above actions based on the command that is entered into the text file and the song title/movie/band name (paramater) that accompanies it.


Liri will also log information about user input to a text file.

You can see my demonstration <a href="https://drive.google.com/file/d/1OiP-H5owQcx3lOIc8944-bT-Y-UlZstW/view"> here </a>

