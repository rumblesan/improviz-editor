import { loadConfig, saveConfig } from "../config";

export const settingsMenuTemplate = {
  label: "Settings",
  submenu: [
    {
      label: "Transparency",
      click: () => {
        const cfg = loadConfig();
        cfg.transparent = !cfg.transparent;
        saveConfig(cfg);
      },
    },
    {
      label: "Performance Mode",
      click: () => {
        const cfg = loadConfig();
        cfg.performanceMode = !cfg.performanceMode;
        saveConfig(cfg);
      },
    },
  ],
};
