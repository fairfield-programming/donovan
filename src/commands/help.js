const fs = require('fs');
const path = require('path');

function run(parameters, flags) {

    const commandsPath = path.join(__dirname);
    const commandFiles = fs.readdirSync(commandsPath);
    const commandData = commandFiles.map((fileName) => {

        const filePath = path.join(commandsPath, fileName);
        
        return { ...require(filePath), command: fileName.slice(0, -3) };

    })

    commandData.forEach((item, i) => {

        console.log(`\`${item.command}\` - ${item.name}`);
        console.log(` ${item.description}`);
        console.log(` `);

    })
    
    return 0;

}

module.exports = {
    name: "Help",
    description: "Get information about how to use the Donovan CLI.",
    usage: [
        "donovan help",
        "donovan help [command]"
    ],
    run: run
};