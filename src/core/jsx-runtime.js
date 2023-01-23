function jsx(tag, { children, ...other }) {

    console.log(tag)
    console.log(children)
    console.log(other)

    if (typeof tag == 'function') {

        return tag({ children, ...other });

    }

    if (tag == undefined || tag == "") return children;
    if (children == undefined) return `<${tag} />`;
    
    const childString = (Array.isArray(children)) ? children.join('') : children;

    return `<${tag}>${childString}</${tag}>`;

}

module.exports.jsx = jsx;
module.exports.jsxs = jsx;