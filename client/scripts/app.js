const socket = io("http://localhost:3000");

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
    lineNumbers: false,
    Highlight: false,
  });

  console.log(editor);

  let decorations = [];
  let cursorDecorations = {};

  socket.on("updateUserCount", function (count) {
    console.log("Number of connected users:", count);
    document.getElementById("userCount").innerText = count;
  });

  editor.onDidChangeModelContent(() => {
    const currentText = editor.getValue();
    socket.emit("textChange", currentText);
  });

  socket.on("textUpdate", function (data) {
    const model = editor.getModel();
    const currentText = model.getValue();

    if (currentText !== data) {
      // Get the current selection in the editor
      const selection = editor.getSelection();

      // Apply the new text dat
      const range = model.getFullModelRange();
      editor.executeEdits("", [
        {
          range: range,
          text: data,
        },
      ]);

      // Restore the previous selection
      editor.setSelection(selection);
    }
  });

  editor.onDidChangeCursorPosition((e) => {
    socket.emit("cursorMove", {
      position: e.position,
      userId: socket.id,
    });
  });

  socket.on("cursorUpdate", function (data) {
    const { position, userId } = data;
    if (userId !== socket.id) {
      // Check if cursor update is not from the same user
      const cursorDecoration = cursorDecorations[userId] || [];
      const newCursorDecorations = [
        {
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column
          ),
          options: {
            className: "remote-cursor",
            hoverMessage: { value: `Cursor of ${userId}` },
          },
        },
      ];
      cursorDecorations[userId] = editor.deltaDecorations(
        cursorDecoration,
        newCursorDecorations
      );
    }
  });

  editor.onDidChangeCursorSelection((event) => {
    if (event.selection && !event.selection.isEmpty()) {
      socket.emit("highlightText", {
        range: event.selection,
        text: editor.getModel().getValueInRange(event.selection),
        userId: socket.id,
      });
    }
  });

  socket.on("receiveHighlight", (data) => {
    decorations = editor.deltaDecorations(decorations, [
      {
        range: new monaco.Range(
          data.range.startLineNumber,
          data.range.startColumn,
          data.range.endLineNumber,
          data.range.endColumn
        ),
        options: {
          className: "highlighted-text",
          hoverMessage: { value: `Highlighted by: ${data.userId}` },
        },
      },
    ]);
  });

  socket.on("userDisconnected", function (userId) {
    if (cursorDecorations[userId]) {
      editor.deltaDecorations(cursorDecorations[userId], []);
      delete cursorDecorations[userId];
    }
  });
});
