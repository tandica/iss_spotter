const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP((error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked!', coordinates);
// });

// const currCoords = { latitude: '43.6532', longitude: '-79.3832' };


// fetchISSFlyOverTimes(currCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work" , error);
//     return;
//   }

//   console.log('It worked! Here are the fly over times:' , passTimes);
// });


const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  
  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    printPassTimes(passTimes);
  });