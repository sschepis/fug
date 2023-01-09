/**
 * A Fug element is an object that contains the name of the element, its attributes, content, and its children.
 */
export type FugElement = {
    name: string;
    id?: string;
    type?: string;
    attributes?: {
        [x: string]: any;
    };
    styles?: {
        [x: string]: any;
    };
    children?: any[];
    content?: any;
    event?: string;
};
/**
 * The Fug parser is responsible for parsing the Fug format into a Fug element.
 */
export default class Fug {
    /**
     * given a comma-separated value string, this method returns an array of the values in the string
     * @param str
     * @returns an Array of the values in the string
     */
    static _csv: (str: string | any[]) => string[];
    /**
     * Find the first element in the string that matches the given name
     * @param fugElement
     * @param csv
     * @returns
     */
    static _find: (fugElement: any, csv: string) => {
        name: string;
        attributes: {
            [x: string]: any;
        };
        children: string[];
        content: any;
    };
    /**
     * FInd the first element in the string that matches the given class
     * @param fugClass
     * @param csv
     * @returns
     */
    static _findClass: (fugClass: any, csv: string) => {
        name: string;
        attributes: {
            [x: string]: any;
        };
        children: string[];
        content: any;
    };
    /**
     * Find the first element in the string that matches the given id
     * @param fugId
     * @param csv
     * @returns
     */
    static _findId: (fugId: any, csv: string) => {
        name: string;
        attributes: {
            [x: string]: any;
        };
        children: string[];
        content: any;
    };
    /**
     * extract the attributes, children and content from the given string
     * @param splStr
     * @param splOpen
     * @param splClose
     * @returns
     */
    static _extract: (splStr: {
        match: (arg0: RegExp) => any[];
    }, splOpen: string, splClose: string) => string[];
    /**
     * return the attributes of the given element
     * @param fugElement
     * @returns an object containing the attributes of the given element
     */
    static attributes: (fugElement: any) => {
        [x: string]: any;
    };
    /**
     * return the children of the given element as an array
     * @param splStr
     * @returns
     */
    static children: (splStr: any) => string[];
    /**
     * return the content of the given element
     * @param splStr
     * @returns
     */
    static content: (splStr: any) => any;
    /**
     * Parse the given string into a Fug element
     * @param fugElement
     * @returns
     */
    static parse: (fugElement: string) => {
        name: string;
        attributes: {
            [x: string]: any;
        };
        children: string[];
        content: any;
    };
    /**
     * The name of the element
     */
    name: string;
    /**
     * The attributes of the element
     */
    attributes: {
        [x: string]: any;
    };
    /**
     * The children of the element
     */
    children: any[];
    /**
     * The content of the element
     */
    content: any;
    /**
     * construct a Fug element from the given string
     * @param fugElement
     */
    constructor(fugElement: any);
    get element(): FugElement;
}
