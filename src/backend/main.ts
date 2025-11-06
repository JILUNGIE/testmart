import { app, BrowserWindow } from "electron";
import {
  getPreloadPath,
  getUIPath,
  getPublicPath,
} from "./utils/pathResolver.js";
import pkg from "electron-updater";
import { ipcWebContentsSend, isDev } from "./utils.js";
const { autoUpdater } = pkg;
// import path from "path";
import { readdirSync, readFileSync } from "fs";

app.disableHardwareAcceleration(); // need orangepi only.... maybe....?

let win: BrowserWindow;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,

    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(getUIPath());
    win.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createWindow();

  win.webContents.on("did-finish-load", () => {
    try {
      const readFiles = readdirSync(getPublicPath());

      const getPullFilesDirList = readFiles.filter((file) =>
        file.endsWith(".mp4")
      );

      ipcWebContentsSend("CHANNEL_PATH", win.webContents, getPullFilesDirList);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }

    autoUpdater.on("checking-for-update", () => {
      ipcWebContentsSend("CHANNEL_MSG", win.webContents, "cheking");
    });

    autoUpdater.on("update-not-available", () => {
      ipcWebContentsSend(
        "CHANNEL_MSG",
        win.webContents,
        "update not available"
      );
    });

    autoUpdater.on("error", (err) => {
      ipcWebContentsSend(
        "CHANNEL_MSG",
        win.webContents,
        "update errror: " + err.message
      );
    });

    autoUpdater.on("update-available", () => {
      ipcWebContentsSend("CHANNEL_MSG", win.webContents, "update-available");
    });

    autoUpdater.on("download-progress", (progressObj) => {
      let progress = progressObj.bytesPerSecond;
      ipcWebContentsSend("CHANNEL_MSG", win.webContents, `${progress} "%"`);
    });

    autoUpdater.on("update-downloaded", () => {
      autoUpdater.quitAndInstall();
    });
    autoUpdater.checkForUpdates();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
