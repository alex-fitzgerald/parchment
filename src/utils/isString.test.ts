import isString from './isString.ts';
import { test, expect } from 'vitest';
const cases = [
    ['string', true],
    [1, false],
    [null, false],
    [undefined, false],
    [{}, false],
    [[], false],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    [() => {}, false],
];

cases.forEach(([input, expected]) => {
    test('Should return `true` if the candidate type is a string', () => {
        expect(isString(input)).toBe(expected);
    });
});
