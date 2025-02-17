export * from "./viewing/viewing-apis";
export * from "./entry-apis";
export * from "./requests";
export * from "./media";

export function getURL(url: string) {
  if (url.startsWith("http")) {
    return url;
  }

  return "http://localhost:8080/" + url;
}

