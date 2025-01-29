import {Error} from "../error";

export enum ResponseType {
  error = "error",
  object = "object",
  list = "list",
}

// Parameters for Callback Constructor
export type CallbackParams<G> = {
  type?: ResponseType;
  error?: Error | null;
  data?: G | null;
};

export function CommonCallback<G = any>(data: G | null = null, object = {}): Callback<G> {
  return new Callback<G>({...object, data});
}

// Callback Class
export class Callback<G = any> {
  /**
   * Error Object
   */
  public error?: Error | null = null;

  /**
   * Data
   */
  public data?: G | null = null;

  constructor(params: CallbackParams<G>) {
    Object.assign(this, params);
  }

  // Check if successful
  isSuccess(): boolean {
    return this.error === null;
  }

  unwrap(): G {
    if (this.error) {
      throw this.error;
    }

    return this as unknown as G;
  }

  // Convert Callback to JSON format
  toJSON() {
    return this;
  }

  // Override toString for logging
  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
