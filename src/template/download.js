const { exec } = require("child_process");
const fs = require("fs")
const path = require("path");

function downloadFromGitUrl(url) {

    return new Promise((resolve, reject) => {
        
        exec(`git clone ${url} template`, (error, stdout, stderr) => {
            
            if (error) return resolve(error.message);
            if (stderr) return resolve(stderr);
            resolve(stdout);

        });
        
    });

}

function cleanupAfterTemplate() {

    fs.rmSync(path.join(process.cwd(), "template"), { force: true, recursive: true });

}

module.exports = {
    downloadFromGitUrl,
    cleanupAfterTemplate
}