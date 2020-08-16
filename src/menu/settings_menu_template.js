import { loadConfig, saveConfig } from "../config";

export const settingsMenuTemplate = {
  label: "Settings",
  submenu: [
    {
      label: "Transparency",
      accelerator: "CmdOrCtrl+R",
      click: () => {
        const cfg = loadConfig();
        cfg.transparent = !cfg.transparent;
        saveConfig(cfg);
      },
    },
  ],
};
