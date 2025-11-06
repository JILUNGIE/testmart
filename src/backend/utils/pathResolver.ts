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
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs"
  );
}

export { getUIPath, getPublicPath, getPreloadPath };
