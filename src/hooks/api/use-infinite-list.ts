import {useState} from "react";
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
  const [{isRefreshing, data}, setState] = useState<State>({
    isRefreshing: false,
    data: [],
  });

  console.log("DATA IN INF", data);

  const {isLoading, error, dispatch: listDispatch, hasNext, next} = useListRequest<
    RequestParams,
    DataResponse
  >(listParams, (info) => {
    onResolve && onResolve(info);

    console.log("THIS IS DATA", data);

    if (info.error === null) {
      setState((prevState) => ({
        isRefreshing: false,
        data: [...prevState.data, ...info.data as []], // Use latest state
      }));
    }
  });

  const loadMore = async () => {
    setState({data, isRefreshing: true});

    return next();
  };

  const dispatch = async (data) => {
    setState({data: [], isRefreshing: false});

    setTimeout(() => {
      listDispatch(data);
    }, 1000);
  }

  console.log("DATA", data);

  return {dispatch, loadMore, isRefreshing, isLoading, error, data, hasMore: hasNext};
}
