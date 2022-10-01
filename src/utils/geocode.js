const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGlzdHJvbngiLCJhIjoiY2w4OW1oZ2s1MDhldjN4bjNoanVrbDc3NSJ9.BPnSyYgcd4_PbdEGudz4BQ&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to geolocation service.', undefined)
        }
        else if(body.features.length === 0) {
            callback('Location not found.', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode