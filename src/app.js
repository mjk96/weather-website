const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')

const app = express()

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars Engine and Views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Andrew Mead"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page - Get a Dose of Help Here!",
        name: 'Andrew Mead',
        helpText: 'We are here to help you succeed!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
        geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({ error })
                }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
}) 


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: 'Error',
        name: 'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'Page not found',
        name: 'Andrew Mead'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})