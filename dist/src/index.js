"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderers = exports.compile = exports.FugRenderers = exports.Fug = void 0;
const parser_1 = __importDefault(require("./parser"));
exports.Fug = parser_1.default;
const renderer_1 = require("./renderer");
Object.defineProperty(exports, "FugRenderers", { enumerable: true, get: function () { return renderer_1.FugRenderers; } });
Object.defineProperty(exports, "renderers", { enumerable: true, get: function () { return renderer_1.renderers; } });
const fs_1 = __importDefault(require("fs"));
// import all the renderers from the renderers directory
const files = fs_1.default.readdirSync('./src/renderers');
for (const file of files) {
    if (file.endsWith('.ts')) {
        const renderer = require(`./renderers/${file}`);
        renderer_1.renderers.add(new renderer[Object.keys(renderer)[0]]());
    }
}
function compile(fugLayout, rendererType) {
    const fug = new parser_1.default(fugLayout);
    const renderer = renderer_1.renderers.get(rendererType);
    if (renderer) {
        return renderer.render(fug.element);
    }
    throw new Error(`Renderer ${rendererType} not found`);
}
exports.compile = compile;
