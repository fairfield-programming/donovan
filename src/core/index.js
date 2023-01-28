function addScriptBit(data) {

    if (global.scriptBits == undefined) global.scriptBits = [];
    global.scriptBits.push(data);

}

function useState(initial) {

    addScriptBit(`console.log("This is a test");`);

}

module.exports = useState;