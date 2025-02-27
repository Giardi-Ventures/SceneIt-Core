import {useState} from "react";
import {Callback, CommonError, RequestCallback, SimpleError} from "../../common";

type CoreState<DataType = any> = {
  data: DataType | null;
  error: Error | null;
  request: RequestCallback<DataType> | null;
  isLoading: boolean;
};

export function useRequest<RequestParams, DataResponse>(
  apiRequest: (params?: RequestParams) => Promise<RequestCallback<DataResponse>>,
  onResolve?: (data: RequestCallback<DataResponse>) => void,
) {
  const [{data, error, isLoading, request}, setState] = useState<CoreState<DataResponse>>(
    {
      data: null,
      error: null,
      request: null,
      isLoading: false,
    },
  );

  const dispatch = async (params?: RequestParams): Promise<RequestCallback> => {
    setState({request: null, error: null, data: null, isLoading: true});
    console.log("USE IT DAD");

    const postLoadingState = {request: null, error: null, data: null, isLoading: false};

    try {
      const requestResponse = await apiRequest(params);

      console.log("We got here Mommy", requestResponse);

      onResolve && onResolve(requestResponse);

      postLoadingState.data = requestResponse.data;
      postLoadingState.request = requestResponse;

      setState(postLoadingState);

      return requestResponse;
    } catch (e) {
      console.log("WATS UP", e);

      postLoadingState.error = SimpleError("unknown_issue", e);
    } finally {
      setState(postLoadingState);
    }

    return postLoadingState.error;
  };

  return {dispatch, isLoading, error, data, request};
}
