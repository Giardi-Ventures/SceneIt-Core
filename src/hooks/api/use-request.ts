import { useState } from "react";
import { Error, RequestCallback, SimpleError } from "../../common";

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
  const [state, setState] = useState<CoreState<DataResponse>>({
    data: null,
    error: null,
    request: null,
    isLoading: true,
  });

  const dispatch = async (params?: RequestParams): Promise<RequestCallback<DataResponse> | null> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log("USE IT DAD");

      const requestResponse = await apiRequest(params);
      console.log("We got here Mommy", requestResponse);

      if (onResolve) onResolve(requestResponse);

      setState({
        data: requestResponse.data || null,
        request: requestResponse,
        error: requestResponse.error || null,
        isLoading: false,
      });

      return requestResponse;
    } catch (e) {
      console.log("WATS UP", e);
      const errorObj = SimpleError("unknown_issue", e);

      // @ts-ignore
      setState((prev) => ({
        ...prev,
        error: errorObj,
        isLoading: false,
      }));

      return null;
    }
  };

  return { dispatch, ...state };
}
