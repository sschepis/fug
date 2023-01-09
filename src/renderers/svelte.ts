import { FugElement } from '../parser';
import { FugRenderer } from '../renderer';

/*
    The React renderer is responsible for generating a React component from the Fug element and its children. For details
    see the markdown file ./docs/REACT.md
*/

export class SvelteRenderer extends FugRenderer {
    get name() { return 'svelte'; }
    createStyles(element: FugElement): string {
        let styles = '';
        if (element.children) {
            for (const child of element.children) {
                styles += this.createStyles(child);
            }
        }
        // iterate through the attributes and create a style for each style- attribute
        if (element.attributes) {
            for (const key in element.attributes) {
                if (key.startsWith('style-')) {
                    styles += `
                    .${element.id} {
                        ${key.replace('style-', '')}: ${element.attributes[key]};
                    }
                    `;
                }
            }
        }
        if (element.styles) {
            styles += `
            .${element.id} {
                ${element.styles}
            }
            `;
        }
        return styles;
    }

    createScript(element: FugElement): string {
        return `
        export let ${this.extractVariables(element).join(", ")}
        let ${this.extractVariables(element).map((variable: any) => `${variable}Defaults`).join(", ")}
        onMount(() => {
            ${this.extractVariables(element).map((variable: any) => `${variable} = { ...${variable}Defaults, ...${variable} }`).join("\n")}
        })
        function ${element.event}() {
            dispatch('${element.event}', ${this.extractVariables(element).join(", ")})
        }
        `;
    }
    extractVariables(element: FugElement): string[] {
        let variables: string[] = [];
        if (element.children) {
            for (const child of element.children) {
                variables = [...variables, ...this.extractVariables(child)];
            }
        }
        if (element.attributes) {
            for (const key in element.attributes) {
                if (key.startsWith('bind:')) {
                    variables.push(key.replace('bind:', ''));
                }
            }
        }
        return variables;
    }
    createTemplate(element: FugElement): string {
        let template = '';
        if (element.children) {
            for (const child of element.children) {
                template += this.createTemplate(child);
            }
        }
        if (element.type === 'div') {
            template += `
            <div class="${element.id}">
                ${element.content}
            </div>
            `;
        }
        if (element.type === 'input') {
            template += `
            <input type="${element.type}" id="${element.id}" placeholder="${element.content}" bind:value={${element.id}} />
            `;
        }
        if (element.type === 'button') {
            template += `
            <button class="${element.id}" on:click={${element.event}}>${element.content}</button>
            `;
        }
        return template;
    }
    render(element: FugElement): string {
        return `
        <script lang="ts">
            import { onMount } from 'svelte';
            import { createEventDispatcher } from 'svelte';
            ${this.createScript(element)}
            // create an event dispatcher
            const dispatch = createEventDispatcher();
        </script>
        <style>
            ${this.createStyles(element)}
        </style>
        ${this.createTemplate(element)}
        `;
    }
}