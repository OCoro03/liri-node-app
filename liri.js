require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)
var omdb = (keys.omdb)
var bandsintown = (keys.concert)

var userInput = process.argv[2];
var userQuery = process.argv[3];


function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-this":
            doWhatItSays();
            break;
        default:
            console.log("Try Again");
            break;
    }
}
userCommand(userInput, userQuery)

function concertThis() {

    console.log(`\n - - - - - - - - - - - - - - -\n\nSearching For...${userQuery}'s next peformance...`);
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=c9cfe63eaabd2920051c64052193c33").then(function(response){
       
             //Parse the json response
             ///var data = JSON.parse(body);
             //Loop through array
             console.log(response)
             var bandsData = response.data;
             if(!bandsData.length){
                 console.log("no results found for your search");
                 return;
             }
             for (var i = 0; i < data.length; i++) {
                 //Get venue name
                 console.log("Artist: " + data[i].lineup[0]);
 
                 console.log("Venue: " + data[i].venue.name);
 
                 console.log("Location: " + data[i].venue.latitude + data[i].venue.longitude);
 
                 var date = moment(data[i].datetime).format("MM/DD/YYYY hh : 00");
                 console.log("Date + Time: " + date);
 
             };
        
    })
}

function spotifyThisSong() {
    console.log(`\n - - - - - - - - - - - - - - -\n\nSearching For..."${userQuery}"`);
    if (userQuery === undefined) { userQuery = " Sorry about that... Here's The Sign by Ace of Base" }

    spotify.search({ type: "track", query: userQuery, limit: 1 }, function (err, data) {
        if (err) { throw err }
        //console.log(data.tracks.items[0])

        var spotifyArr = data.tracks.items;
        for (var i=0; i < spotifyArr.length; i++) {
            console.log("inside the for loop")
            console.log("Artist: " + spotifyArr[i].album.artists[0].name);
            console.log("Album: " + spotifyArr[i].album.name);
            console.log("Song: " + spotifyArr[i].name);
            console.log("Link: " + spotifyArr[i].external_urls.spotify);
        }
    })
}

function movieThis(){
    console.log(`\n - - - - - - - - - - - - - - -\n\nSearching For..."${userQuery}"`);
    if (userQuery === undefined) { userQuery = "Mr. Nobody" };
    //var queryQRL = ""
    console.log(userQuery)
    var queryQRL = "https://www.omdbapi.com/?t=" + userQuery + "&apikey=76919b00"
    axios.get(queryQRL).then(function(response){
       // if (err) throw err
        //console.log(response)
        //var userMovie = JSON.parse(response);
        //console.log(userMovie)
        //console.log(response.data
        var info = response.data;
        // var ratingsArr = userMovie.Ratings;
        // if (ratingsArr.length > 2) { }
      
            // var info = JSON.parse(response);
            console.log("Title: " + info.Title)
            console.log("Release Year: " + info.Year)
            console.log("OMDB Rating: " + info.Ratings[0].Value)
            console.log("Rating: " + info.Ratings[1].Value)
            console.log("Country: " + info.Country)
            console.log("Language: " + info.Language)
            console.log("Plot: " + info.Plot)
            console.log("Actors: " + info.Actors)
        
    })
}

function doWhatItSays(){
fs.readFile("random.txt", "utf-8", function(err, data){
    if(err)console.log(err);
     
    var dataArr = data.split(",");

    userInput = dataArr[0];
    userQuery = dataArr[1];

    userCommand(userInput, userQuery);
})
}

// var movie = "";
// movie = process.argv[2];

// var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=76919b00";
// console.log(url);


// axios.get(url).then(
//     function(response) {
//       console.log("Release Year: " + response.data.Title);
//     });



// axios.get("http://www.omdbapi.com/?apikey=")
// axios.get("http://www.omdbapi.com/?apikey=76919b00")
//     .then(function(response){
//     console.log("Hello" + response);