import { ipcMain, type WebContents, screen, app } from "electron";
import { existsSync, mkdirSync } from "fs";
import path from "path";

const VIDEO_FOLDER_NAME = "mart_video";

function isDev() {
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  return false;
}

function checkExternalDisplay() {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find(
    (display) => display.bounds.x !== 0 || display.bounds.y !== 0
  );

  return { externalDisplay };
}

function checkExistsFolder() {
  const videoPath = path.join(app.getPath("videos"), `/${VIDEO_FOLDER_NAME}`);
  try {
    if (!existsSync(videoPath)) {
      mkdirSync(videoPath);
    }
  } catch (err) {
    console.log(err);
  }
}

function ipcWebContentsSend<K extends keyof ChannelEvent>(
  key: K,
  webContents: WebContents,
  payload: ChannelEvent[K]
) {
  webContents.send(key, payload);
}

function ipcOn<K extends keyof ChannelEvent>(
  key: K,
  handler: (payload: any) => void
) {
  ipcMain.on(key, (payload) => handler(payload));
}

export {
  isDev,
  ipcWebContentsSend,
  ipcOn,
  checkExternalDisplay,
  checkExistsFolder,
  VIDEO_FOLDER_NAME,
};
