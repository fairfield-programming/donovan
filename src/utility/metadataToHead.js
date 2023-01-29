const { escapeAttribute } = require('../core/jsx-runtime.js')

const presets = {
    "_": (value) => {

        return [
            `<meta name="viewport" content="width=device-width, initial-scale=1" />`
        ];

    },
    "title": (value) => {

        return [
            `<title>${value}</title>`,
            `<meta property="og:title" content="${escapeAttribute(value)}" />`
        ];

    },
    "description": (value) => {

        return [
            `<meta property="og:description" content="${escapeAttribute(value)}" />`,
            `<meta name='description' content='${escapeAttribute(value)}'>`
        ];

    }
};

module.exports = (metadata) => {

    if (metadata == undefined) return undefined;

    metadata["_"] = "";

    return Object.keys(metadata).map(key => {

        const value = metadata[key];

        return (presets[key] || (() => {}))(value);

    }).flat().join('');

}