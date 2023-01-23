// "use strict";

// var Renderer = require('./runtime/renderer');
// var Interpreter = require('./runtime/interpreter');
// var renderers = {};

// var jsx = {
//   register: function registerRenderer(name, config) {
//     name = name.toLowerCase();

//     var interpreter = new Interpreter(name, config.tags);
//     var renderer = new Renderer(interpreter, {
//       before: config.before,
//       after: config.after,
//       process: config.process
//     });

//     renderers[name] = renderer;
//     return renderer;
//   },

//   render: function renderJSXTree(tree, renderer) {
//     renderer = renderer.toLowerCase();
//     renderer = renderer && renderers[renderer];

//     if (!renderer) {
//       throw new Error('Renderer [' + renderer + '] not found');
//     }

//     return renderer.render(tree);
//   }
// };

// module.exports = jsx;

module.exports.jsx = (tag, { children, ...other }) => {

    if (tag == undefined || tag == "") return children;
    if (children == undefined) return `<${tag} />`;
    
    return `<${tag}>${children}</${tag}>`;

};

module.exports.jsxs = (tag, { children, ...other }) => {

    if (tag == undefined || tag == "") return children.join('');
    if (children == undefined) return `<${tag} />`;

    return `<${tag}>${children.join('')}</${tag}>`

};