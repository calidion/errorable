import { IErrorOptions } from "./localized-error";
export function error(name: string, options: IErrorOptions) {
  return class extends Error {
    [key: string]: any;
    constructor(locale?: string) {
      let message = "";
      if (locale && options.messages && options.messages[locale]) {
        message = options.messages[locale];
      }
      super(message);
      this.name = name;
      this.locale = locale;
      Object.assign(this, options);
    }
    public toJSON() {
      return {
        code: this.code,
        message: this.locale ? this.getMessage(this.locale) : "",
        name: this.name,
      };
    }
    public getMessage(locale: string) {
      if (!this.messages) {
        throw new Error("No message found!");
      }
      if (!this.messages[locale]) {
        throw new Error("No locale found!");
      }
      return (this.prefix ? this.prefix + ":" : "") + this.messages[locale];
    }
  };
}
