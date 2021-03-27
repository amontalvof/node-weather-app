const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');

const main = async () => {
    let opt;

    do {
        const opt = await inquirerMenu();
        if (opt === 3) {
            break;
        }
        await pause();
    } while (true);
};

main();
