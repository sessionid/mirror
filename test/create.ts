import 'mocha';
import * as chai from 'chai';
chai.should();
import { createSparse, createDiagonal, createIdentity, createZeros, createRegular } from '../src/create';

describe('create', () => {

    describe('#createSparse()', () => {
        it('sparse', () => {
            const inner = Array(4);
            createSparse([3, 2, 4]).should.deep.eq([
                [inner, inner],
                [inner, inner],
                [inner, inner]
            ]);
        });

        it('filling', () => {
            const inner = Array(4).fill(3);
            createSparse([3, 2, 4], 3).should.deep.eq([
                [inner, inner],
                [inner, inner],
                [inner, inner]
            ]);
        });
    });

    it('#createZeros()', () => {
        const inner = Array(4).fill(0);
        createZeros([3, 2, 4]).should.deep.eq([
            [inner, inner],
            [inner, inner],
            [inner, inner]
        ]);
    });

    it('#createRegular()', () => {
        createRegular(3, 2).should.deep.eq([
            [[2, 2, 2], [2, 2, 2], [2, 2, 2]],
            [[2, 2, 2], [2, 2, 2], [2, 2, 2]],
            [[2, 2, 2], [2, 2, 2], [2, 2, 2]]
        ]);
    });

    it('#createDiagonal()', () => {
        createDiagonal(3, 2).should.deep.eq([
            [[2, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 2, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 2]]
        ]);
    });

    it('#createIdentity()', () => {
        createIdentity(3).should.deep.eq([
            [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 1]]
        ]);
    });
});