import "./stylesheets/main.scss";
import './stylesheets/codemirror.css';
import './stylesheets/codemirror-lint.css';


// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

import env from "env";


const defaultConfig = {
  keyMap: 'default',
  lineNumbers: false,
  theme: 'improviz',
  performanceMode: false,
  program: 't = time/100\nrotate(t)\nfill(1, 0, 0.8, 0.5)\ncube(1)',
};

import CodeMirror from 'codemirror';
import 'codemirror/keymap/vim';
import 'codemirror/addon/lint/lint.js';

import {Improviz} from './improviz.js';

const editorContainerEl = document.querySelector('body');

const improviz = new Improviz(editorContainerEl, defaultConfig, CodeMirror);