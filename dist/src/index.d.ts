import { FugElement } from "./parser";
import Fug from "./parser";
import { FugRenderers, renderers } from "./renderer";
declare function compile(fugLayout: string, rendererType: string): string;
export { FugElement, Fug, FugRenderers, compile, renderers };
