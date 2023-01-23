export default (type, args, ...children) => {

    let attributes = Object.keys(args || {}).map(i => {

        const value = args[i]
        return `${i}="${value}"`

    })

    if (attributes != "") attributes = " " + attributes;

    return `<${type}${attributes}>${children.join('')}</${type}>`

}