import { FugElement } from '../parser';
import { FugRenderer } from '../renderer';
export declare class ReactRenderer extends FugRenderer {
    get name(): string;
    /**
     * create the style for the react component. Return a JS object with the style (camelCase the keys)
     * @param element
     * @returns
     */
    createStyle(element: FugElement): string;
    createMarkup(element: FugElement): string;
    /**
     *
     * @param element
     * @returns
     */
    render(element: FugElement): string;
}
