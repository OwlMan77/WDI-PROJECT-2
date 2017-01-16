const mongoose         = require('mongoose');
const rp               = require('request-promise');
const databaseURL      = 'mongodb://localhost:27017/cinemas';
mongoose.connect(databaseURL);
const Cinema           = require('../models/cinema');

rp.Promises = global.Promises;

Cinema.collection.drop();

findCinemas();

// const cinema1          = new Cinema({
//   id: '7530',
//   address: 'Cineworld Luton, Luton, Luton',
//   lat: '51.8818',
//   lng: '-0.4177',
//   listings: [{"title":"Monster Trucks","times":["15:30"]},{"title":"Assassin's Creed","times":["13:00","15:45","18:30","19:45","21:15"]},{"title":"La La Land","times":["11:45","13:45","14:45","16:45","17:45","19:45","20:45"]},{"title":"A Monster Calls","times":["12:00","14:40","17:20","20:00"]},{"title":"Why Him?","times":["12:50"]},{"title":"Fantastic Beasts and Where to Find Them","times":["13:40","16:40","19:30"]},{"title":"Sully - Miracle On the Hudson","times":["12:10","14:30"]},{"title":"Moana","times":["16:50"]},{"title":"Passengers","times":["12:20","15:00","17:40","20:20"]},{"title":"Collateral Beauty","times":["11:50","18:10"]},{"title":"Dangal","times":["12:50","16:30","20:10"]},{"title":"Silence","times":["13:30","17:00","20:30"]},{"title":"Bairavaa","times":["20:40"]},{"title":"Rogue One: A Star Wars Story","times":["14:10","17:10","20:15"]}]
// });
//
// const cinema2         = new Cinema({
//   id: '8053',
//   address: 'Knebworth House, Knebworth, Hertfordshire',
//   lat: '51.8728',
//   lng: '-0.2148',
//   listings: [{"title":"Monster Trucks","times":["15:30"]},{"title":"Assassin's Creed","times":["13:00","15:45","18:30","19:45","21:15"]},{"title":"La La Land","times":["11:45","13:45","14:45","16:45","17:45","19:45","20:45"]},{"title":"A Monster Calls","times":["12:00","14:40","17:20","20:00"]},{"title":"Why Him?","times":["12:50"]},{"title":"Fantastic Beasts and Where to Find Them","times":["13:40","16:40","19:30"]},{"title":"Sully - Miracle On the Hudson","times":["12:10","14:30"]},{"title":"Moana","times":["16:50"]},{"title":"Passengers","times":["12:20","15:00","17:40","20:20"]},{"title":"Collateral Beauty","times":["11:50","18:10"]},{"title":"Dangal","times":["12:50","16:30","20:10"]},{"title":"Silence","times":["13:30","17:00","20:30"]},{"title":"Bairavaa","times":["20:40"]},{"title":"Rogue One: A Star Wars Story","times":["14:10","17:10","20:15"]}]
// });
//
// const cinemas         = [cinema1, cinema2];
//
// for (const cinema of cinemas){
//   cinema.save(function(err, cinema){
//     if (err) return console.log(err);
//     console.log('Cinema saved!', cinema);
//   });
// }

function findCinemas(req, res){
  rp(`api.cinelist.co.uk/search/cinemas/location/london`)
  .then(htmlString => {
    const cinemas = JSON.parse(htmlString);
    return cinemas.forEach(function(cinema) {
      return addCinemasToDb(req, res, cinema);
    });
  })
  .catch(err => {
    return res.status(500).json(err);
  });

}

function addCinemasToDb(res, req, cinema){
  console.log('I work!');
  const doc = new cinema({
    'address': cinema.name,
    'id': cinema.id
  });
  doc.save((err, doc)=>{
    return console.log(`${doc} saved!`);
  });
}
// id: {type: String},
// name: {type: String},
// location: {type: String},
// lisitngs: {type: Object}
