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
                const selectedPlace = places.find((item) => item.id === id);

                console.log('\nCity information\n'.green);
                console.log('City:', selectedPlace.name);
                console.log('Lat:', selectedPlace.lat);
                console.log('Lng:', selectedPlace.lng);
                // console.log('Temperature:');
                // console.log('Minimum:');
                // console.log('Maximum:');
                break;
            case 2:
                break;
        }
        if (opt !== 3) await pause();
    } while (opt !== 3);
};

main();
