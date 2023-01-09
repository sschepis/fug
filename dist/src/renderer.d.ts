import { FugElement } from "./parser";
/**
 * a Fug renderer is an object that can render a Fug element to some output format. The renderer is
 * responsible for generating the HTML, CSS and Javascript for the Fug element and its children.
 */
export declare abstract class FugRenderer {
    _name: string;
    constructor(name: string);
    get name(): string;
    abstract render(element: FugElement): string;
}
/**
 * This class manages the renderers available to the Fug compiler. It is responsible for managing
 * the renderers active in the system and for delegating the rendering of a Fug element to the
 * appropriate renderer.
 */
export declare class FugRenderers {
    renderers: FugRenderer[];
    add(renderer: FugRenderer): void;
    get(rendererName: string): FugRenderer | undefined;
    render(element: FugElement, rendererName: string): string;
}
declare const renderers: FugRenderers;
export { renderers };
