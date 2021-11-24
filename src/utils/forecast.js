const request = require('postman-request');

const forecast = (location, callback) => {
    const setLocation = encodeURIComponent(location);
    const url = `http://api.weatherstack.com/current?access_key=6fd402bd9c06d173afc6a8b2c1c825ab&query=${setLocation}`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Internet Failure", undefined);
        } else if (body.success === false) {
            callback("Location Not Found", undefined);
        } else {
            const data = {
                country: body.location.country,
                place: body.location.name,
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                feels_like: body.current.feelslike,
                icon: body.current.weather_icons,
                wind: body.current.wind_speed
            };
            callback(undefined, data);
        }
    });
}

// forecast('karachi', (error, data) => {
//     console.log(error);
//     console.log(data);
// });
module.exports = forecast;