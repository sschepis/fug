import { FugElement } from '../parser';
import { FugRenderer } from '../renderer';
export declare class SvelteRenderer extends FugRenderer {
    get name(): string;
    createStyles(element: FugElement): string;
    createScript(element: FugElement): string;
    extractVariables(element: FugElement): string[];
    createTemplate(element: FugElement): string;
    render(element: FugElement): string;
}
