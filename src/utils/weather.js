const request = require('request')
const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/9575fb4f2c1873afe3c04b20cb619f5b/' + encodeURIComponent(lon) + ',' + encodeURIComponent(lat) + ''
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Invalid location! Re-enter coordinates.', undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            )      
        }
    })
}
module.exports = forecast