export class Improviz {
  constructor(editorContainerElement, config, CodeMirror) {
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
    console.log(this.getProgram());
  }
}
