import {
  CaseReducers,
  createAction,
  createSlice,
  CreateSliceOptions,
  Slice,
  SliceCaseReducers,
  SliceSelectors,
} from "@reduxjs/toolkit";

export const updateGlobalState = createAction("global/updateState", (path, data) => ({
  payload: {path, data},
}));

export const upsertGlobalStateArray = createAction(
  "global/updateStateArray",
  (params: Omit<UpdateParams<any>, "obj">) => ({
    payload: params,
  }),
);

export function createCoreSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
  Selectors extends SliceSelectors<State>,
  ReducerPath extends string = Name,
>({
  name,
  initialState,
  reducers,
}: CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>): Slice<
  State,
  CaseReducers,
  Name,
  ReducerPath,
  Selectors
> {
  return createSlice({
    name,
    reducers,
    initialState,
    extraReducers: (builder) => {
      builder.addCase(updateGlobalState, (state, action) => {
        const {path, data}: {path: string; data: any} = action.payload;

        const splits = path.split(".");
        if (splits[0] === name) {
          setObjectValue(state, splits.slice(1).join("."), action.payload.data);
        }
      });

      builder.addCase(upsertGlobalStateArray, (state, action) => {
        const {path} = action.payload;

        const splits = path.split(".");
        if (splits[0] === name) {
          updateObjectInArray({
            ...action.payload,
            path: splits.slice(1).join("."),
            obj: state,
          });
        }
      });
    },
  });
}

function setObjectValue(obj: any, path: string, value: any) {
  if (typeof path !== "string" || !path) return;

  const keys = path.split(".");
  let current: any = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

interface UpdateParams<T> {
  obj: T;
  path: string;
  id: string | number;
  idKey?: string;
  newValue: Partial<T>;
}

export function updateObjectInArray<T extends object>({
  obj,
  path,
  id,
  idKey = "id",
  newValue,
}: UpdateParams<T>): void {
  if (typeof path !== "string" || !path) return;

  const keys = path.split(".");
  let current: any = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      return;
    }
    current = current[key];
  }

  if (Array.isArray(current)) {
    const index = current.findIndex((item) => item[idKey] === id);
    if (index !== -1) {
      current[index] = {...current[index], ...newValue};
    } else {
      current.push(newValue);
    }
  }
}
