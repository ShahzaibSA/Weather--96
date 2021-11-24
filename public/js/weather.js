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
        // showForecastIcon.innerHTML = `Loading`

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
                }
            });
        });
    }

})