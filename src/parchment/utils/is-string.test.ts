import { expect, it } from "vitest";

import isString from "./is-string.ts";

const cases = [
  ["string", true],
  [1, false],
  [null, false],
  [undefined, false],
  [{}, false],
  [[], false],
];

cases.forEach(([input, expected]) => {
  it("should return `true` if the candidate type is a string", () => {
    expect(isString(input)).toBe(expected);
  });
});
