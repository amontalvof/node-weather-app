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

    async city(place = '') {
        try {
            // http request
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox,
            });
            const resp = await instance.get();

            console.log(resp.data);
            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

module.exports = Searches;
