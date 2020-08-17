import path from "path";
import url from "url";
import { app, ipcMain, Menu } from "electron";
import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
import { settingsMenuTemplate } from "./menu/settings_menu_template";
import createWindow from "./helpers/window";

import { loadConfig, saveConfig } from "./config";

import env from "env";

const setApplicationMenu = () => {
  const menus = [editMenuTemplate, settingsMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

ipcMain.on("load-config", (event, arg) => {
  console.log(arg);
  event.returnValue = loadConfig();
});

ipcMain.on("save-config", (event, cfg) => {
  console.log("saving config", cfg);
  saveConfig(cfg);
  event.returnValue = "";
});

app.on("ready", () => {
  setApplicationMenu();

  const cfg = loadConfig();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    transparent: cfg.transparent,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Loading dev tools messes up the transparency for some reason
  if (env.name === "development" && !cfg.transparent) {
    mainWindow.openDevTools();
  }
});

app.on("window-all-closed", () => {
  app.quit();
});
