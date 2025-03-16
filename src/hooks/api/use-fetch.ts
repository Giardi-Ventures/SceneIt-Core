import {useEffect} from "react";
import {RequestParams} from "../../apis";
import {Callback, RequestCallback, Error} from "../../common";
import {useRequest} from "./use-request";

export type FetchPayload<DataResponse = any> = {
  isLoading: boolean;
  error: Error;
  data: DataResponse;
  request: RequestCallback<DataResponse>;
};

export function useFetch<DataResponse>(
  requestParams: (
    params?: RequestParams<DataResponse>,
  ) => Promise<RequestCallback<DataResponse>>,
  onResolve?: (data: Callback<DataResponse>) => void,
) {
  const {dispatch, ...extra} = useRequest(requestParams, onResolve);

  useEffect(() => {
    dispatch();
  }, []);

  return extra;
}
