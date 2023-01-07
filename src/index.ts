export class Fug {

    static compile(code: string, options: any) {
        const { controller, view } = Fug.parse(code)
        function generateScriptAndStyle(controller: any[], javascriptOptions: { [x: string]: any; name: any }) {
            const { name, ...style } = javascriptOptions
            const styleString = (style: { [x: string]: any }) => {
                return Object.keys(style)
                    .map((key) => `${key}: ${style[key]}`)
                    .join('; ')
            }
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
            </script>`
            return { 
              script: scriptString, 
              style: `<style name = "${name}">${styleString(style)}</style>` 
            }
        }
        const { script, style } = generateScriptAndStyle(controller, options)
        return {
            script,
            style,
            view: view.join('')
        }
    }

    static generateAttributes(attributes: any) {
        return Object.keys(attributes)
            .map((key) => `${key}="${attributes[key]}"`)
            .join(' ')
    }

    static generateChildren(children: any) {
        if (children) {
            return children.join('')
        }
        return ''
    }

    // parse fug code into a tree
    static regex = /([a-zA-Z0-9]+)(?:\s*\(([^)]*)\))?(?:\s*\[(.*)\])?/g

    static parse(code: string) {
        const parsed = Fug.parseCode(code, Fug.regex)
        const controller: any = []
        const view: any = []
        parsed.forEach((node: { tag: any; attributes: any; children: any; }) => {
            const { tag, attributes, children } = node
            if (tag === 'style') {
                controller.push(`${attributes.name}: ''`)
            } else {
                view.push(`<${tag} ${Fug.generateAttributes(attributes)}>${Fug.generateChildren(children)}</${tag}>`)
            }
        })
        return { controller, view }
    }

    static parseCode(code: string, regex: RegExp) {
        const parsed: any = []
        let match: any
        while ((match = regex.exec(code))) {
            const [full, tag, attributes, children] = match
            parsed.push({
                tag,
                attributes: Fug.parseAttributes(attributes),
                children: Fug.parseChildren(children)
            })
        }
        return parsed
    }

    static parseAttributes(attributes: any) {
      const parsed = {}
      if (attributes) {
        attributes.split(';').forEach((attribute: { split: (arg0: string) => [any, any] }) => {
          const [key, value] = attribute.split('=')
          parsed[key] = value
        })
      }
      return parsed
    }

    static parseChildren(children: any) {
      if (children) {
        return Fug.parseCode(children, Fug.regex)
      }
      return []
    }

}

const fugLayout = `
style(name=header,margin-left=10px)[
  style(name=logo,width=40px,length=40px,margin=10px)[
    image(src=http://foo.bar/img.png)
  ]
]
header (margin-left=10px)[
  logo(width=40px,length=40px,margin=10px)[
    image(src=http://foo.bar/img.png)
  ]
]
container(name=userEmail,display=flex,flex-direction=column)[
  row[
    column(width=50%)[
      textbox(id=name,placeholder='Name')
    ]
    column(width=50%)[
      textbox(id=emailplaceholder='Email')
    ]
  ]
  row[
    button(text='Submit',event=submitEmail)
  ]
]
`
const htmlOutput = Fug.compile(fugLayout, { javascript: '' })
console.log(htmlOutput.script,htmlOutput.style, htmlOutput.view)