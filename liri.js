// THIS IS SKYNET -- A Bot for Twitter, Spotify, OMDB, and taking over the World, basically
//
// IMPORT DEPENDENCIES
// ********************************************************
// Import Twitter Keys
var keys = require("./keys.js");

// Import Twitter NPM pkg
var Twitter = require("twitter");

// Import node-spotify-api NPM pkg
var Spotify = require("node-spotify-api");

// Import "request" NPM pkg
var request = require("request");

// Import FileSystem pkg for I/O
var fs = require("fs");


var spotify = new Spotify({

    id: "2ad3a93f3bb3467fad9e70da89f66ec0",
    secret: "039cb5571f4949c6b932e39055eaaa01"
});

// MAIN LOGIC
// *******************************************************

// Create/Writes log

var writeLog = function(data) {
    fs.appendFile("log.txt", "\r\n");

    fs.appendFile("log.txt", JSON.stringify(data), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("testing writing to log...");
    });
};


var getArtist = function(artist) {
    return artist.name;

};

// Spotify Retrieval
var getSpotify = function(songName) {
    writeLog("You searched for Song : " + songName);

    if (songName === undefined) {
        songName = "Macarena";
    }

    spotify.search({
            type: "track",
            query: songName
        },
        function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("Result # " + i);
                console.log("Artist: " + songs[i].artists.map(getArtist));
                console.log("Song Title: " + songs[i].name);
                console.log("Spotify Preview Link : " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("*******************************");


            }
        }
    );
};

// Twitter Retrieval
var getTweets = function() {

    writeLog("You are Trolling the NBA ");

    var client = new Twitter(keys);

    var params = {
        screen_name: "nba"
    };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log("");
                console.log(tweets[i].text);
            }
        }
    });
};

// Movie Retrieval
var getMovie = function(movieName) {

    writeLog("You searched for the Movie : " + movieName);

    if (movieName === undefined) {
        movieName = "Casablanca";
    }

    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=40e9cece";

    request(urlHit, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);

            console.log("Movie Title: " + jsonData.Title);
            console.log("Year Released: " + jsonData.Year);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Rottens Tomatoes Rated: " + jsonData.Rated);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);

            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
        }
    });
};

// do-what-it-says
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);

        var dataArr = data.split(",");

        if (dataArr.length === 2) {
            whatCommand(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            whatCommand(dataArr[0]);
        }
    });
};

// fun stuff
var doInigoMontoya = function() {

    console.log("I didn't kill anyone's Father!!");
};

// SWITCH
var whatCommand = function(caseData, functionData) {
    switch (caseData) {
        case "my-tweets":
            getTweets();
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovie(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        case "do-inigo-montoya":
            doInigoMontoya();
            break;
        default:
            console.log("\r\n" + "LIRI says the Answer to the Ultimate Question of Life, the Universe, and Everything - is 42 " + "\r\n");
            console.log("Try these other LIRI Commands : ");
            console.log("my-tweets");
            console.log("spotify-this-song songName ");
            console.log("movie-this movieName");
            console.log("do-what-it-says");
            console.log("do-inigo-montoya");
    }
};




// argOne = command; argTwo = parameter
var doCommand = function(argOne, argTwo) {
    whatCommand(argOne, argTwo);
};

// THIS STARTS THE PROGRAM
// *****************************************************

doCommand(process.argv[2], process.argv[3]);