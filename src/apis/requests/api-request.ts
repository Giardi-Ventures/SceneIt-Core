import {CommonRequestCallback, RequestCallback} from "../../common/callbacks/request-callback";
import {Callback, CommonError, SimpleError} from "../../common";
import {ZodType} from "zod";
import {getURL} from "../index";
import {AuthState, globalStore} from "../../redux";

export type RequestParams = {
  url: string;
  body?: Object | any | null;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  schema?: ZodType;
  onCallback?: (callback: Callback) => void;
};

export async function apiRequest<T = any>(
  params: RequestParams,
): Promise<RequestCallback<T>> {
  let {url, schema, onCallback, body = null, method = "GET"} = params;

  if (schema) {
    const {success, error} = schema.safeParse(body);

    if (!success) {
      return new RequestCallback(
        CommonError({
          code: "client_validation",
          data: error.flatten(),
        }),
      );
    }
  }

  const {auth}: {auth: AuthState} = globalStore.getState();

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (auth.token) {
    headers["authorization"] = auth.token;
  }

  console.log("Auth token", auth);

  const requestPayload: any = {
    method: method,
    headers: headers,
  };

  if (body !== null) {
    if (method === "GET") {
      const paramList = Object.keys(body).map((item) => {
        return item + "=" + encodeURIComponent(body[item]);
      });

      if (paramList.length > 0) {
        url += "?" + paramList.join("&");
      }
    } else {
      requestPayload.body = typeof body === "string" ? body : JSON.stringify(body);
    }
  }

  // console.log("Config", config);
  // console.log("Auth", auth);

  const requestStart = Date.now();
  // if (config.logExtensions.includes(LogExtension.REQUEST_URL)) {
  //   console.log("\n>>", config.url + url, "<<");
  // }
  //
  // if (config.logExtensions.includes(LogExtension.REQUEST_BODY)) {
  //   console.log("\nBody:", body);
  // }

  console.log(getURL(url), requestPayload);

  const response = await fetch(getURL(url), requestPayload).catch((e) => {
    return SimpleError("internal_error", e);
  });

  if (response instanceof Callback) {
    return new RequestCallback(response);
  }

  const jsonResponse = await response.json().catch((e) => {
    return SimpleError("api_parse_error", e);
  });

  if (jsonResponse instanceof Callback) {
    return new RequestCallback(jsonResponse);
  }

  // if (config.logExtensions.includes(LogExtension.REQUEST_RESPONSE)) {
  //   console.log("\nResponse:", jsonResponse);
  // }
  //
  // if (config.logExtensions.includes(LogExtension.REQUEST_SPEED)) {
  //   console.log("\nSpeed: ", ((Date.now() - requestStart) / 1000).toFixed(2), "seconds");
  // }

  // jsonResponse._core = {
  //   url: config.url + url,
  // };

  const dataResponse = new RequestCallback(jsonResponse);

  dataResponse.params = body;
  dataResponse.url = getURL(url);

  onCallback && onCallback(dataResponse);

  return dataResponse;
}
