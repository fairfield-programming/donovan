const { escapeAttribute } = require('../core/jsx-runtime.js')

const presets = {
    
    "title": (value) => {

        return [
            `<title>${value}</title>`,
            `<meta property="og:title" content="${escapeAttribute(value)}" />`
        ];

    },
    "description": (value) => {

        return [
            `<meta property="og:description" content="${escapeAttribute(value)}" />`
        ];

    }
};

module.exports = (metadata) => {

    if (metadata == undefined) return undefined;

    return Object.keys(metadata).map(key => {

        const value = metadata[key];

        return (presets[key] || (() => {}))(value);

    }).flat().join('');

}