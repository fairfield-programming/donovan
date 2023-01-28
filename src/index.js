#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const parseCommandInput = require('./utility/parseCommandInput.js');

const { args, flags } = parseCommandInput.parseToFlagsAndArgs(
                            parseCommandInput.argsAsString()
                        )

if (args.length == 0) {

    // If no arguments, run the system
    require('./commands/run.js').run();

} else {

    // If argument exists, run that
    const commandPath = `./commands/${args[0]}.js`;
    const fullPath = path.join(__dirname, commandPath)

    if (!fs.existsSync(fullPath)) {

        console.log("There is no such command, '" + args[0] + "'. Please run `donovan help` for a list of available commands.")
        process.exit(-1);

    }

    require(fullPath).run({ args, flags });

}
