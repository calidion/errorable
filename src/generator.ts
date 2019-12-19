import { IErrorOptions, LocalizedError } from "./localized-error";

export class Generator {
  public static capitalize(str: string, upperCase: boolean = false) {
    if (!upperCase) {
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
    }
    return str.toUpperCase();
  }

  public static getName(upperCase: boolean, k: string, name: string = "") {
    if (!upperCase) {
      return name + Generator.capitalize(k);
    } else {
      if (name !== "") {
        return name + "_" + Generator.capitalize(k, upperCase);
      } else {
        return name + Generator.capitalize(k, upperCase);
      }
    }
  }

  public static generate(options: IErrorOptions, upperCase: boolean = false) {
    const errors = {};
    this._generate(upperCase, errors, options);
    return errors;
  }

  private static _generate(
    upperCase: boolean,
    savor: any,
    data: any,
    name?: string
  ) {
    if (name && data && data.messages) {
      const options: IErrorOptions = {
        code: data.code,
        messages: data.messages,
        name,
        prefix: data.prefix,
      };
      const le = new LocalizedError(options);
      savor[name] = le.get();
    }
    for (const k of Object.keys(data)) {
      if (k === "messages" || k === "code") {
        continue;
      }

      let subData = data[k];

      if (data[k].alias) {
        subData = data[data[k].alias];
      }
      this._generate(
        upperCase,
        savor,
        subData,
        Generator.getName(upperCase, k, name)
      );
    }
  }
}
