const electron = require("electron");

function ipcOn<K extends keyof ChannelEvent>(key: K, callback: any) {
  const cb = (_: Electron.IpcRendererEvent, payload: ChannelEvent[K]) =>
    callback(payload);
  electron.ipcRenderer.on(key, cb);

  return () => {
    electron.ipcRenderer.off(key, cb);
  };
}

function ipcSend<K extends keyof ChannelEvent>(key: K, payload: any) {
  electron.ipcRenderer.send(key, payload);
}

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeChannelMsg: (callback) =>
    ipcOn("CHANNEL_MSG", (msg: string) => {
      callback(msg);
    }),
  subscribeChannelPath: (
    callback // not use
  ) =>
    ipcOn("CHANNEL_PATH", (path: string[]) => {
      callback(path);
    }),
  // 파라메터 지금은 필요 없긴 한데.... 일단 암거나 넣어봄..
  reqOpenDevTools: () => ipcSend("CHANNEL_DEV", null),
  reqGetVideoList: () => ipcSend("CHANNEL_PATH", null), // not use
  reqQuitApp: () => ipcSend("CHANNEL_QUIT", null),
  reqVideoFiles: () => electron.ipcRenderer.invoke("video-req"),
} satisfies Window["electron"]);
