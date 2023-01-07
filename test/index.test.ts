
import { expect } from 'chai'
import { Fug } from '../src/index'

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
const children = `
textbox(id=name,placeholder='Name')
textbox(id=emailplaceholder='Email')
`
const code = `
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

describe('Fug', () => {

    describe('parse', () => {
        it('should parse a fug layout into a tree', () => {
            const parsed = Fug.parse(fugLayout)
            expect(parsed).to.deep.equal({
                controller: [
                    "header: ''",
                    "logo: ''",
                    "userEmail: ''"
                ],
                view: [
                    "<style name = \"header\">margin-left: 10px</style>",
                    "<style name = \"logo\">width: 40px; length: 40px; margin: 10px</style>",
                    "<header margin-left=\"10px\"><logo width=\"40px\" length=\"40px\" margin=\"10px\"><image src=\"http://foo.bar/img.png\"></image></logo></header>",
                    "<container name=\"userEmail\" display=\"flex\" flex-direction=\"column\"><row><column width=\"50%\"><textbox id=\"name\" placeholder=\"Name\"></textbox></column><column width=\"50%\"><textbox id=\"emailplaceholder\" placeholder=\"Email\"></textbox></column></row><row><button text=\"Submit\" event=\"submitEmail\"></button></row></container>"
                ]
            })
        })
    })

    describe('generateAttributes', () => {
        it('should generate attributes from an object', () => {
            const attributes = {
                id: 'name',
                placeholder: 'Name'
            }
            const generatedAttributes = Fug.generateAttributes(attributes)
            expect(generatedAttributes).to.equal('id="name" placeholder="Name"')
        })
    })

    describe('generateChildren', () => {
        it('should generate children from an array', () => {
            const children = [
                '<textbox id="name" placeholder="Name"></textbox>',
                '<textbox id="emailplaceholder" placeholder="Email"></textbox>'
            ]
            const generatedChildren = Fug.generateChildren(children)
            expect(generatedChildren).to.equal('<textbox id="name" placeholder="Name"></textbox><textbox id="emailplaceholder" placeholder="Email"></textbox>')
        })
    })

    describe('parseAttributes', () => {
        it('should parse attributes from a string', () => {
            const attributes = 'id=name;placeholder=Name'
            const parsedAttributes = Fug.parseAttributes(attributes)
            expect(parsedAttributes).to.deep.equal({
                id: 'name',
                placeholder: 'Name'
            })
        })
    })

    describe('parseChildren', () => {
        it('should parse children from a string', () => {
            const parsedChildren = Fug.parseChildren(children)
            expect(parsedChildren).to.deep.equal([
                {
                    tag: 'textbox',
                    attributes: {
                        id: 'name',
                        placeholder: "'Name'"
                    },
                    children: []
                },
                {
                    tag: 'textbox',
                    attributes: {
                        id: 'emailplaceholder',
                        placeholder: "'Email'"
                    },
                    children: []
                }
            ])
        })
    })

    describe('parseCode', () => {
        it('should parse code from a string', () => {

            const parsedCode = Fug.parseCode(code)
            expect(parsedCode).to.deep.equal({
                controller: [
                    "header: ''",
                    "logo: ''",
                    "userEmail: ''"
                ],
                view: [
                    "<style name = \"header\">margin-left: 10px</style>",
                    "<style name = \"logo\">width: 40px; length: 40px; margin: 10px</style>",
                    "<header margin-left=\"10px\"><logo width=\"40px\" length=\"40px\" margin=\"10px\"><image src=\"http://foo.bar/img.png\"></image></logo></header>",
                    "<container name=\"userEmail\" display=\"flex\" flex-direction=\"column\"><row><column width=\"50%\"><textbox id=\"name\" placeholder=\"Name\"></textbox></column><column width=\"50%\"><textbox id=\"emailplaceholder\" placeholder=\"Email\"></textbox></column></row><row><button text=\"Submit\" event=\"submitEmail\"></button></row></container>"
                ]
            })
        }
  })
    describe('parseElement', () => {
        it('should parse an element from a string', () => {
            const element = 'header (margin-left=10px)[logo(width=40px,length=40px,margin=10px)[image(src=http://foo.bar/img.png)]]'
            const parsedElement = Fug.parseElement(element)
            expect(parsedElement).to.deep.equal({
                tag: 'header',
                attributes: {
                    'margin-left': '10px'
                },
                children: [
                    {
                        tag: 'logo',
                        attributes: {
                            width: '40px',
                            length: '40px',
                            margin: '10px'
                        },
                        children: [
                            {
                                tag: 'image',
                                attributes: {
                                    src: 'http://foo.bar/img.png'
                                },
                                children: []
                            }
                        ]
                    }
                ]
            })
        })
    })
    describe('parseElementAttributes', () => {
        it('should parse attributes from an element string', () => {
            const element = 'header (margin-left=10px)'
            const parsedElementAttributes = Fug.parseElementAttributes(element)
            expect(parsedElementAttributes).to.deep.equal({
                tag: 'header',
                attributes: {
                    'margin-left': '10px'
                }
            })
        })
    })
