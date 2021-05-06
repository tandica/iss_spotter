const request = require('request');

const fetchMyIP = function(callback) {

    request(`https://api.ipify.org/?format=json`, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        } 
        
        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }
        
        let address = JSON.parse(body);
        if (address) {
            callback(null, address.ip)
        }
    });

}


const fetchCoordsByIP = function(callback) {
    request(`https://freegeoip.app/json/`, (error, response, body) => {
        if (error) {
            callback(error, null);
            return;
        } 

        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} with invaild IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        }

        const { latitude, longitude } = JSON.parse(body);
        callback(null, { latitude, longitude });
    });
}


const fetchISSFlyOverTimes = function(coords, callback) {
    request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
        if (error) {
            callback(null, error);
            return;
        }

        if (response.statusCode !== 200) {
            const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
            callback(Error(msg), null);
            return;
          }

        const position = JSON.parse(body).response;
        callback(null, position);
        }); 
  };
  

  const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
        if (error) {
            callback(error, null);
        }

        fetchCoordsByIP((error, coordinates) => { //they used an ip param as well
            if (error) {
                callback(error, null);
            }

            fetchISSFlyOverTimes(coordinates, (error, nextPasses) => {
                if (error) {
                    callback(error, null);
                }
                callback(null, nextPasses);
            });
        });
    });
  }

  module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };