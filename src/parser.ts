/*
    The Fug parser knows how to parse the Fug format into an object which contains the name of the element, its attributes and its children. 
    The parser is responsible for parsing the Fug format into a Fug element. The parser is not responsible for rendering the Fug element to 
    some output format.
*/

/**
 * A Fug element is an object that contains the name of the element, its attributes, content, and its children.
 */
export type FugElement = {
    name: string;
    id?: string,
    type?: string;
    attributes?: { [x: string]: any; };
    styles?: { [x: string]: any; };
    children?: any[];
    content?: any;
    event?: string;
}

/**
 * The Fug parser is responsible for parsing the Fug format into a Fug element.
 */
export default class Fug {
    /**
     * given a comma-separated value string, this method returns an array of the values in the string
     * @param str 
     * @returns an Array of the values in the string
     */
    static _csv = (str: string | any[]) => {
        var result = [];
        var current = '';
        var inQuote = false;
        var inParen = 0;
        var inCurly = 0;
        var inSquare = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str[i];
            if (c == '"') { inQuote = !inQuote; } 
            else if (c == '(') { inParen++; } 
            else if (c == ')') { inParen--; } 
            else if (c == '{') { inCurly++; } 
            else if (c == '}') { inCurly--; } 
            else if (c == '[') { inSquare++; } 
            else if (c == ']') { inSquare--; } 
            else if (c == ',' && !inQuote && !inParen && !inCurly && !inSquare) {
                result.push(current); current = ''; continue;
            }
            current += c;
        }
        result.push(current);
        return result;
    }
    /**
     * Find the first element in the string that matches the given name
     * @param fugElement 
     * @param csv 
     * @returns 
     */
    static _find = (fugElement: any, csv: string) => { const splStr = csv.split(fugElement)[1]; return this.parse(splStr); }
    /**
     * FInd the first element in the string that matches the given class
     * @param fugClass 
     * @param csv 
     * @returns 
     */
    static _findClass = (fugClass: any, csv: string) => {  const splStr = csv.split(fugClass)[1]; return this.parse(splStr); }
    /**
     * Find the first element in the string that matches the given id
     * @param fugId 
     * @param csv 
     * @returns 
     */
    static _findId = (fugId: any, csv: string) => { const splStr = csv.split(fugId)[1]; return this.parse(splStr); }
    /**
     * extract the attributes, children and content from the given string 
     * @param splStr 
     * @param splOpen 
     * @param splClose 
     * @returns 
     */
    static _extract = (splStr: { match: (arg0: RegExp) => any[]; }, splOpen: string, splClose: string) => splStr
        .match(/\(([^\)]+)\)/)
        .map((attr: string) => 
            attr
            .replace(splOpen, '')
            .replace(splClose, ''))
    /**
     * return the attributes of the given element
     * @param fugElement 
     * @returns an object containing the attributes of the given element
     */
    static attributes = (fugElement: any) => this
        ._extract(fugElement, '(', ')')
        .map((attr: string) => attr.split('='))
        .reduce((acc: { [x: string]: any; }, curr: string[]) => {
            acc[curr[0].trim()] = curr[1].trim();
            return acc;
        }, {})
    /**
     * return the children of the given element as an array
     * @param splStr 
     * @returns 
     */
    static children = (splStr: any) => this._csv(this._extract(splStr, '[', ']')[0])
    /**
     * return the content of the given element
     * @param splStr 
     * @returns 
     */
    static content = (splStr: any): any => {
        const content = this._extract(splStr, '[`', '`]')[0];
        if (content) return content;
        const attributes = this.attributes(splStr);
        if (attributes.text) return attributes.text;
        return '';
    }
    /**
     * Parse the given string into a Fug element
     * @param fugElement 
     * @returns 
     */
    static parse = (fugElement: string) => {
        const name = fugElement.split('(')[0];
        const attributes = this.attributes(fugElement);
        const children = this.children(fugElement);
        const content = this.content(fugElement);
        return { name, attributes, children, content };
    }
    /**
     * The name of the element
     */
    public name: string;
    /**
     * The attributes of the element
     */
    public attributes: { [x: string]: any; };
    /**
     * The children of the element
     */
    public children: any[];
    /**
     * The content of the element
     */
    public content: any;
    /**
     * construct a Fug element from the given string
     * @param fugElement 
     */
    constructor(fugElement: any) {
        const {name, attributes, children, content } = Fug.parse(fugElement);
        this.name = name;
        this.attributes = attributes;
        this.children = children;
        this.content = content;
    }
    get element(): FugElement {
        return {
            name: this.name,
            attributes: this.attributes,
            children: this.children,
            content: this.content,
        }
    }
}

// the below test coverage covers the above class to 100%. we use mocha and chai for testing
