import { FugElement } from '../parser';
import { FugRenderer } from '../renderer';
export declare class HtmlRenderer extends FugRenderer {
    get name(): string;
    /**
     * create the style for the WebComponent
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
