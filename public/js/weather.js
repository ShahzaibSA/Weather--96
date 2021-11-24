console.log("This is client side javascript");


const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('#weather-input');
const showLocation = document.querySelector("#location");
const showTemperature = document.querySelector('#temperature');
const showWind = document.querySelector('#wind');
const showHumidity = document.querySelector("#humidity");
const showFeels = document.querySelector("#feel_like");
const showDay = document.querySelector("#day");
const showTime = document.querySelector("#date");
const showForecastIcon = document.querySelector("#forecast-icon");

const forecast_content_1 = document.querySelector('#forecast-content-1');
const forecast_content_2 = document.querySelector('#forecast-content-2');
const forecast_content_3 = document.querySelector('#forecast-content-3');
const forecast_content_4 = document.querySelector('#forecast-content-4');
const forecast_content_5 = document.querySelector('#forecast-content-5');
const forecast_content_6 = document.querySelector('#forecast-content-6');


const temp_1 = document.querySelector("#temp-1");
const temp_2 = document.querySelector("#temp-2");
const temp_3 = document.querySelector("#temp-3");
const temp_4 = document.querySelector("#temp-4");
const temp_5 = document.querySelector("#temp-5");
const temp_6 = document.querySelector("#temp-6");

const min_temp_1 = document.querySelector('#min-temp-1');
const min_temp_2 = document.querySelector('#min-temp-2');
const min_temp_3 = document.querySelector('#min-temp-3');
const min_temp_4 = document.querySelector('#min-temp-4');
const min_temp_5 = document.querySelector('#min-temp-5');
const min_temp_6 = document.querySelector('#min-temp-6');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(weatherInput.value);

    const date = new Date();
    const day = moment(date.getTime()).format('dddd');
    const time = moment(date.getTime()).format('h:mm A');


    if (weatherInput.value.length === 0) {
        alert('Please enter address');
    } else {
        showDay.innerHTML = `Loading`
        showTime.innerHTML = `Loading`
        showLocation.innerHTML = `Loading`
        showTemperature.innerHTML = `<span style="font-size: 22px;">Loading</span>`
        showHumidity.innerHTML = `Loading`
        showFeels.innerHTML = `Loading`
        showWind.innerHTML = `Loading`

        // const url = `http://localhost:5000/weather/?address=${weatherInput.value}`;
        const url = `/weather/?address=${weatherInput.value}`;
        fetch(url).then(response => {
            response.json().then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    showDay.textContent = day
                    showTime.textContent = time
                    showLocation.textContent = data.place;
                    showTemperature.textContent = data.temperature;
                    showHumidity.textContent = `${data.humidity} %`;
                    showFeels.innerHTML = `${data.feels_like}<sup> o</sup>C`;
                    showWind.textContent = `${data.wind} km/h`

                    showForecastIcon.style.display = 'block';

                    console.log(data.weather);
                    if (data.weather === 'Clear') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-1.svg')
                    } else if (data.weather === 'Sunny') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-2.svg')
                    } else if (data.weather === 'Partly cloudy') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-3.svg')
                    } else if (data.weather === 'Light Rain') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-4.svg')
                    } else if (data.weather === 'Cloudy') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-6.svg')
                    } else if (data.weather === 'Smoke') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-7.svg')
                    } else if (data.weather === 'Haze') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-7.svg')
                    } else if (data.weather === 'Overcast') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-8.svg')
                    } else if (data.weather === 'Rain') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-10.svg')
                    } else if (data.weather === 'Heavy') {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-11.svg')
                    } else {
                        showForecastIcon.setAttribute('src', '/images/icons/icon-5.svg')
                    }


                    forecast_content_1.style.display = 'block';
                    forecast_content_2.style.display = 'block';
                    forecast_content_3.style.display = 'block';
                    forecast_content_4.style.display = 'block';
                    forecast_content_5.style.display = 'block';
                    forecast_content_6.style.display = 'block';



                    temp_1.textContent = data.temperature + 3;
                    temp_2.textContent = data.temperature + 4;
                    temp_3.textContent = data.temperature + 2;
                    temp_4.textContent = data.temperature + 1;
                    temp_5.textContent = data.temperature + 3;
                    temp_6.textContent = data.temperature + 2;

                    min_temp_1.textContent = data.temperature + 8;
                    min_temp_2.textContent = data.temperature + 11;
                    min_temp_3.textContent = data.temperature + 9;
                    min_temp_4.textContent = data.temperature + 7;
                    min_temp_5.textContent = data.temperature + 10;
                    min_temp_6.textContent = data.temperature + 8;

                    weatherInput.value = '';
                    weatherInput.focus();
                }
            });
        });
    }

})