import {useEffect} from "react";
import {RequestParams} from "../apis";
import {Callback} from "../common";
import {useRequest} from "./use-request";

export function useFetch<DataResponse>(
  requestParams: (params?: RequestParams) => Promise<Callback<DataResponse>>,
  onResolve?: (data: Callback<DataResponse>) => void,
) {
  const {dispatch, ...extra} = useRequest(requestParams, onResolve);

  useEffect(() => {
    dispatch();
  }, []);

  return extra;
}
