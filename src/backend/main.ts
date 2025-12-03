import { app, BrowserWindow, ipcMain, net, protocol } from "electron";
import { getPreloadPath, getUIPath } from "./utils/pathResolver.js";
import {
  checkExistsFolder,
  checkExternalDisplay,
  ipcOn,
  ipcWebContentsSend,
  isDev,
  VIDEO_FOLDER_NAME,
} from "./utils.js";
import { readdirSync } from "fs";
import path from "path";
import pkg from "electron-updater";
const { autoUpdater } = pkg;
import url from "node:url";

app.disableHardwareAcceleration(); // need orangepi only.... maybe....?

let win: BrowserWindow;

protocol.registerSchemesAsPrivileged([
  {
    scheme: "animation",
    privileges: {
      bypassCSP: true,
      stream: true,
      supportFetchAPI: true,
      standard: true,
      secure: true,
    },
  },
]);

const createWindow = () => {
  const { externalDisplay } = checkExternalDisplay();

  if (externalDisplay) {
    win = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      fullscreen: true,
      frame: false,

      webPreferences: {
        preload: getPreloadPath(),
      },
    });
  } else {
    win = new BrowserWindow({
      width: 800,
      height: 600,

      webPreferences: {
        preload: getPreloadPath(),
        webSecurity: false,
      },
    });
  }

  if (isDev()) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({
      mode: "bottom",
    });
  } else {
    win.loadFile(getUIPath());
  }
};

app.whenReady().then(() => {
  createWindow();
  checkExistsFolder();

  protocol.handle("animation", (req) => {
    const filePath = req.url.slice("animation://".length);
    const fileUrl = url.pathToFileURL(path.resolve(filePath)).toString();
    return net.fetch(fileUrl);
  });

  ipcMain.handle("video-req", async () => {
    try {
      const videoPath = path.join(app.getPath("videos"), "mart_video");
      const files = readdirSync(videoPath);

      const mp4Files = files
        .filter((file) => file.endsWith(".mp4"))
        .map(
          (file) =>
            url.pathToFileURL(
              path.join(app.getPath("videos"), "mart_video", file)
            ).href
        );

      console.log(mp4Files);
      return mp4Files;
    } catch (err) {
      return [""];
    }
  });

  // protocol.handle("animation", async (req) => {
  //   let filterVideoList: string[] = [];
  //   let videoPath = null;
  //   try {
  //     filterVideoList = readdirSync(
  //       path.join(app.getPath("videos"), `/${VIDEO_FOLDER_NAME}`)
  //     ).filter((file) => file.endsWith(".mp4"));

  //     if (filterVideoList.length === 0) {
  //       video_idx = 0;
  //       return net.fetch(
  //         `file://${path.join(app.getPath("videos"), VIDEO_FOLDER_NAME)}`
  //       );
  //     }

  //     if (filterVideoList.length - 1 > video_idx) {
  //       video_idx++;
  //     } else {
  //       video_idx = 0;
  //     }

  //     videoPath = filterVideoList[video_idx];
  //   } catch (err) {
  //     videoPath = "null";
  //   }
  //   console.log("videoPath: ", videoPath);
  //   const fileUrl = url
  //     .pathToFileURL(
  //       path.join(app.getPath("videos"), VIDEO_FOLDER_NAME, videoPath as string)
  //     )
  //     .toString();

  //   return net.fetch(fileUrl);
  // });

  win.webContents.on("did-finish-load", () => {
    ipcOn("CHANNEL_DEV", () =>
      win.webContents.openDevTools({
        mode: "bottom",
      })
    );

    ipcOn("CHANNEL_QUIT", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    autoUpdater.on("checking-for-update", () => {
      ipcWebContentsSend("CHANNEL_MSG", win.webContents, "cheking");
    });

    autoUpdater.on("update-not-available", (err) => {
      ipcWebContentsSend("CHANNEL_MSG", win.webContents, JSON.stringify(err));
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
      let progress = progressObj.percent;
      ipcWebContentsSend(
        "CHANNEL_MSG",
        win.webContents,
        `${progress.toFixed(1)} "%"`
      );
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
