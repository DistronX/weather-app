const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ambuj Gupta'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ambuj Gupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Documentation! This page can help you if you like tldrs. If you have a question rtfm.',
        name: 'Ambuj Gupta'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No address provided.',
            Hint: 'Use something like ?address=New%20York'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, place_name} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(longitude, latitude, (error, {weather_description, current_temp} = {}) => {
            if(error) {
                return res.send({
                    error
                })
            }

            res.send({
                weather_description,
                current_temp,
                place_name
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server Started on Port ' + port)
})