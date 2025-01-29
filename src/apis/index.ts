export * from "./entry-apis";
export * from "./media-apis";
export * from "./requests";

export function getURL(url: string) {
  if (url.startsWith("http")) {
    return url;
  }

  return "http://localhost:8080/" + url;
}

