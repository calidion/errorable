import * as fs from "fs";
import * as path from "path";
import { Generator } from "../src/generator";
import { IErrorOptions } from "../src/localized-error";

describe("Testing Generator", () => {
  const json: IErrorOptions = {
    Hello: {
      code: 100,
      messages: {},
    },
    I: {
      Love: {
        You: {
          code: 1,
          messages: {
            "en-US": "I Love U!",
            "zh-CN": "我爱你！",
          },
        },
      },
    },
    Me: {
      alias: "I",
    },
  };

  test("Should create errors", () => {
    const errors: any = Generator.generate(json);
    expect(errors).toBeTruthy();
    expect(errors.ILoveYou).toBeTruthy();
    expect(errors.Hello).toBeTruthy();
    expect(errors.MeLoveYou).toBeTruthy();
  });

  test("Should create errors", () => {
    const errors: any = Generator.generate(json, true);
    expect(errors).toBeTruthy();
    expect(errors.I_LOVE_YOU).toBeTruthy();
    expect(errors.HELLO).toBeTruthy();
    expect(errors.ME_LOVE_YOU).toBeTruthy();
  });

  test("Should throw localized errors", () => {
    const errors: any = Generator.generate(json);
    let catched = false;
    try {
      const LError = errors.ILoveYou;
      throw new LError("en-US");
    } catch (e) {
      expect(e.name === "ILoveYou").toBeTruthy();
      expect(e.message === "I Love U!").toBeTruthy();
      expect(e.code === 1).toBeTruthy();
      catched = true;
    }
    expect(catched).toBeTruthy();
  });

  test("Should load from / save to json files", () => {
    const jsonFilename = path.resolve(__dirname, "./tmp.json");
    Generator.save(jsonFilename, json);

    const newJson = Generator.load(jsonFilename);

    expect(json).toEqual(newJson);
    fs.unlinkSync(jsonFilename);
  });
});
