#!/usr/bin/env node

const { findRepoConfig, createBabelConfig, createNPMConfig, installDependencies } = require('./config/index.js');
const { downloadFromGitUrl, cleanupAfterTemplate } = require('./template/download.js');
const runTemplate = require('./generator/index.js');
const { checkFlag } = require('./flags/checkFlag.js');

const fs = require('fs');
const path = require('path');

global.templateDir = path.join(process.cwd(), "template");

(async() => {

    try {

        if (process.argv.length > 2) {
            console.log("Checking Flags " + process.argv[2] + "...");
            checkFlag(process.argv[2]);
        } else {
            const config = await findRepoConfig();
            global = {...global, project: config };

            console.log("Downloading Template from Git Url...");
            await downloadFromGitUrl(global.project.template);
            console.log("Generating Pages from Template...");
            await runTemplate();
            console.log("Cleaning Up Leftover Assets...");
            await cleanupAfterTemplate();
        }

    } catch (e) {

        console.log(e);
        process.exit(1);

    };

})()