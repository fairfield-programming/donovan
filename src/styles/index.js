const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

//absolute path to public folder
const publicPath = path.resolve(process.cwd(), './public/tailwind');

function installTailwind() {
    if (!fs.existsSync(publicPath)) {
        console.log("Creating tailwind directory...");
        fs.mkdirSync(publicPath);
    }
}

function addConfig() {
    if (!fs.existsSync(path.resolve(publicPath + '/tailwind.config.js'))) {
        fs.copyFile(process.cwd() + '/src/styles/tailwind.config.js', path.resolve(publicPath + '/tailwind.config.js'), (err) => {
            if (err) throw err;
            console.log('manual config pasted to public');
        });
    }
}

function addStyleDirectives() {
    if (!fs.existsSync(path.resolve(publicPath + '/styles.css'))) {
        fs.copyFile(process.cwd() + '/src/styles/styles.css', path.resolve(publicPath + '/styles.css'), (err) => {
            if (err) throw err;
            console.log('manual styles directives pasted to public');
        });
    }
}

function generateOutputFile() {
    if (!fs.existsSync(path.resolve(publicPath + '/output.css'))) {
        try {
            fs.writeFileSync(path.resolve(publicPath + '/output.css'), '');
            console.log('output.css created');

            //double quotes are needed for eliminating errors due to white space in path.
            execSync('npx tailwindcss -i ' + `\"${path.join(publicPath, 'styles.css')}\"` + ' -o ' + `\"${path.join(publicPath, 'output.css')}\"`);

            console.log('output.css generated: ' + `\"${path.join(publicPath, 'output.css')}\"`);
        } catch (err) {
            throw Error(err);
        }
    }
}

function generateTailwind() {

    //function calls are wrapped in a promise to ensure that they are executed in order.
    Promise.all([
        installTailwind(),
        addConfig(),
        addStyleDirectives(),
    ]).then(res => {
        generateOutputFile();
    })
}

module.exports = {
    generateTailwind
}