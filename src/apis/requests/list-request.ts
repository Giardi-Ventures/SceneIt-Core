import {RequestCallback} from "../../common/callbacks/request-callback";
import {apiRequest, RequestParams} from "./api-request";

export type ListRequestParams = RequestParams & {
  cursor?: any;
};

export async function listRequest<T = any>(
  params: ListRequestParams,
): Promise<RequestCallback<T>> {
  const {cursor = null, body, ...requestParams} = params;

  return apiRequest({...requestParams, body: {...body, cursor}});
}
