import { error } from "../src/error";
test("Should greet with message", () => {
  const NotFound = error("NotFound", { messages: { "zh-CN": "Not Found!" } });
  expect(typeof NotFound === "function").toBeTruthy();
  const notFound = new NotFound("zh-CN");
  expect(notFound.name).toBe("NotFound");
  expect(notFound.message).toBe("Not Found!");
  expect(notFound.stack).toBeTruthy();
});

test("Should greet with message", () => {
  const NotFound = error("NotFound", {
    code: 404,
    messages: {
      en: "Not Found!",
      "zh-CN": "未找到",
    },
  });
  expect(typeof NotFound === "function").toBeTruthy();
  const notFound = new NotFound("zh-CN");
  expect(notFound.code).toBe(404);
  expect(notFound.locale).toBe("zh-CN");
  expect(Object.keys(notFound.messages).length === 2).toBeTruthy();

  const noneLocale = new NotFound();
  expect(noneLocale.code).toBe(404);
  expect(noneLocale.locale).toBeFalsy();
  expect(noneLocale.toJSON()).toBeTruthy();
});
