require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment")
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify)
var omdb = (keys.omdb)
var bandsintown = (keys.concert)

var userThis = process.argv[2];
var userInput = process.argv[3];
// console.log(process.argv[2]);


function userCommand(userThis, userInput) {
    switch (userThis) {
        //if "concert-this" then run that function, if not then on to the next case
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
userCommand(userThis, userInput)

function concertThis() {

    console.log(`\n - - - - - - - - - - - - - - -\n\nSearching For...${userInput}'s next peformance...`);
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=0c9cfe63eaabd2920051c64052193c33").then(function(response){

             //Parse the json response
             ///var data = JSON.parse(body);
             //Loop through array
             console.log(response.data)
             var bandsData = response.data;
             for (var i = 0; i < bandsData.length; i++) {
                //Getting Artist name
                console.log("Artist: " + bandsData[i].lineup[0]);
               //Getting Venue name
                console.log("Venue: " + bandsData[i].venue.name);
               //Longitude + Latitude location
                console.log("Location: " + bandsData[i].venue.latitude + bandsData[i].venue.longitude);
               //Date of concert
                var date = moment(bandsData[i].datetime).format("MM/DD/YYYY hh : 00");
                console.log("Date + Time: " + date);

            }
             if(!bandsData.length){
                 console.log("No luck, try another artist/band!");
                 return;
             }
             

    })
}

function spotifyThisSong() {
    console.log(`\n - - - - - - - - - - - - - - -\n\nSearching For..."${userInput}"`);
    if (userInput === undefined) { userInput = " No luck... Here's The Sign by Ace of Base" }

    spotify.search({ type: "track", input: userInput, limit: 1 }, function (err, data) {
        if (err) { throw err }
        //console.log(data.tracks.items[0])

        var spotifyLs = data.tracks.items;
        for (var i = 0; i < spotifyLs.length; i++) {
            // console.log("inside the for loop")
            //Getting Artist name
            console.log("Artist: " + spotifyLs[i].album.artists[0].name);
            //Getting Album name
            console.log("Album: " + spotifyLs[i].album.name);
            //Getting Song name
            console.log("Song: " + spotifyLs[i].name);
            //Link to the song
            console.log("Link: " + spotifyLs[i].external_urls.spotify);
            console.log("\n- - - - - - - - - - - - - - -")

        }
    })
}

function movieThis() {
    console.log(`\n - - - - - - - - - - - - - - -\n\nSearching For..."${userInput}"`);
    if (userInput === undefined) { userInput = "Mr. Nobody" };
    //var inputQRL = ""
    // console.log(userInput)
    var inputQRL = "https://www.omdbapi.com/?t=" + userInput + "&apikey=76919b00" 
    axios.get(inputQRL).then(function (response) {
        // if (err) throw err
        //console.log(response)
        //console.log(response.data
        var info = response.data;
        //Shoot Title of movie
        console.log("Title: " + info.Title)
        //Give release date
        console.log("Release Year: " + info.Year)
        //Shoot Ratings
        console.log("OMDB Rating: " + info.Ratings[0].Value)
        console.log("Rating: " + info.Ratings[1].Value)
        //Country movie was shot in
        console.log("Country: " + info.Country)
        console.log("Language: " + info.Language)
        //Sends Plot
        console.log("Plot: " + info.Plot)
        //Shows Actors
        console.log("Actors: " + info.Actors)

        console.log("\n- - - - - - - - - - - - - - -")
        
    })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function (err, data) {
        if (err) console.log(err);

        var dataArr = data.split(",");

        userThis = dataArr[0];
        userInput = dataArr[1];

        userCommand(userThis, userInput);
    })
}

// var movie = "";
// movie = process.argv[2];

// console.log(url);


// axios.get(url).then(
//     function(response) {
//       console.log("Release Year: " + response.data.Title);
//     });



// axios.get("http://www.omdbapi.com/?apikey=")
//     .then(function(response){
//     console.log("Hello" + response);