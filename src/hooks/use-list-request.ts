import {useState} from "react";
import {Callback, CommonError, RequestCallback, SimpleError} from "../common";
import {useRequest} from "./use-request";
import {listRequest, ListRequestParams} from "../apis";

type CoreState<DataType = any> = {
  data: DataType | null;
  error: Error | null;
  request: RequestCallback<DataType> | null;
  isLoading: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
};

export function useListRequest<RequestParams, DataResponse>(
  listParams: ListRequestParams,
  onResolve?: (data: RequestCallback<DataResponse>) => void,
) {
  const [{data, error, isLoading, request, hasNext, hasPrevious}, setState] = useState<
    CoreState<DataResponse>
  >({
    data: null,
    error: null,
    request: null,
    isLoading: false,
    hasNext: false,
    hasPrevious: false,
  });

  const dispatch = async (params?: RequestParams, cursor = null): Promise<RequestCallback> => {
    setState({
      request: null,
      error: null,
      data: null,
      isLoading: true,
      hasNext: false,
      hasPrevious: false,
    });

    const postLoadingState = {
      request: null,
      error: null,
      data: null,
      isLoading: true,
      hasNext: false,
      hasPrevious: false,
    };

    try {
      const requestResponse = await listRequest({...listParams, body: params, cursor});

      onResolve && onResolve(requestResponse);

      postLoadingState.data = requestResponse.data;
      postLoadingState.request = requestResponse;
      postLoadingState.hasNext = requestResponse.cursor.next !== null;
      postLoadingState.hasPrevious = requestResponse.cursor.last !== null;
      postLoadingState.isLoading = false;

      setState(JSON.parse(JSON.stringify(postLoadingState)));

      return requestResponse;
    } catch (e) {
      postLoadingState.error = SimpleError("unknown_issue", e);
    } finally {
      setState(postLoadingState);
    }

    return postLoadingState.error;
  };

  const next = async () => {
    return dispatch({...request.params}, request.cursor.next);
  };

  const last = async () => {
    return dispatch({...request.params}, request.cursor.last);
  };

  return {dispatch, next, last, isLoading, error, data, request, hasNext, hasPrevious};
}
