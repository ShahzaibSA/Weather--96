const request = require('postman-request');

const forecast = (location, callback) => {
    const setLocation = encodeURIComponent(location);
    // const url = `http://api.weatherstack.com/current?access_key=6fd402bd9c06d173afc6a8b2c1c825ab&query=${setLocation}`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${setLocation}&units=metric&appid=df48ee240d363c4c5417321a6eafcc22`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Internet Failure", undefined);
        } else if (body.cod == '404') {
            callback(body.message ? body.message : "Location Not Found", undefined);
        } else {
            const data = {
                //! WeatherStack Api data
                // place: body.request.query,
                // weather: body.current.weather_descriptions[0],
                // temperature: body.current.temperature,
                // humidity: body.current.humidity,
                // feels_like: body.current.feelslike,
                // wind: body.current.wind_speed,

                //! OpenWeather Api data
                place: `${body.name}, ${body.sys.country}`,
                weather: body.weather[0].main,
                humidity: body.main.humidity,
                wind: Math.round(body.wind.speed),
                temperature: Math.round(body.main.temp_min),
                feels_like: Math.round(body.main.feels_like)
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