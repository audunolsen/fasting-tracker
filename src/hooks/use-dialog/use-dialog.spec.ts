import { assert, test, expect } from "vitest"

test("test", (a) => {
  // console.log("LOG", import.meta.env.MODE)
  // assert.equal(Math.sqrt(4), 2)
  // assert.equal(getEnv, "TEST")

  expect(import.meta.env.MODE).toEqual("test")
})
