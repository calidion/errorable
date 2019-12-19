import * as index from "../src/index";

test("Should have Generator available", () => {
  expect(typeof index.Generator === "function").toBeTruthy();
});
