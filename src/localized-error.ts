import { error } from "./error";
export interface ILocalizedMessage {
  [key: string]: string;
}

export interface IErrorOptions {
  name?: string;
  code?: number;
  messages?: ILocalizedMessage;
  prefix?: string;
  alias?: string;
  [key: string]: any;
}

export class LocalizedError {
  protected options: IErrorOptions;
  constructor(options: IErrorOptions) {
    this.options = options;
  }

  public get() {
    return error(this.options.name || "", this.options);
  }
}
