import {Callback} from "./callback";

export type Error = {
  code: string;
  message?: string;
  data?: any;
};

export function UnknownError<G = any>(data: any): Callback<G> {
  return new Callback<G>({
    error: {
      code: "unknown_error",
      message: "An unknown error has occured",
      data,
    },
  });
}

export function CommonError<G = any>(error: Error): Callback<G> {
  if (error.code) {
    return new Callback<G>({error});
  }

  return UnknownError<G>(error);
}

export function SimpleError<G = any>(code: string, error?: Error): Callback<G> {
  return new Callback<G>({
    error: {
      code,
      data: ExtraError(error),
    },
  });
}

export function ExtraError(error) {
  if (error.name) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return error;
}
