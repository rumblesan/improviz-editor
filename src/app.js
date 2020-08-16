import "./app.html";

import "./stylesheets/main.scss";

import "./helpers/external_links.js";

import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint.css";
import CodeMirror from "codemirror";
import "codemirror/keymap/vim";
import "codemirror/addon/lint/lint";

import { Improviz } from "./improviz";

import { ipcRenderer } from "electron";

var cfg = ipcRenderer.sendSync("load-config", "");

const editorContainerEl = document.querySelector("body");

new Improviz(editorContainerEl, cfg, CodeMirror);
