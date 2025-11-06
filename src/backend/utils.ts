import { type WebContents } from "electron";

function isDev() {
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  return false;
}

function ipcWebContentsSend<K extends keyof ChannelEvent>(
  key: K,
  webContents: WebContents,
  payload: ChannelEvent[K]
) {
  webContents.send(key, payload);
}

export { isDev, ipcWebContentsSend };
