const fs = require('fs');
const path = require('path');
const { defaultRepoConfig } = require('../config/repoConfig.js');

const initTemplates = {
    'config': async () => {

        const githubPath = path.join(process.cwd(), '.github');
        if (!fs.existsSync(githubPath)) fs.mkdirSync(githubPath);

        const configPath = path.join(process.cwd(), '.github', 'donovan.json');
        if (fs.existsSync(configPath)) {

            console.log("The config file already exists. If you want to overwrite it, please delete it and rerun the command.");
            process.exit(-1);

        }

        // Create the Default Config and Make it Human Readable
        const jsonData = await defaultRepoConfig();
        const fileData = JSON.stringify(jsonData, null, 4);

        // Create the File and Put the Default Config in It
        fs.writeFileSync(configPath, fileData);

    },
    'actions': () => {

        // TODO: Implement a command to install actions automatically
        console.log("TODO!")

    }
}

function run({ args, flags }) {

    // Check If We Have Enough Arguments
    if (args.length == 0) return;
    if (args.length == 1) return initTemplates['config']();

    // Find the Template Name
    const configTemplate = args[1];

    // Check if the Template Exists
    if (initTemplates[configTemplate] == undefined) {

        console.log("Template Not Found");
        process.exit(-1);

    }

    // Then Run the Template
    initTemplates[configTemplate]();

}

module.exports = {
    name: "Init",
    description: "Setup a donovan project in seconds with this command.",
    usage: [
        "donovan help",
        "donovan help [command]"
    ],
    run: run
};