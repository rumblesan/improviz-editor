export class Improviz {
  constructor(editorContainerElement, config, CodeMirror) {
    this.config = config;
    this.editor = CodeMirror(
      (el) => {
        editorContainerElement.appendChild(el);
      },
      {
        keyMap: config.keyMap,
        lineNumbers: config.lineNumbers,
        theme: config.theme,
        value: config.program,
        mode: "improviz",
        autofocus: true,
        gutters: ["CodeMirror-lint-markers"],
        lint: {
          getAnnotations: (program) => {
            return [];
          },
        },
        extraKeys: {
          "Ctrl-Enter": () => this.evaluate(),
        },
      }
    );
  }

  getProgram() {
    return this.editor.getValue();
  }

  evaluate() {
    const impConf = this.config.improviz;
    fetch(`http://${impConf.host}:${impConf.port}/read`, {
      method: "POST",
      body: this.getProgram(),
    })
      .then((response) => response.json())
      .then((out) => console.log(out));
  }
}
