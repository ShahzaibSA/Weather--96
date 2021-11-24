const path = require('path');
const express = require('express');
const request = require('postman-request');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 5000;

const publicDirectoryPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({ error: 'Please enter your address!' });
    }
    forecast(address, (error, { place, weather, temperature, humidity, feels_like, wind } = {}) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            place,
            weather,
            temperature,
            humidity,
            feels_like,
            wind
        });
    })
});

app.get('/news', (req, res) => {
    res.render('news')
})

app.get('/live-cameras', (req, res) => {
    res.render('live-cameras')
})

app.get('/photos', (req, res) => {
    res.render('photos')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})


app.listen(port, () => {
    console.log('Server is Running..!!');
});