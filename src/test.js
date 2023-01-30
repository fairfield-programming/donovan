const fs = require('fs');
const path = require('path');

const tokenizer = require('./irishman/tokenizer.js');
const rawFile = fs.readFileSync(path.join(__dirname, '../languages/c.json'), 'utf-8')
const langJson = JSON.parse(rawFile)

console.log(tokenizer(`

bool get_version(int *version, unsigned char input[], size_t size)
{

    // Check if there are at least eight bytes
    if (size < 8)
        return false;

    // Binary Byte- Indicates File is Binary
    if (input[0] != 0x89)
        return false;

    // First Letter of File Type (III)
    if (input[1] != 'I')
        return false;

    // Second Letter of File Type (III)
    if (input[2] != 'I')
        return false;

    // Third Letter of File Type (III)
    if (input[3] != 'I')
        return false;

    // Carriage Return
    if (input[4] != 0x0D)
        return false;

    // Line Feed
    if (input[5] != 0x0A)
        return false;

    // Version Number
    *version = input[6];

    // Line Feed
    if (input[7] != 0x0A)
        return false;

    // All conditions are satisfied
    return true;
}

`, langJson));