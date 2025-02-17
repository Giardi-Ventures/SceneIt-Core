import {Error, Event, ResponseType} from "../index";
import {listRequest} from "../../apis";
import {Callback, CallbackParams} from "./callback";

export type Cursor = {
  next: any | null;
  last: any | null;
}

export type RequestCallbackParams<G = any> = CallbackParams<G> & {
  reqId?: string | null;
  events?: Event[];
  url?: string | null;
  cursor?: Cursor | null;
  total?: number | null;
};

export function ListRequestCallback<G = any>(
  object: RequestCallbackParams<G> = {},
): RequestCallback<G> {
  return new RequestCallback<G>({...object, type: ResponseType.list});
}

export function CommonRequestCallback<G = any>(
  data: G | null = null,
  object = {},
): RequestCallback<G> {
  return new RequestCallback<G>({...object, data});
}

export function ErrorRequestCallback(
  error: Error,
  object = {},
): RequestCallback {
  return new RequestCallback({...object, error});
}

export class RequestCallback<G = any> extends Callback<G> {
  /**
   * Request ID
   */
  public reqId: string | null;

  /**
   * Event IDs
   */
  public events: Event[];

  /**
   * Response Type
   */
  public type: ResponseType;

  public cursor: Cursor | null;
  public total: number | null;
  public params: any | null;
  public url: string;

  constructor(props: RequestCallbackParams<G>) {
    super(props);
  }

  next() {
    return listRequest({url: this.url, body: this.params, cursor: this.cursor.next});
  }
}
