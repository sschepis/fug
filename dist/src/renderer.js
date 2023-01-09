"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderers = exports.FugRenderers = exports.FugRenderer = void 0;
const html_1 = require("./renderers/html");
/**
 * a Fug renderer is an object that can render a Fug element to some output format. The renderer is
 * responsible for generating the HTML, CSS and Javascript for the Fug element and its children.
 */
class FugRenderer {
    constructor(name) { this._name = name; }
    get name() { return this._name; }
}
exports.FugRenderer = FugRenderer;
/**
 * This class manages the renderers available to the Fug compiler. It is responsible for managing
 * the renderers active in the system and for delegating the rendering of a Fug element to the
 * appropriate renderer.
 */
class FugRenderers {
    constructor() {
        this.renderers = [];
    }
    add(renderer) { this.renderers.push(renderer); }
    get(rendererName) {
        return this.renderers.find(r => r.constructor.name === rendererName);
    }
    render(element, rendererName) {
        const renderer = this.renderers.find(r => r.constructor.name === rendererName);
        if (!renderer) {
            throw new Error(`No renderer found for ${rendererName}`);
        }
        return renderer.render(element);
    }
}
exports.FugRenderers = FugRenderers;
// create an instance of the renderers class and add the HTML renderer to it
const renderers = new FugRenderers();
exports.renderers = renderers;
renderers.add(new html_1.HtmlRenderer('html'));
