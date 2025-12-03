interface ChannelEvent {
  CHANNEL_MSG: string;
  CHANNEL_PATH: () => string[];
  CHANNEL_DEV: boolean;
  CHANNEL_VIDEO: string[];
  CHANNEL_QUIT: any;
}

interface ILocalStorageData {
  api: {
    on: string;
    off: string;
    init: string;
  };
}

interface Window {
  electron: {
    subscribeChannelMsg: (callback: (msg: string) => void) => () => void;
    subscribeChannelPath: (callback: (path: string[]) => void) => () => void;
    reqOpenDevTools: () => void;
    reqGetVideoList: () => void;
    reqQuitApp: () => void;
    reqVideoFiles: () => Promise<string[]>;
  };
}
