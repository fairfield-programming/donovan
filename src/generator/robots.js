const fs = require('fs');
const path = require('path');

function generateRobotTxtContents() {

    return [
        `User-agent: *`,
        `Allow: /`,
        `Sitemap: /sitemap/sitemap-index.xml`
    ].join('\n')

}

function generateRobotTxt() {

    fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), generateRobotTxtContents());

}

module.exports.generateRobotTxtContents = generateRobotTxtContents;
module.exports.generateRobotTxt = generateRobotTxt;