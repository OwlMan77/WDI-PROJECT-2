// const mongoose         = require('mongoose');
// const rp               = require('request-promise');
// const databaseURL      = 'mongodb://localhost:27017/cinemas';
// mongoose.connect(databaseURL);
// const Cinema           = require('../models/cinema');
// const Promise          = require('bluebird');
//
// Promise.promisifyAll(require('mongodb'));
//
// Cinema.collection.drop();
//
// // findCinemas();
//
// // const cinema1          = new Cinema({
// //   id: '7530',
// //   address: 'Cineworld Luton, Luton, Luton',
// //   lat: '51.8818',
// //   lng: '-0.4177',
// //   listings: [{"title":"Monster Trucks","times":["15:30"]},{"title":"Assassin's Creed","times":["13:00","15:45","18:30","19:45","21:15"]},{"title":"La La Land","times":["11:45","13:45","14:45","16:45","17:45","19:45","20:45"]},{"title":"A Monster Calls","times":["12:00","14:40","17:20","20:00"]},{"title":"Why Him?","times":["12:50"]},{"title":"Fantastic Beasts and Where to Find Them","times":["13:40","16:40","19:30"]},{"title":"Sully - Miracle On the Hudson","times":["12:10","14:30"]},{"title":"Moana","times":["16:50"]},{"title":"Passengers","times":["12:20","15:00","17:40","20:20"]},{"title":"Collateral Beauty","times":["11:50","18:10"]},{"title":"Dangal","times":["12:50","16:30","20:10"]},{"title":"Silence","times":["13:30","17:00","20:30"]},{"title":"Bairavaa","times":["20:40"]},{"title":"Rogue One: A Star Wars Story","times":["14:10","17:10","20:15"]}]
// // });
// //
// // const cinema2         = new Cinema({
// //   id: '8053',
// //   address: 'Knebworth House, Knebworth, Hertfordshire',
// //   lat: '51.8728',
// //   lng: '-0.2148',
// //   listings: [{"title":"Monster Trucks","times":["15:30"]},{"title":"Assassin's Creed","times":["13:00","15:45","18:30","19:45","21:15"]},{"title":"La La Land","times":["11:45","13:45","14:45","16:45","17:45","19:45","20:45"]},{"title":"A Monster Calls","times":["12:00","14:40","17:20","20:00"]},{"title":"Why Him?","times":["12:50"]},{"title":"Fantastic Beasts and Where to Find Them","times":["13:40","16:40","19:30"]},{"title":"Sully - Miracle On the Hudson","times":["12:10","14:30"]},{"title":"Moana","times":["16:50"]},{"title":"Passengers","times":["12:20","15:00","17:40","20:20"]},{"title":"Collateral Beauty","times":["11:50","18:10"]},{"title":"Dangal","times":["12:50","16:30","20:10"]},{"title":"Silence","times":["13:30","17:00","20:30"]},{"title":"Bairavaa","times":["20:40"]},{"title":"Rogue One: A Star Wars Story","times":["14:10","17:10","20:15"]}]
// // });
// //
// // const cinemas         = [cinema1, cinema2];
// //
// // for (const cinema of cinemas){
// //   cinema.save(function(err, cinema){
// //     if (err) return console.log(err);
// //     console.log('Cinema saved!', cinema);
// //   });
// // }
//
// function findCinemas(req, res){
//   rp(`api.cinelist.co.uk/search/cinemas/location/london`)
//   .then(htmlString => {
//     const cinemas = JSON.parse(htmlString);
//     return cinemas.forEach(function(cinema) {
//       return addCinemasToDb(req, res, cinema);
//     });
//   })
//   .catch(err => {
//     return res.status(500).json(err);
//   });
//
// }
//
// function addCinemasToDb(res, req, cinema){
//   console.log('I work!');
//   const doc = new cinema({
//     'address': cinema.name,
//     'id': cinema.id
//   });
//   doc.save((err, doc)=>{
//     return console.log(`${doc} saved!`);
//   });
// // }
// // id: {type: String},
// // name: {type: String},
// // location: {type: String},
// // lisitngs: {type: Object}

const mongoose   = require('mongoose');
const rp         = require('request-promise');
const Bluebird   = require('bluebird');
mongoose.Promise = Bluebird;
const Cinema     = require('../models/cinema');
const config     = require('../config/config');

mongoose.connect(config.db);

// BUILD URL
const lat           = 51.503186;
const lng           = -0.126446;
const radius        = 2500;
const type          = "movie_theatre";
const keyword       = encodeURIComponent("cinema");
// const API_KEY       = "AIzaSyAoAcAiU79KVa27JwZ1UdRDyNomqlfhHdg";
const API_KEY       = "AIzaSyABATfVy66u30SKbWayzK3P-aLmkTYnPt0";
const originalUri   = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&location=${lat},${lng}&radius=${radius}&type=${type}&key=${API_KEY}`;
var next_page_token = "";
let page            = 0;

// Clear database of cinemas
Cinema.collection.drop();

function getCinemas(uri){
  let options = {
    uri: uri
  };

  return rp(options)
  .then(data => {
    let json = JSON.parse(data);

    // Get the next_page_token to make paginated requests
    next_page_token = json.next_page_token;

    console.log(json.results)

    console.log(`Found ${json.results.length} results.`);

    return Bluebird.map(json.results, cinema => {
      let cinemaData = {};
      cinemaData.place_id   = cinema.place_id;
      if (cinema.geometry && cinema.geometry.location) {
        cinemaData.lat      = cinema.geometry.location.lat;
        cinemaData.lng      = cinema.geometry.location.lng;
      }

      return Cinema.create(cinemaData);
    });
  })
  // .then(cinemas => {
  //   return Bluebird.map(cinemas, cinema => {
  //     let options = {
  //       uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${cinema.place_id}&key=${API_KEY}`
  //     };
  //
  //     return rp(options)
  //       .then(data => {
  //         let json                     = JSON.parse(data);
  //         let cinemaData               = {};
  //
  //         if (!json || !json.result.name) return;
  //         cinemaData.name              = json.result.name;
  //         cinemaData.formatted_address = json.result.formatted_address;
  //         cinemaData.website           = json.result.website;
  //         cinemaData.rating            = json.result.rating;
  //
  //         console.log(`Updating ${cinemaData.name}.`);
  //         return Cinema.findByIdAndUpdate(cinema._id, cinemaData, { new: true });
  //       });
  //   });
  // })
  .then(cinemas => {
    page++;
    if (page === 10) {
      console.log("DONE");
      process.exit();
    }
    console.log("New url:", `${originalUri}&pagetoken=${next_page_token}`);
    return getCinemas(`${originalUri}&pagetoken=${next_page_token}`);
  })
  .catch(console.error);
}

console.log("INITIAL: ", originalUri);
getCinemas(originalUri);
