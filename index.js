require('dotenv').config();
const {
    readInput,
    inquirerMenu,
    pause,
    listPlaces,
} = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // show message
                const cityName = await readInput('City:');
                // search places
                const places = await searches.city(cityName);
                // select place
                const id = await listPlaces(places);
                if (id === `${places.length + 1}`) continue;
                const selectedPlace = places.find((item) => item.id === id);
                // save to db
                searches.addHistory(selectedPlace.name);
                // weather
                console.log('Loading...');
                const weather = await searches.weatherPlace(
                    selectedPlace.lat,
                    selectedPlace.lng
                );

                console.clear();
                console.log('\nCity information\n'.green);
                console.log('City:', selectedPlace.name);
                console.log('Lat:', selectedPlace.lat);
                console.log('Lng:', selectedPlace.lng);
                console.log('Temperature:', weather.temp);
                console.log('Weather:', weather.desc);
                break;
            case 2:
                searches.capitalizedHistory.forEach((item, index) => {
                    const idx = `${index + 1}.`.green;
                    console.log(`${idx} ${item}`);
                });
                break;
        }
        if (opt !== 3) await pause();
    } while (opt !== 3);
};

main();
