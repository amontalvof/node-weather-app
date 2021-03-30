require('dotenv').config();
const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
    const searches = new Searches();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const place = await readInput('City:');
                await searches.city(place);
                // console.log('\nCity information\n'.green);
                // console.log('City:');
                // console.log('Lat:');
                // console.log('Lng:');
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
