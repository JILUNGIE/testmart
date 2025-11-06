const electron = require("electron");

function ipcOn<K extends keyof ChannelEvent>(key: K, callback: any) {
  const cb = (_: Electron.IpcRendererEvent, payload: ChannelEvent[K]) =>
    callback(payload);
  electron.ipcRenderer.on(key, cb);

  return () => {
    electron.ipcRenderer.off(key, cb);
  };
}

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeChannelMsg: (callback) =>
    ipcOn("CHANNEL_MSG", (msg: string) => {
      callback(msg);
    }),
  subscribeChannelPath: (callback) =>
    ipcOn("CHANNEL_PATH", (path: string[]) => {
      callback(path);
    }),
} satisfies Window["electron"]);
