// Todo -> 제네릭 필요 없을 듯...? 제거 예정

function getStorageItem<K extends keyof ILocalStorageData>(
  key: K
): ILocalStorageData[K] | undefined {
  const item = window.localStorage.getItem(key);
  if (!item) {
    return;
  }
  return JSON.parse(item);
}

function setStorageItem<K extends keyof ILocalStorageData>(
  key: K,
  payload: ILocalStorageData[K]
) {
  const item = JSON.stringify(payload);
  window.localStorage.setItem(key, item);
}

export { getStorageItem, setStorageItem };
