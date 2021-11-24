const request = require('postman-request');


const geocode = (location, callback) => {
    const setLocation = encodeURIComponent(location);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${setLocation}.json?access_token=pk.eyJ1Ijoic2hhaHphaWJhaG1lZHNhIiwiYSI6ImNrdHB5ZjRvdzByamIyeGw0ZXA4aTk1M3UifQ.IPiLZ1p4dl4jzTYLhdIONw&limit=1`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("No Internet Connection..!!", undefined);

        } else if (body.features.length === 0) {
            callback("Unable to find location. Try Another!", undefined);

        } else {
            callback(undefined, {
                placeName: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[0]
            });
        }
    })
}

module.exports = geocode
