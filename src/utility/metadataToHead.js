const presets = {
    "title": (value) => {

        return [
            `<title>${value}</title>`,
            `<meta property="og:title" content="${value}" />`
        ];

    },
    "description": (value) => {

        return [
            `<meta property="og:description" content="${value}" />`
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