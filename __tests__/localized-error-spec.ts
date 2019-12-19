import { LocalizedError } from "../src/localized-error";

describe("Testing LocalizedError", () => {
  test("Should create a localizable error", () => {
    const defines = {
      code: 404, // Numeric value for this error
      messages: {
        "en-US": "User is not found!",
        "zh-CN": "用户未定义",
      }, // Customized Error Messsage
      name: "UserNotFound", // Sequential Error Description
      prefix: "java", // Prefix for Messages
    };

    const le = new LocalizedError(defines);
    expect(le).toBeTruthy();

    const MyError = le.get();
    expect(MyError).toBeTruthy();

    const me = new MyError("zh-CN");
    const json = me.toJSON();
    expect(json.message === "java:用户未定义").toBeTruthy();
    expect(json.code === 404).toBeTruthy();
    expect(json.name === "UserNotFound").toBeTruthy();

    const mee = new MyError("en-US");
    const jsone = mee.toJSON();
    expect(jsone.message === "java:User is not found!").toBeTruthy();
    expect(jsone.code === 404).toBeTruthy();
    expect(jsone.name === "UserNotFound").toBeTruthy();
    expect(me.getMessage("zh-CN") === mee.getMessage("zh-CN")).toBeTruthy();
    expect(me.getMessage("en-US") === mee.getMessage("en-US")).toBeTruthy();
  });

  test("Should create a localizable error", () => {
    const defines = {
      code: 404, // Numeric value for this error
      messages: {
        "en-US": "User is not found!",
        "zh-CN": "用户未定义",
      }, // Customized Error Messsage
      name: "UserNotFound", // Sequential Error Description
    };

    const le = new LocalizedError(defines);
    expect(le).toBeTruthy();

    const MyError = le.get();
    expect(MyError).toBeTruthy();

    const me = new MyError("zh-CN");
    const json = me.toJSON();
    expect(json.message === "用户未定义").toBeTruthy();
    expect(json.code === 404).toBeTruthy();
    expect(json.name === "UserNotFound").toBeTruthy();

    const mee = new MyError("en-US");
    const jsone = mee.toJSON();
    expect(jsone.message === "User is not found!").toBeTruthy();
    expect(jsone.code === 404).toBeTruthy();
    expect(jsone.name === "UserNotFound").toBeTruthy();
    expect(me.getMessage("zh-CN") === mee.getMessage("zh-CN")).toBeTruthy();
    expect(me.getMessage("en-US") === mee.getMessage("en-US")).toBeTruthy();
  });

  test("Should error when messages is missing", () => {
    const defines = {
      code: 404, // Numeric value for this error
      name: "UserNotFound", // Sequential Error Description
    };

    const le = new LocalizedError(defines);
    let catched = false;

    try {
      const MyError = le.get();

      const me = new MyError("zh-CN");
      expect(me.getMessage("zh-CN")).toBeTruthy();
    } catch (e) {
      // console.log(e);
      expect(e.message === "No message found!");
      catched = true;
    }
    expect(catched).toBeTruthy();
  });

  test("Should error when messages is missing", () => {
    const defines = {
      code: 404, // Numeric value for this error,
      messages: { "en-US": "Loodod" },
      name: "UserNotFound", // Sequential Error Description
      prefix: "java", // Prefix for Messages
    };

    const le = new LocalizedError(defines);
    let catched = false;
    try {
      const MyError = le.get();
      const me = new MyError("zh-CN");
      expect(me.getMessage("zh-CN")).toBeTruthy();
    } catch (e) {
      expect(e.message === "No locale found!");
      catched = true;
    }
    expect(catched).toBeTruthy();
  });

  test("Should create a localizable error", () => {
    const defines = {
      code: 404, // Numeric value for this error
      messages: {
        "en-US": "User is not found!",
        "zh-CN": "用户未定义",
      }, // Customized Error Messsage
      prefix: "java", // Prefix for Messages
    };

    const le = new LocalizedError(defines);
    const errorClass = le.get();
    expect(errorClass).toBeTruthy();
  });
});
