import { ipcRenderer } from "electron";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint.css";
import CodeMirror from "codemirror";
import "codemirror/keymap/vim";
import "codemirror/addon/lint/lint";

import "./app.html";

import "./stylesheets/main.scss";

import "./helpers/external_links.js";

import * as templates from "./templates";
import { clickHandler } from "./dom";

import { Improviz } from "./improviz";
import { EventBus } from "./event-bus";
import { Popups } from "./ui/popups";
import { UI } from "./ui";

function start() {
  const cfg = ipcRenderer.sendSync("load-config", "");

  const eventBus = new EventBus();
  const ui = new UI(eventBus);
  const popups = new Popups(document.querySelector("body"));

  eventBus.on("display-popup", popups.trigger.bind(popups));
  popups.register("error-popup", (message, error) => {
    return templates.errorPopup({
      message,
      error,
    });
  });

  const editorContainerEl = document.querySelector("body");
  document.querySelector("body").classList.add("transparent");

  new Improviz(editorContainerEl, cfg, eventBus, CodeMirror);

  popups.register("settings", () => {
    return templates.settingsPopup({});
  });

  popups.register("help", () => {
    return templates.helpPopup();
  });

  clickHandler("#evaluate", () => eventBus.emit("evaluate"));
  clickHandler("#display-help", () => eventBus.emit("display-popup", "help"));
  clickHandler("#display-settings", () =>
    eventBus.emit("display-popup", "settings")
  );

  if (cfg.performanceMode) {
    ui.performanceMode();
  }
}
start();
