import { app } from "electron";
import jetpack from "fs-jetpack";

const defaultConfig = {
  improviz: {
    host: "localhost",
    port: "3000",
  },
  transparent: false,
  keyMap: "default",
  lineNumbers: false,
  theme: "improviz",
  performanceMode: false,
  program: "t = time/100\nrotate(t)\nfill(1, 0, 0.8, 0.5)\ncube(1)",
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
