
import { expect } from 'chai';
import { Fug } from '../src';

describe('Fug', () => {
    describe('parse', () => {
        it('should parse a simple element', () => {
            const fug = Fug.parse('div');
            expect(fug).to.deep.equal({ name: 'div', attributes: {}, children: [], content: '' });
        });
    });
})