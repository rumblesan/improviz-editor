import { app } from "electron";
import jetpack from "fs-jetpack";

const defaultConfig = {
  improviz: {
    host: "localhost",
    port: "3000",
  },
  keyMap: "default",
  transparent: false,
  lineNumbers: true,
  performanceMode: false,
};

const configStoreFile = `improviz-config.json`;

export function loadConfig() {
  const userDataDir = jetpack.cwd(app.getPath("userData"));
  const restoredConfig = userDataDir.read(configStoreFile, "json");
  return Object.assign({}, defaultConfig, restoredConfig);
}

export function saveConfig(cfg) {
  const userDataDir = jetpack.cwd(app.getPath("userData"));
  userDataDir.write(configStoreFile, cfg, { atomic: true });
}
