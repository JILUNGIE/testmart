import { app } from "electron";
import path from "path";
import { isDev } from "../utils.js";

function getUIPath() {
  return path.join(app.getAppPath(), "dist-react/index.html");
}

function getPublicPath() {
  return path.join(
    path.join(app.getAppPath(), isDev() ? "." : "..", "/public")
  );
}

function getPreloadPath() {
  // test 결과 getAppPath 의 위치와 dist-electron/preload.cjs 가 동일함
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "",
    "dist-electron/preload.cjs"
  );
}

export { getUIPath, getPublicPath, getPreloadPath };
