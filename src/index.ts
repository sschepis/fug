import { FugElement } from "./parser";
import Fug from "./parser";
import { FugRenderers, renderers } from "./renderer";
import fs from 'fs';

// import all the renderers from the renderers directory
const files = fs.readdirSync('./src/renderers');
for (const file of files) {
    if (file.endsWith('.ts')) {
        const renderer = require(`./renderers/${file}`);
        renderers.add(new renderer[Object.keys(renderer)[0]]());
    }
}

function compile(fugLayout: string, rendererType: string): string {
    const fug = new Fug(fugLayout);
    const renderer = renderers.get(rendererType);
    if (renderer) {
        return renderer.render(fug.element);
    }
    throw new Error(`Renderer ${rendererType} not found`); 
}

export { FugElement, Fug, FugRenderers, compile, renderers };