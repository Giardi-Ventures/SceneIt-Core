import {useEffect, useState} from "react";
import {Callback, CommonError, RequestCallback, SimpleError} from "../../common";
import {useRequest} from "./use-request";
import {listRequest, ListRequestParams} from "../../apis";
import {useListRequest} from "./use-list-request";

type State<DataType = any> = {
  data: DataType | null;
  isRefreshing: boolean;
};

export function useInfiniteList<RequestParams, DataResponse = any[]>(
  listParams: ListRequestParams<DataResponse>,
  onResolve?: (data: RequestCallback<DataResponse>) => void,
) {
  const [isClearing, setIsClearing] = useState(null);
  const [{isRefreshing, data}, setState] = useState<State>({
    isRefreshing: false,
    data: [],
  });

  console.log("DATA IN INF", data);

  const {
    isLoading,
    error,
    dispatch: listDispatch,
    hasNext,
    next,
  } = useListRequest<RequestParams, DataResponse>(listParams, (info) => {
    onResolve && onResolve(info);

    console.log("THIS IS DATA", data);

    if (info.error === null) {
      setState((prevState) => ({
        isRefreshing: false,
        data: [...prevState.data, ...(info.data as [])], // Use latest state
      }));
    }
  });

  const loadMore = async () => {
    if (!isRefreshing) {
      setState({data, isRefreshing: true});

      return next();
    }

    return null;
  };

  useEffect(() => {
    if (isClearing !== null) {
      listDispatch(isClearing);
      setIsClearing(null);
    }
  }, [isClearing]); // Dispatch only when clearing is done

  const dispatch = async (data) => {
    setState({data: [], isRefreshing: true});
    setIsClearing(data); // Trigger the clearing effect
  };

  console.log("DATA", data);

  return {dispatch, loadMore, isRefreshing, isLoading, error, data, hasMore: hasNext};
}
