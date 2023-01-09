import { FugElement } from '../parser';
import { FugRenderer } from '../renderer';

/*
    The HTML renderer is responsible for rendering a Fug element to static  HTML WebComponent. The HTML renderer is responsible for generating the HTML and CSS for the Fug element and its children. 
    To render an element into HTML, the renderer takes the following steps:
    1. Create the component style
    2. Create the component markup
*/
export class HtmlRenderer extends FugRenderer {
    get name() { return 'html'; }
    /**
     * create the style for the WebComponent
     * @param element 
     * @returns 
     */
    createStyle(element: FugElement): string {
        const style = element.children ? element.children.find((child: any) => child.name === 'style') : null;
        if (!style) { return ''; }
        return `<style>${style.content}</style>`;
    }
    createMarkup(element: FugElement): string {
        let attributes: any = element.attributes || {};
        let children = element.children ? element.children.map((child: any) => this.render(child)).join('\n') : '';
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
    render(element: FugElement): string {
        if (element.name === 'style') { return ''; }
        return `${this.createStyle(element)}${this.createMarkup(element)}`;
    }
}