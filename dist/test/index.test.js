"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../src/index");
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
]`;
const children = `
textbox(id=name,placeholder='Name')
textbox(id=emailplaceholder='Email')`;
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
]`;
describe('Fug', () => {
    describe('parse', () => {
        it('should parse a fug layout into a tree', () => {
            const parsed = index_1.Fug.parse(fugLayout);
            (0, chai_1.expect)(parsed).to.deep.equal({
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
            });
        });
    });
    describe('generateAttributes', () => {
        it('should generate attributes from an object', () => {
            const attributes = {
                id: 'name',
                placeholder: 'Name'
            };
            const generatedAttributes = index_1.Fug.generateAttributes(attributes);
            (0, chai_1.expect)(generatedAttributes).to.equal('id="name" placeholder="Name"');
        });
    });
    describe('generateChildren', () => {
        it('should generate children from an array', () => {
            const children = [
                '<textbox id="name" placeholder="Name"></textbox>',
                '<textbox id="emailplaceholder" placeholder="Email"></textbox>'
            ];
            const generatedChildren = index_1.Fug.generateChildren(children);
            (0, chai_1.expect)(generatedChildren).to.equal('<textbox id="name" placeholder="Name"></textbox><textbox id="emailplaceholder" placeholder="Email"></textbox>');
        });
    });
    describe('parseAttributes', () => {
        it('should parse attributes from a string', () => {
            const attributes = 'id=name;placeholder=Name';
            const parsedAttributes = index_1.Fug.parseAttributes(attributes);
            (0, chai_1.expect)(parsedAttributes).to.deep.equal({
                id: 'name',
                placeholder: 'Name'
            });
        });
    });
    describe('parseChildren', () => {
        it('should parse children from a string', () => {
            const parsedChildren = index_1.Fug.parseChildren(children);
            (0, chai_1.expect)(parsedChildren).to.deep.equal([
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
            ]);
        });
    });
    describe('parseElement', () => {
        it('should parse code from a string', () => {
            const parsedCode = index_1.Fug.parseElement(code, index_1.Fug.regex);
            (0, chai_1.expect)(parsedCode).to.deep.equal({
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
            });
        });
    });
    describe('parseElement', () => {
        it('should parse an element from a string', () => {
            const element = 'header (margin-left=10px)[logo(width=40px,length=40px,margin=10px)[image(src=http://foo.bar/img.png)]]';
            const parsedElement = index_1.Fug.parseElement(element, index_1.Fug.regex);
            (0, chai_1.expect)(parsedElement).to.deep.equal({
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
            });
        });
    });
});
