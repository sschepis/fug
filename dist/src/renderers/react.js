"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactRenderer = void 0;
const renderer_1 = require("../renderer");
/*
    The React renderer is responsible for generating a React component from the Fug element and its children. For details
    see the markdown file ./docs/REACT.md
*/
class ReactRenderer extends renderer_1.FugRenderer {
    get name() { return 'react'; }
    /**
     * create the style for the react component. Return a JS object with the style (camelCase the keys)
     * @param element
     * @returns
     */
    createStyle(element) {
        function camelCase(str) {
            return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        }
        let style = {};
        let attributes = element.attributes || {};
        let children = element.children ? element.children.map((child) => this.createStyle(child)).join('\n') : '';
        Object.keys(attributes).forEach(key => {
            if (key.startsWith('style-')) {
                style[camelCase(key.replace('style-', ''))] = attributes[key];
            }
        });
        style = Object.keys(style)
            .map(key => `${key}: '${style[key]}'`)
            .join(', ');
        return `<style>${element.name} { ${style} }${children}</style>`;
    }
    createMarkup(element) {
        let attributes = element.attributes || {};
        let children = element.children ? element.children.map((child) => this.render(child)).join('\n') : '';
        attributes = Object.keys(attributes)
            .map(key => `${key}="${attributes[key]}"`)
            .join(' ');
        return `<${element.name} ${attributes}>${children}</${element.name}>`;
    }
    /**
     *
     * @param element
     * @returns
     */
    render(element) {
        let attributes = element.attributes || {};
        let children = element.children ? element.children.map((child) => this.render(child)).join('\n') : '';
        let style = this.createStyle(element);
        let markup = this.createMarkup(element);
        let props = Object.keys(attributes)
            .map(key => `${key}={${attributes[key]}}`)
            .join(', ');
        return `<${element.name} ${props}>${style}${markup}</${element.name}>`;
    }
}
exports.ReactRenderer = ReactRenderer;
