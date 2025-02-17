import {RequestCallback} from "../../common/callbacks/request-callback";
import {apiRequest, RequestParams} from "./api-request";

export type ListRequestParams<T> = RequestParams<T> & {
  cursor?: any;
};

export async function listRequest<T = any>(
  params: ListRequestParams<T>,
): Promise<RequestCallback<T>> {
  const {cursor = null, body, ...requestParams} = params;

  return apiRequest({...requestParams, body: {...body, cursor}});
}
