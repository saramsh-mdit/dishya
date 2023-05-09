import { describe, test, expect } from "@jest/globals";
import { createToken } from "..";

describe("JSON WEB TOKEN Module", () => {
  test("jwt token generation test", () => {
    const token = createToken({ _id: "random_id" });
    expect(typeof token).toMatch("string");
  });
});
