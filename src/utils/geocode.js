const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiemVtb2siLCJhIjoiY2sxOGE0YjlmMGRoYTNqa2d1NzJvNWl0ZCJ9.eeTZcv9aGFtzcte6pSKomA&limit=1'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found!', undefined)
        } else if (body.message === "Not Authorized - Invalid Token") {
            callback('Not authorized for location services - check API token', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode