const path = require('path');

function createTailwind() {
    console.log("Generating Tailwind CSS...");
    const { generateTailwind } = require(path.join(global.templateDir, "styles/index.js"));

    if (typeof generateTailwind === "function") generateTailwind();
    else console.log("##### No Tailwind CSS generator function found. #####");
    return;
}

module.exports = {
    createTailwind
};