function escapeAttribute(value) {

    return value.replace(/\n/g, '\\n').replace(/\"/g, "&quot;");

}

function renderAttribute(key, value) {

    return `${key}="${escapeAttribute(value)}"`;

}

function renderAttributes(attributes) {

    return Object.keys(attributes).map(i => renderAttribute(i, attributes[i]))

}

function jsx(tag, { children, ...attributes }) {

    if (tag == undefined) {

        if (children == undefined) return;

        const childString = (Array.isArray(children)) ? children.flat().join('') : children;
        return childString;

    } 

    if (typeof tag == 'function') {

        return tag({ children, ...attributes });

    }

    if (children == undefined) {
        
        if (Object.keys(attributes).length == 0) return `<${tag} />`
        return `<${tag} ${renderAttributes(attributes)} />`;
    
    }
    
    const childString = (Array.isArray(children)) ? children.flat().join('') : children;
    if (Object.keys(attributes).length == 0) return `<${tag}>${childString}</${tag}>`
    return `<${tag} ${renderAttributes(attributes)}>${childString}</${tag}>`;

}

module.exports.jsx = jsx;
module.exports.jsxs = jsx;
module.exports.escapeAttribute = escapeAttribute;