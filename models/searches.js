const axios = require('axios');
class Searches {
    history = ['Madrid', 'San José'];

    constructor() {
        // TODO: leer db si existe
    }

    get paramsMapbox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'en',
        };
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
        };
    }

    async city(place = '') {
        try {
            // http request
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox,
            });
            const resp = await instance.get();
            return resp.data.features.map((item) => ({
                id: item.id,
                name: item.place_name,
                lng: item.center[0],
                lat: item.center[1],
            }));
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async weatherPlace(lat, lon) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    ...this.paramsOpenWeather,
                    lat,
                    lon,
                },
            });
            const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                temp: `${main.temp}${String.fromCharCode(176)}C`,
            };
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Searches;
