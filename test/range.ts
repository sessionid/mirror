import 'mocha';
import * as chai from 'chai';
chai.should();
import { range, xrange } from '../src/range';

describe('range', () => {
    describe('#xrange()', () => {
        it('only end', () => {
            let arr = [];
            for(let x of xrange(5)) {
                arr.push(x);
            }
            arr.should.deep.eq([0, 1, 2, 3, 4]);
        });

        it('start and end asc', () => {
            let arr = [];
            for(let x of xrange(5, 10)) {
                arr.push(x);
            }
            arr.should.deep.eq([5, 6, 7, 8, 9]);
        });

        it('start and end desc', () => {
            let arr = [];
            for(let x of xrange(9, 4)) {
                arr.push(x);
            }
            arr.should.deep.eq([9, 8, 7, 6, 5]);
        });

        it('start equal end', () => {
            let arr = [];
            for(let x of xrange(5, 5)) {
                arr.push(x);
            }
            arr.should.deep.eq([]);
        });

        it('start, end and step asc', () => {
            let arr = [];
            for(let x of xrange(5, 14, 2)) {
                arr.push(x);
            }
            arr.should.deep.eq([5, 7, 9, 11, 13]);
        });

        it('start, end and step desc', () => {
            let arr = [];
            for(let x of xrange(13, 4, -2)) {
                arr.push(x);
            }
            arr.should.deep.eq([13, 11, 9, 7, 5]);
        });

        it('start < end and step < 0', () => {
            let arr = [];
            for(let x of xrange(4, 13, -2)) {
                arr.push(x);
            }
            arr.should.deep.eq([]);
        });

        it('start > end and step > 0', () => {
            let arr = [];
            for(let x of xrange(13, 4, 2)) {
                arr.push(x);
            }
            arr.should.deep.eq([]);
        });

        it('step equals 0', () => {
            let arr = [];
            for(let x of xrange(0, 5, 0)) {
                arr.push(x);
            }
            arr.should.deep.eq([0, 1, 2, 3, 4]);
        });

        it('only shape', () => {
            const matrix = [
                [[0, 0], [0, 1], [0, 2], [0, 3]],
                [[1, 0], [1, 1], [1, 2], [1, 3]],
                [[2, 0], [2, 1], [2, 2], [2, 3]],
            ];

            for(let c of xrange([3, 4])) {
                const [y, x] = c;
                matrix[y][x].should.deep.eq(c);
            }
        });

        it('shape and start', () => {
            const arr = [];
            for(let c of xrange([3, 4], [1, 1])) {
                arr.push(c);
            }
            arr.should.deep.eq([
                [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3]
            ])
        });

        it('shape and start and end', () => {
            const arr = [];
            for(let c of xrange([3, 4], [1, 1], [2, 2])) {
                arr.push(c);
            }
            arr.should.deep.eq([
                [1, 1], [1, 2], [1, 3], [2, 0], [2, 1]
            ]);
        });

        it('shape and start and end desc', () => {
            const arr = [];
            for(let c of xrange([3, 4], [2, 2], [1, 1])) {
                arr.push(c);
            }
            arr.should.deep.eq([
                [2, 2], [2, 1], [2, 0], [1, 3], [1, 2]
            ]);
        });
    });

    describe('#range()', () => {
        it('only end', () => {
            range(5).should.deep.eq([0, 1, 2, 3, 4]);
        });

        it('start and end asc', () => {
            range(4, 9).should.deep.eq([4, 5, 6, 7, 8]);
        });

        it('start and end desc', () => {
            range(9, 4).should.deep.eq([9, 8, 7, 6, 5]);
        });

        it('only shape', () => {
            const matrix = [
                [0, 0], [0, 1], [0, 2], [0, 3],
                [1, 0], [1, 1], [1, 2], [1, 3],
                [2, 0], [2, 1], [2, 2], [2, 3],
            ];
            range([3, 4]).should.deep.eq(matrix);
        });

        it('shape and start', () => {
            range([3, 4], [1, 1]).should.deep.eq([
                [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3]
            ])
        });

        it('shape and start and end', () => {
            range([3, 4], [1, 1], [2, 2]).should.deep.eq([
                [1, 1], [1, 2], [1, 3], [2, 0], [2, 1]
            ]);
        });

        it('shape and start and end desc', () => {
            range([3, 4], [2, 2], [1, 1]).should.deep.eq([
                [2, 2], [2, 1], [2, 0], [1, 3], [1, 2]
            ]);
        });

        it('start equal end', () => {
            range(5, 5).should.deep.eq([]);
        });

        it('start, end and step asc', () => {
            range(5, 14, 2).should.deep.eq([5, 7, 9, 11, 13]);
        });

        it('start, end and step desc', () => {
            range(13, 4, -2).should.deep.eq([13, 11, 9, 7, 5]);
        });

        it('start < end and step < 0', () => {
            range(4, 13, -2).should.deep.eq([]);
        });

        it('start > end and step > 0', () => {
            range(13, 4, 2).should.deep.eq([]);
        });

        it('step equals 0', () => {
            range(0, 5, 0).should.deep.eq([0, 1, 2, 3, 4]);
        });
    });
})