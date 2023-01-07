export declare class Fug {
    static compile(code: string, options: any): {
        script: string;
        style: string;
        view: any;
    };
    static generateAttributes(attributes: any): string;
    static generateChildren(children: any): any;
    static regex: RegExp;
    static parse(code: string): {
        controller: any;
        view: any;
    };
    static parseElement(code: string, regex: RegExp): any;
    static parseAttributes(attributes: any): any;
    static parseChildren(children: any): any;
}
