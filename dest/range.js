"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = exports.xrange = void 0;
const position_1 = require("./position");
const xMatrixRangeReverse = function* (shape, start, end) {
    const coordinate = start ? start.slice(0) : shape.map(() => 0);
    let depth;
    do {
        depth = shape.length - 1;
        while (coordinate[depth] >= 0) {
            if (end && position_1.geq(end, coordinate))
                return;
            yield coordinate.slice(0);
            coordinate[depth] -= 1;
        }
        while (coordinate[depth] < 0) {
            coordinate[depth] = shape[depth] - 1;
            depth -= 1;
            coordinate[depth] -= 1;
        }
    } while (depth >= 0);
};
const xMatrixRangeWithEndInorder = function* (shape, start, end) {
    /* initial start */
    const coordinate = start ? start.slice(0) : shape.map(() => 0);
    let depth;
    do {
        /* reset to the lowest bit */
        depth = shape.length - 1;
        while (coordinate[depth] < shape[depth]) {
            /* the end */
            if (position_1.leq(end, coordinate))
                return;
            yield coordinate.slice(0);
            coordinate[depth] += 1;
        }
        /* carry bit */
        while (coordinate[depth] >= shape[depth]) {
            /* clear the lower bit */
            coordinate[depth] = 0;
            depth -= 1;
            coordinate[depth] += 1;
        }
    } while (depth >= 0);
};
const xMatrixRangeWithEnd = function* (shape, start, end) {
    return yield* position_1.lt(start, end) ? xMatrixRangeWithEndInorder(shape, start, end) : xMatrixRangeReverse(shape, start, end);
};
const xMatrixRangeWithoutEnd = function* (shape, start) {
    /* initial start */
    const coordinate = start ? start.slice(0) : shape.map(() => 0);
    let depth;
    do {
        /* reset to the lowest bit */
        depth = shape.length - 1;
        while (coordinate[depth] < shape[depth]) {
            /* the end */
            yield coordinate.slice(0);
            coordinate[depth] += 1;
        }
        /* carry bit */
        while (coordinate[depth] >= shape[depth]) {
            /* clear the lower bit */
            coordinate[depth] = 0;
            depth -= 1;
            coordinate[depth] += 1;
        }
    } while (depth >= 0);
};
function* xMatrixRange(shape, start, end) {
    return yield* end === undefined ? xMatrixRangeWithoutEnd(shape, start) : xMatrixRangeWithEnd(shape, start, end);
}
function* xNumberRange(start, end, step) {
    // when step equals undefined or 0
    if (!step) {
        step = start > end ? -1 : 1;
    }
    ;
    if (end === undefined) {
        end = start;
        start = 0;
    }
    if (!(Number.isInteger(start) && Number.isInteger(end) && Number.isInteger(step))) {
        throw new Error('range() integer `start`, `end`, `step` arguments expected');
    }
    const offset = end - start;
    /* incorrect direction */
    if (offset / Math.abs(offset) !== step / Math.abs(step))
        return;
    if (start < end) {
        for (let i = start; i < end; i += step)
            yield i;
    }
    else {
        for (let i = start; i > end; i += step)
            yield i;
    }
}
function* xrange(a, b, c) {
    return yield* (Array.isArray(a)) ? xMatrixRange(a, b, c) : xNumberRange(a, b, c);
}
exports.xrange = xrange;
function range(a, b, c) {
    const ret = [];
    for (let i of xrange(a, b, c)) {
        ret.push(i);
    }
    return ret;
}
exports.range = range;
//# sourceMappingURL=range.js.map