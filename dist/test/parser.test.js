"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
describe('Fug', () => {
    describe('parse', () => {
        it('should parse a simple element', () => {
            const fug = src_1.Fug.parse('div');
            (0, chai_1.expect)(fug).to.deep.equal({ name: 'div', attributes: {}, children: [], content: '' });
        });
    });
});
