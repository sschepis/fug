"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fug = void 0;
class Fug {
    static compile(code, options) {
        const { controller, view } = Fug.parse(code);
        function generateScriptAndStyle(controller, javascriptOptions) {
            const { name, ...style } = javascriptOptions;
            const styleString = (style) => {
                return Object.keys(style)
                    .map((key) => `${key}: ${style[key]}`)
                    .join('; ');
            };
            const scriptString = `<script>
                import { createEventDispatcher } from 'svelte'
                const dispatch = createEventDispatcher()
                export let ${name} = {
                    ${controller.join('')}
                }
                let ${name}Defaults = {
                    ${controller.join('')}
                }
                onMount(() => {
                    ${name} = { ...${name}Defaults, ...${name} }
                })
                function ${name}() {
                    dispatch('${name}', ${name})
                }
            </script>`;
            return {
                script: scriptString,
                style: `<style name = "${name}">${styleString(style)}</style>`
            };
        }
        const { script, style } = generateScriptAndStyle(controller, options);
        return {
            script,
            style,
            view: view.join('')
        };
    }
    static generateAttributes(attributes) {
        return Object.keys(attributes)
            .map((key) => `${key}="${attributes[key]}"`)
            .join(' ');
    }
    static generateChildren(children) {
        if (children) {
            return children.join('');
        }
        return '';
    }
    static parse(code) {
        const parsed = Fug.parseElement(code, Fug.regex);
        const controller = [];
        const view = [];
        parsed.forEach((node) => {
            const { tag, attributes, children } = node;
            if (tag === 'style') {
                controller.push(`${attributes.name}: ''`);
            }
            else {
                view.push(`<${tag} ${Fug.generateAttributes(attributes)}>${Fug.generateChildren(children)}</${tag}>`);
            }
        });
        return { controller, view };
    }
    static parseElement(code, regex) {
        const parsed = [];
        let match;
        while ((match = regex.exec(code))) {
            const [full, tag, attributes, children] = match;
            parsed.push({
                tag,
                attributes: Fug.parseAttributes(attributes),
                children: Fug.parseChildren(children)
            });
        }
        return parsed;
    }
    static parseAttributes(attributes) {
        const parsed = {};
        if (attributes) {
            attributes.split(';').forEach((attribute) => {
                const [key, value] = attribute.split('=');
                parsed[key] = value;
            });
        }
        return parsed;
    }
    static parseChildren(children) {
        if (children) {
            return Fug.parseElement(children, Fug.regex);
        }
        return [];
    }
}
exports.Fug = Fug;
// parse fug code into a tree
Fug.regex = /([a-zA-Z0-9]+)(?:\s*\(([^)]*)\))?(?:\s*\[(.*)\])?/g;
