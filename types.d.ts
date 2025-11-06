interface ChannelEvent {
  CHANNEL_MSG: string;
  CHANNEL_PATH: string[];
}

interface Window {
  electron: {
    subscribeChannelMsg: (callback: (msg: string) => void) => () => void;
    subscribeChannelPath: (callback: (path: string[]) => void) => () => void;
  };
}
