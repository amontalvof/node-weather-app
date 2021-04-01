const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Search city`,
            },
            {
                value: 2,
                name: `${'2.'.green} Search history`,
            },
            {
                value: 3,
                name: `${'3.'.green} Exit`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log('========================'.green);
    console.log('   Select an option'.white);
    console.log('========================\n'.green);

    const { option } = await inquirer.prompt(questions);
    return option;
};

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`,
        },
    ];
    console.log('\n');
    await inquirer.prompt(question);
};

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a value.';
                }
                return true;
            },
        },
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
};

const listPlaces = async (places = []) => {
    const choices = places.map((item, index) => {
        const idx = `${index + 1}.`.green;
        return {
            value: item.id,
            name: `${idx} ${item.name}`,
        };
    });

    choices.push({
        value: `${places.length + 1}`,
        name: `${places.length + 1}.`.green + ' Cancel',
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select place:',
            choices,
        },
    ];

    const { id } = await inquirer.prompt(questions);

    return id;
};

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
};
