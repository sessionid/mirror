import 'mocha';
import * as chai from 'chai';
chai.should();
import { gt, geq, lt, leq, eq, neq, weightByShape, weight, indexByWeight, indexByShape, index, coordinateByWeightShape, coordinateByShape, coordinate } from '../src/position';
import { createRandArrByShape } from './util';

describe('internal/position', () => {
    const less = [1,3,0];
    const target = [1, 3, 5];
    const larger = [2, 3, 5];
    it('#gt()', () => {
        gt(target, less).should.eq(true);
        gt(target, larger).should.eq(false);
        gt(target, target).should.eq(false);
    });

    it('#geq()', () => {
        geq(target, less).should.eq(true);
        geq(target, larger).should.eq(false);
        geq(target, target).should.eq(true);
    });

    it('#lt()', () => {
        lt(target, less).should.eq(false);
        lt(target, larger).should.eq(true);
        lt(target, target).should.eq(false);
    });

    it('#leq()', () => {
        leq(target, less).should.eq(false);
        leq(target, larger).should.eq(true);
        leq(target, target).should.eq(true);
    });

    it('#eq()', () => {
        eq(target, less).should.eq(false);
        eq(target, larger).should.eq(false);
        eq(target, target).should.eq(true);
    });

    it('#neq()', () => {
        neq(target, less).should.eq(true);
        neq(target, larger).should.eq(true);
        neq(target, target).should.eq(false);
    });

    describe('#weightByShape()', () => {
        it('normal', () => {
            weightByShape([4, 2, 9]).should.deep.eq([18, 9, 1]);
        });

        it('empty sub', () => {
            weightByShape([4, 0, 0]).should.deep.eq([0, 0, 0]);
        });

        it('invalid shape', () => {
            weightByShape.bind(null, [-1, 2, 3]).should.throw('invalid shape');
        });
    });

    describe('#weight()', () => {
        it('normal tensor', () => {
            weight(createRandArrByShape([4, 2, 9])).should.deep.eq([18, 9, 1]);
        });

        it('empty sub', () => {
            weight(createRandArrByShape([4, 2, 0])).should.deep.eq([0, 0, 0]);
            weight(createRandArrByShape([4, 0, 0])).should.deep.eq([0, 0]);
        });

        it('empty vector', () => {
            weight(createRandArrByShape([0])).should.deep.eq([0]);
        });
    });

    describe('#indexByWeight()', () => {
        it('vector', () => {
            indexByWeight([5], [1]).should.eq(5);
        });
        
        it('tensor', () => {
            indexByWeight([2, 3, 4], [4, 3, 1]).should.eq(21);
        });

        it('coordinate and weightlist not match', () => {
            indexByWeight.bind(null, [2, 3], [4, 3, 1]).should.throw(`coordinate ${JSON.stringify([2, 3])} and weightlist ${JSON.stringify([4, 3, 1])} not match`);
        });
    });

    describe('#indexByShape()', () => {
        it('vector', () => {
            indexByShape([5], [8]).should.eq(5);
        });
        
        it('tensor', () => {
            indexByShape([2, 3, 1], [3, 5, 2]).should.eq(27);
        });

        it('out of range cuz dimension', () => {
            indexByShape([2, 3, 5], [3, 5, 2]).should.eq(-1);
        });

        it('out of range cuz coordination', () => {
            indexByShape([2, 3], [3, 5, 2]).should.eq(-1);
        });
    });

    describe('#index()', () => {
        it('vector', () => {
            index([1,2,3,4,5], [3]).should.eq(3);
        });

        it('tensor', () => {
            const coordinate = [2, 3, 1];
            const shape = [3, 5, 2];
            index(createRandArrByShape(shape), coordinate).should.eq(27);
        });

        it('out of range cuz dimension', () => {
            const coordinate = [2, 3, 5];
            const shape = [3, 5, 2];
            index(createRandArrByShape(shape), coordinate).should.eq(-1);
        });

        it('out of range cuz coordination', () => {
            const coordinate = [2, 3];
            const shape = [3, 5, 2];
            index(createRandArrByShape(shape), coordinate).should.eq(-1);
        });
    });

    describe('#coordinateByWeightShape()', () => {
        it('tensor', () => {
            coordinateByWeightShape(27, [3, 5, 2], [10, 2, 1]).should.deep.eq([2, 3, 1]);
        });
        it('shape and weightlist not match', () => {
            coordinateByWeightShape.bind(27, [3, 5, 2], [10, 2, 1]).should.throw();
        });
    });

    describe('#coordinateByShape()', () => {
        it('tensor', () => {
            coordinateByShape(27, [3, 5, 2]).should.deep.eq([2, 3, 1]);
        });
    });

    describe('#coordinate()', () => {
        it('tensor', () => {
            const shape = [3, 5, 2];
            coordinate(createRandArrByShape(shape), 27).should.deep.eq([2, 3, 1]);
        });
    });
})