function renderAttribute(key, value) {

    return `${key}="${value}"`;

}

function renderAttributes(attributes) {

    return Object.keys(attributes).map(i => renderAttribute(i, attributes[i]))

}

function jsx(tag, { children, ...attributes }) {

    if (typeof tag == 'function') {

        return tag({ children, ...attributes });

    }

    if (tag == undefined || tag == "") return children;
    if (children == undefined) return `<${tag} ${renderAttributes(attributes)} />`;
    
    const childString = (Array.isArray(children)) ? children.join('') : children;

    return `<${tag} ${renderAttributes(attributes)}>${childString}</${tag}>`;

}

module.exports.jsx = jsx;
module.exports.jsxs = jsx;