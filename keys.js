console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.concert = {
  concertAPI: process.env.CONCERT_ID
}
exports.omdb = {
  omdbAPI: process.env.OMDB
}

