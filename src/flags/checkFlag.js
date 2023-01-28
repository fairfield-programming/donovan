const fs = require('fs');
const pkg = require('../../package.json');
const path = require("path");
const { findRepoConfig } = require('../config');

global.templateDir = path.join(process.cwd(), "template");

function getHelpMenu() {
    console.log('====================================');
    console.log('\tHelp Menu');
    console.log('====================================\n');
    console.log("Usage: npx donovan");
    console.log("Use Commands: donovan --[full flag name] or donovan -[short flag name]");
    console.log(`
    Commands: 
        \n--help or -h: Shows usable commands
        \n--about or -v: Shows version and author information
        \n--init or i: Initializes the config file
        \n--clean or -c: Removes the public and template from directory`);
};

function getVersionInfo() {
    console.log(pkg.version);
};

async function generateConfig() {
    console.log("Generating Config File...");

    //code to generate config file
    const config = await findRepoConfig();
    writeConfig(config);
};

function writeConfig(config) {
    if (!fs.existsSync(process.cwd().toString() + '/.github')) {
        fs.mkdirSync(process.cwd().toString() + '/.github');
        console.log("Github Directory Created");
    } else {
        console.log("Github Directory Already Exists");
    }

    if (!fs.existsSync(process.cwd().toString() + '/.github/donovan.json')) {
        fs.writeFileSync(process.cwd().toString() + '/.github/donovan.json', JSON.stringify(config, null, '\n'));
        console.log("Config file Created");
    } else {
        console.log("Config file Already Exists");
    }
};

async function removePublicAndTemplate() {
    console.log("Removing Public and Template...");
    await remove("public");
    await remove("template");
};

function remove(distName) {

    if (fs.existsSync(process.cwd().toString() + '/' + distName)) {
        fs.rm(path.join(process.cwd(), distName), { force: true, recursive: true }, (err) => {
            if (err) {
                console.log("######### Error: " + err + " #########");
            }
        });
        console.log(distName + " Directory Removed");
    } else {
        console.log(distName + " Directory not found");
    }
};


function checkFlag(flag) {
    switch (flag) {
        case "--help":
            getHelpMenu();
            break;
        case "-h":
            getHelpMenu();
            break;
        case "-v":
            getVersionInfo();
            break;
        case "--about":
            getVersionInfo();
            break;
        case "--init":
            generateConfig();
            break;
        case "i":
            generateConfig();
            break;
        case "--clean":
            removePublicAndTemplate();
            break;
        case "-c":
            removePublicAndTemplate();
            break;

        default:
            console.log("########## Error: Invalid command " + flag + " ##########");
            break;
    }
};

module.exports = {
    checkFlag,
}