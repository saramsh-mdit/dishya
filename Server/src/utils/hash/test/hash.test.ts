import { describe, test, expect } from "@jest/globals";
import { checkHash, getHash } from "..";

describe("Security Module", () => {
  test("Hash and Hash Verify", () => {
    const hashData = getHash("Random");
    expect(checkHash(hashData, "Random")).toBeTruthy;
    expect(checkHash(hashData, "Hahaha Guys")).toBeFalsy;
  });
});
