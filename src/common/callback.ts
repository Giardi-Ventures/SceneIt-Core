import {Error} from "./error";
import {Event} from "./event";

// ResponseType Enum
export enum ResponseType {
  error = "error",
  object = "object",
  list = "list",
}

// Parameters for Callback Constructor
type CallbackParams<G> = {
  reqId?: string | null;
  events?: Event[];
  type?: ResponseType;
  error?: Error | null;
  data?: G | null;
  url?: string | null;
};

export function CommonCallback<G = any>(data: G | null = null, object = {}): Callback<G> {
  return new Callback<G>({...object, data});
}

// Callback Class
export class Callback<G = any> {
  /**
   * Request ID
   */
  public readonly reqId: string | null;

  /**
   * Event IDs
   */
  public readonly events: Event[];

  /**
   * Response Type
   */
  public readonly type: ResponseType;

  /**
   * Error Object
   */
  public readonly error?: Error | null;

  /**
   * Data
   */
  public readonly data?: G | null;

  /**
   * Used to test
   */
  public readonly url: string;
  public readonly total: number | null;
  public readonly cursor: any | null;

  [key: string]: any;

  constructor({
    reqId = null,
    events = [],
    type = ResponseType.object,
    error = null,
    data = null,
    url = null,
  }: CallbackParams<G>) {
    // Assign properties
    this.reqId = reqId;
    this.events = events;
    this.type = type;
    this.error = error;
    this.data = data;
    this.url = url;

    Object.assign(this, data);
  }

  // Static Success
  static Success<T>(data: T, params: CallbackParams<T> = {}): Callback<T> {
    const {reqId, events, type = ResponseType.object} = params;

    return new Callback<T>({
      data,
      reqId,
      events,
      type,
    });
  }

  static Failure<T = any>(error: Error, params: CallbackParams<T> = {}): Callback<T> {
    const {reqId, events, type = ResponseType.error} = params;

    return new Callback<T>({
      error,
      reqId,
      events,
      type,
    });
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

  // Set a new reqId and return a new instance
  setReqId(reqId: string): Callback<G> {
    return new Callback<G>({
      reqId,
      events: this.events,
      type: this.type,
      error: this.error,
      data: this.data,
      url: this.url,
    });
  }

  setUrl(url: string): Callback<G> {
    return new Callback<G>({
      url,
      reqId: this.reqId,
      events: this.events,
      type: this.type,
      error: this.error,
      data: this.data,
    });
  }

  // Convert Callback to JSON format
  toJSON() {
    return {
      reqId: this.reqId,
      events: this.events,
      type: this.type,
      error: this.error,
      data: this.data,
    };
  }

  // Override toString for logging
  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
