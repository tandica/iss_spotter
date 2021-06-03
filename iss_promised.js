const request = require('request-promise-native');

const fetchMyIP = function(callback) {
    return request(`https://api.ipify.org/?format=json`);
};

const fetchCoordsByIP = function(body) {
    const ip = JSON.parse(body).ip;
    return request(`https://freegeoip.app/json/${ip}`);
  };
  
const fetchISSFlyOverTimes = function(body) {
    const dur = JSON.parse(body).duration;
    const rise = JSON.parse(body).risetime;
    console.log(JSON.parse(body).response.duration)
    return request(`http://api.open-notify.org/iss-pass.json?lat=${dur}&lon=${rise}`);
  };

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
      .then(fetchCoordsByIP)
      .then(fetchISSFlyOverTimes)
      .then((data) => {
      const { response } = JSON.parse(data);
      console.log(response);
      return response;
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };