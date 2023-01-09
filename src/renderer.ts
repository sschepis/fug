/*
    A Fug renderer is an object that can render a Fug element to some output format. The renderer is responsible for generating the HTML, CSS and Javascript for the Fug element and its children.
*/
import { FugElement } from "./parser";

import { HtmlRenderer } from "./renderers/html";

/**
 * a Fug renderer is an object that can render a Fug element to some output format. The renderer is 
 * responsible for generating the HTML, CSS and Javascript for the Fug element and its children.
 */
export abstract class FugRenderer {
    _name: string;
    constructor(name: string) { this._name = name; }
    get name(): string { return this._name; }
    abstract render(element: FugElement): string;
}

/**
 * This class manages the renderers available to the Fug compiler. It is responsible for managing 
 * the renderers active in the system and for delegating the rendering of a Fug element to the
 * appropriate renderer.
 */
export class FugRenderers {
    renderers: FugRenderer[] = [];
    add(renderer: FugRenderer) { this.renderers.push(renderer); }
    get(rendererName: string): FugRenderer | undefined {
        return this.renderers.find(r => r.constructor.name === rendererName);
    }
    render(element: FugElement, rendererName: string): string {
        const renderer = this.renderers.find(r => r.constructor.name === rendererName);
        if (!renderer) { throw new Error(`No renderer found for ${rendererName}`); }
        return renderer.render(element);
    }
}

// create an instance of the renderers class and add the HTML renderer to it
const renderers = new FugRenderers();
renderers.add(new HtmlRenderer('html'));

export { renderers };