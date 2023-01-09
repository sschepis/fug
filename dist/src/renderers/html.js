"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlRenderer = void 0;
const renderer_1 = require("../renderer");
/*
    The HTML renderer is responsible for rendering a Fug element to static  HTML WebComponent. The HTML renderer is responsible for generating the HTML and CSS for the Fug element and its children.
    To render an element into HTML, the renderer takes the following steps:
    1. Create the component style
    2. Create the component markup
*/
class HtmlRenderer extends renderer_1.FugRenderer {
    get name() { return 'html'; }
    /**
     * create the style for the WebComponent
     * @param element
     * @returns
     */
    createStyle(element) {
        const style = element.children ? element.children.find((child) => child.name === 'style') : null;
        if (!style) {
            return '';
        }
        return `<style>${style.content}</style>`;
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
        if (element.name === 'style') {
            return '';
        }
        return `${this.createStyle(element)}${this.createMarkup(element)}`;
    }
}
exports.HtmlRenderer = HtmlRenderer;
