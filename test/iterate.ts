import 'mocha';
import * as chai from 'chai';
chai.should();
import { each, eachBack, some, every, filter, map, reduce, reduceBack, arrayGenerator, arrayGeneratorReverse } from '../src/iterate';

describe('iterate', () => {
    const tensor = [
        [['0,0,0', '0,0,1'], ['0,1,0', '0,1,1']],
        [['1,0,0', '1,0,1'], ['1,1,0', '1,1,1']],
        [['2,0,0', '2,0,1'], ['2,1,0', '2,1,1']],
    ];

    const sparseTensor = Array(3);
    const sparseInner = Array(2);
    sparseInner[1] = '1,0,1';
    sparseTensor[1] = [sparseInner, ['1,1,0', '1,1,1']];

    describe('#each()/#forEach()', () => {
        it('normal tensor', () => {
            let counter = 0;
            let last;
            each(tensor, (item, coordinate, arr) => {
                const [z, y, x] = coordinate;
                tensor[z][y][x].should.eq(item);
                coordinate.join(',').should.eq(item);
                arr.should.deep.eq(tensor);
                counter += 1;
                last = coordinate;
            });
            counter.should.eq(12);
            last.should.deep.eq([2, 1, 1]);
        });

        it('sparse tensor', () => {
            const tensor = [];
            each(sparseTensor, (item) => {
                tensor.push(item);
            });
            tensor.should.deep.eq(['1,0,1', '1,1,0', '1,1,1']);
        });
    });

    describe('#eachBack()/#forEachBack()', () => {
        it('normal tensor', () => {
            let counter = 0;
            let last;
            eachBack(tensor, (item, coordinate, arr) => {
                const [z, y, x] = coordinate;
                tensor[z][y][x].should.eq(item);
                coordinate.join(',').should.eq(item);
                arr.should.deep.eq(tensor);
                counter += 1;
                last = coordinate;
            });
            counter.should.eq(12);
            last.should.deep.eq([0, 0, 0]);
        });

        it('sparse tensor', () => {
            const tensor = [];
            eachBack(sparseTensor, (item) => {
                tensor.push(item);
            });
            tensor.should.deep.eq(['1,1,1', '1,1,0', '1,0,1']);
        });
    });

    describe('#some()', () => {

        it('empty', () => {
            some([], () => true).should.eq(false);
        });

        it('normal', () => {
            some([[false, true], [true, false]], item => item).should.eq(true);
            some([[false, false], [false, false]], item => item).should.eq(false);
        });

        it('sparse', () => {
            const sparse = Array(4);
            sparse[0] = false;
            some(sparse, item => item).should.eq(false);
            sparse[1] = true;
            some(sparse, item => item).should.eq(true);
        });
    });

    describe('#every()', () => {

        it('empty', () => {
            every([], () => false).should.eq(true);
        });

        it('normal', () => {
            every([[false, true], [true, false]], item => item).should.eq(false);
            every([[true, true], [true, true]], item => item).should.eq(true);
        });

        it('sparse', () => {
            const sparse = Array(4);
            sparse[0] = true;
            every(sparse, item => item).should.eq(true);
            sparse[1] = false;
            every(sparse, item => item).should.eq(false);
        });
    });

    describe('#filter()', () => {
        it('normal tensor', () => {
            const tensor = [[0,1], [2,3]];
            filter(tensor, item => item >= 2).should.deep.eq([Array(2), [2,3]]);
        });

        it('sparse tensor', () => {
            const inner = Array(3);
            inner[1] = 1;
            const tensor = [inner, [3,4,5]];
            filter(tensor, item => item < 2).should.deep.eq([inner, Array(3)]);
        });

        it('empty', () => {
            filter([], item => item < 2).should.deep.eq([]);
        });
    });

    describe('#map()', () => {
        it('normal tensor', () => {
            const tensor = [[0,1], [2,3]];
            map(tensor, item => item * 2).should.deep.eq([[0,2], [4,6]]);
        });

        it('sparse tensor', () => {
            const inner = Array(3);
            inner[1] = 1;
            const tensor = [inner, [3,4,5]];
            map(tensor, item => item).should.deep.eq([inner, [3,4,5]]);
        });

        it('empty', () => {
            map([], item => item).should.deep.eq([]);
        });
    });

    describe('#reduce()', () => {
        it('normal tensor', () => {
            const tensor = [[[1,2,3],[4,5,6]]];
            reduce(tensor, (previousValue, item) => {
                previousValue.push(item);
                return previousValue;
            }, []).should.deep.eq([1,2,3,4,5,6]);
        });

        it('normal tensor with previous value', () => {
            const tensor = [[[1,2,3],[4,5,6]]];
            reduce(tensor, (previousValue, item) => {
                previousValue.push(item);
                return previousValue;
            }, [0]).should.deep.eq([0,1,2,3,4,5,6]);
        });

        it('sparse tensor with previous value', () => {
            const tensor = [[Array(3),[4,5,6]]];
            reduce(tensor, (previousValue, item) => {
                previousValue.push(item);
                return previousValue;
            }, [0]).should.deep.eq([0,4,5,6]);
        });
    });

    describe('#reduceBack()', () => {
        it('normal tensor', () => {
            const tensor = [[[1,2,3],[4,5,6]]];
            reduceBack(tensor, (previousValue, item) => {
                previousValue.push(item);
                return previousValue;
            }, []).should.deep.eq([6,5,4,3,2,1]);
        });

        it('normal tensor with previous value', () => {
            const tensor = [[[1,2,3],[4,5,6]]];
            reduceBack(tensor, (previousValue, item) => {
                previousValue.push(item);
                return previousValue;
            }, [0]).should.deep.eq([0,6,5,4,3,2,1]);
        });

        it('sparse tensor with previous value', () => {
            const tensor = [[Array(3),[4,5,6]]];
            reduceBack(tensor, (previousValue, item) => {
                previousValue.push(item);
                return previousValue;
            }, [0]).should.deep.eq([0,6,5,4]);
        });
    });

    it('#arrayGenerator()', () => {
        const tensor = [[[1,2,3],[4,5,6]]];
        const list = [];
        for(let [item] of arrayGenerator(tensor)) {
            list.push(item);
        }
        list.should.deep.eq([1,2,3,4,5,6]);
    });

    it('#arrayGeneratorReverse()', () => {
        const tensor = [[[1,2,3],[4,5,6]]];
        const list = [];
        for(let [item] of arrayGeneratorReverse(tensor)) {
            list.push(item);
        }
        list.should.deep.eq([6,5,4,3,2,1]);
    });
});