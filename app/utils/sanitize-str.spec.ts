import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr (unit)", () => {
  it("returns an empty string when given a falsy value", () => {
    // @ts-expect-error testing function without parameters
    expect(sanitizeStr()).toBe("");
  });

  it("returns an empty string when it receives a non-string value", () => {
    // @ts-expect-error testing function with incorrect typing
    expect(sanitizeStr(123)).toBe("");
  });

  it("ensure the trim of the sent string", () => {
    expect(sanitizeStr("   a   ")).toBe("a");
  });

  it("ensures that the string is normalized with NFC", () => {
    const original = "e\u0301";
    const expected = "é";
    expect(expected).toBe(sanitizeStr(original));
  });
});
