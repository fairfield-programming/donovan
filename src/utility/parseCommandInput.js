function argsAsString() {

    return process.argv.slice(2).join(' ') + ' ';

}

function parseToFlagsAndArgs(argString) {

    let i = 0;
    let state = 0;

    let args = [];
    let flags = [];

    let buffer = ``;

    while (i < argString.length) {

        const char = argString[i];

        switch (state) {

            case 0:
            
                if (char == '-') {
                    // Check if its a flag

                    state = 1;

                } else {
                    // Check if its a argument

                    buffer += char;
                    state = 2;

                }

                break;

            case 1:

                if (char == '-') {
                    // Check if its a named flag
                    state = 4;

                } else {
                    // Check if its a unnamed flag

                    state = 3;
                    buffer += char;

                }

                break;
            
            case 2:
                // For Arguments

                if (char == ' ') {

                    state = 0;
                    args.push(buffer);
                    buffer = "";
                    break;

                }

                buffer += char;

                break;
            case 3:
                // For Unnamed Flags

                if (char == ' ') {

                    state = 0;
                    flags.push(...buffer.split(''));
                    buffer = "";
                    break;
                    
                }

                buffer += char;

                break;
            case 4:
                // For Named Flags

                if (char == ' ') {

                    state = 0;
                    flags.push(buffer);
                    buffer = "";
                    break;
                    
                }

                buffer += char;

                break;

        }

        i++;

    }

    return {
        args,
        flags
    };
    
}

module.exports = {
    parseToFlagsAndArgs,
    argsAsString
}