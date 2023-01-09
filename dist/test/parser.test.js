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
        it('should parse an element with attributes', () => {
            const fug = src_1.Fug.parse('div(id=main, class=container)');
            (0, chai_1.expect)(fug).to.deep.equal({ name: 'div', attributes: { id: 'main', class: 'container' }, children: [], content: '' });
        });
        it('should parse an element with children', () => {
            const fug = src_1.Fug.parse('div[id=main, class=container](div, p)');
            (0, chai_1.expect)(fug).to.deep.equal({ name: 'div', attributes: { id: 'main', class: 'container' }, children: ['div', 'p'], content: '' });
        });
        it('should parse an element with content', () => {
            const fug = src_1.Fug.parse('div[id=main, class=container](`hello world`)');
            (0, chai_1.expect)(fug).to.deep.equal({ name: 'div', attributes: { id: 'main', class: 'container' }, children: [], content: 'hello world' });
        });
        it('should parse an element with attributes, children and content', () => {
            const fug = src_1.Fug.parse('div[id=main, class=container](div, p)(`hello world`)');
            (0, chai_1.expect)(fug).to.deep.equal({ name: 'div', attributes: { id: 'main', class: 'container' }, children: ['div', 'p'], content: 'hello world' });
        });
    });
});
