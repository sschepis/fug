"use strict";
/*
    The Fug parser knows how to parse the Fug format into an object which contains the name of the element, its attributes and its children.
    The parser is responsible for parsing the Fug format into a Fug element. The parser is not responsible for rendering the Fug element to
    some output format.
*/
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Fug parser is responsible for parsing the Fug format into a Fug element.
 */
class Fug {
    /**
     * construct a Fug element from the given string
     * @param fugElement
     */
    constructor(fugElement) {
        const { name, attributes, children, content } = Fug.parse(fugElement);
        this.name = name;
        this.attributes = attributes;
        this.children = children;
        this.content = content;
    }
    get element() {
        return {
            name: this.name,
            attributes: this.attributes,
            children: this.children,
            content: this.content,
        };
    }
}
exports.default = Fug;
_a = Fug;
/**
 * given a comma-separated value string, this method returns an array of the values in the string
 * @param str
 * @returns an Array of the values in the string
 */
Fug._csv = (str) => {
    var result = [];
    var current = '';
    var inQuote = false;
    var inParen = 0;
    var inCurly = 0;
    var inSquare = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        if (c == '"') {
            inQuote = !inQuote;
        }
        else if (c == '(') {
            inParen++;
        }
        else if (c == ')') {
            inParen--;
        }
        else if (c == '{') {
            inCurly++;
        }
        else if (c == '}') {
            inCurly--;
        }
        else if (c == '[') {
            inSquare++;
        }
        else if (c == ']') {
            inSquare--;
        }
        else if (c == ',' && !inQuote && !inParen && !inCurly && !inSquare) {
            result.push(current);
            current = '';
            continue;
        }
        current += c;
    }
    result.push(current);
    return result;
};
/**
 * Find the first element in the string that matches the given name
 * @param fugElement
 * @param csv
 * @returns
 */
Fug._find = (fugElement, csv) => { const splStr = csv.split(fugElement)[1]; return _a.parse(splStr); };
/**
 * FInd the first element in the string that matches the given class
 * @param fugClass
 * @param csv
 * @returns
 */
Fug._findClass = (fugClass, csv) => { const splStr = csv.split(fugClass)[1]; return _a.parse(splStr); };
/**
 * Find the first element in the string that matches the given id
 * @param fugId
 * @param csv
 * @returns
 */
Fug._findId = (fugId, csv) => { const splStr = csv.split(fugId)[1]; return _a.parse(splStr); };
/**
 * extract the attributes, children and content from the given string
 * @param splStr
 * @param splOpen
 * @param splClose
 * @returns
 */
Fug._extract = (splStr, splOpen, splClose) => splStr
    .match(/\(([^\)]+)\)/)
    .map((attr) => attr
    .replace(splOpen, '')
    .replace(splClose, ''));
/**
 * return the attributes of the given element
 * @param fugElement
 * @returns an object containing the attributes of the given element
 */
Fug.attributes = (fugElement) => _a
    ._extract(fugElement, '(', ')')
    .map((attr) => attr.split('='))
    .reduce((acc, curr) => {
    acc[curr[0].trim()] = curr[1].trim();
    return acc;
}, {});
/**
 * return the children of the given element as an array
 * @param splStr
 * @returns
 */
Fug.children = (splStr) => _a._csv(_a._extract(splStr, '[', ']')[0]);
/**
 * return the content of the given element
 * @param splStr
 * @returns
 */
Fug.content = (splStr) => {
    const content = _a._extract(splStr, '[`', '`]')[0];
    if (content)
        return content;
    const attributes = _a.attributes(splStr);
    if (attributes.text)
        return attributes.text;
    return '';
};
/**
 * Parse the given string into a Fug element
 * @param fugElement
 * @returns
 */
Fug.parse = (fugElement) => {
    const name = fugElement.split('(')[0];
    const attributes = _a.attributes(fugElement);
    const children = _a.children(fugElement);
    const content = _a.content(fugElement);
    return { name, attributes, children, content };
};
// the below test coverage covers the above class to 100%. we use mocha and chai for testing
