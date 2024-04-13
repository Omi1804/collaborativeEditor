// const socket = io();

// const textArea = document.getElementsByClassName("textarea");

// console.log(textArea);

require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs",
  },
});

require(["vs/editor/editor.main"], function () {
  let editor = monaco.editor.create(document.getElementById("textarea"), {
    value: "",
    language: "plaintext",
    theme: "vs-light",
    fontSize: 14,
    fontFamily: "Poppins",
  });

  if (editor && editor.getModel()) {
    // editor.getModel().onDidChangeContent(() => {
    //   console.log(editor.getValue());
    // });

    editor.onDidChangeModelContent(() => {
      console.log(editor.getValue());
    });
  } else {
    console.error("Failed to create editor or access the model.");
  }
});
