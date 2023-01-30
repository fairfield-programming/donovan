const fs = require('fs');
const path = require('path');

function run({ args, flags }) {

    // Get the version from Package.json
    const packageRaw = fs.readFileSync(path.join(__dirname, '../../package.json'));
    const packageData = JSON.parse(packageRaw);

    // Get all of the languages
    const langs = fs.readdirSync(path.join(__dirname, "../../languages/"));
    const langData = langs.map(i => {

        return require(path.join(__dirname, "../../languages/", i));

    });

    // Print out all of the information about the languages
    console.log(`Donovan, as of ${packageData.version}, supports the following languages:`);

    langData.forEach(i => {

        console.log(` ${i.emoji} ${i.name}`);
        console.log(`${i.description}`);
        console.log();

    });
    
    return 0;

}

module.exports = {
    name: "Languages",
    description: "List and get information about the languages that Donovan officially supports.",
    usage: [
        "donovan lang",
        "donovan lang [language name]"
    ],
    run: run
};