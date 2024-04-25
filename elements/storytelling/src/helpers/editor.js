/**
 * Function to disable text selection
 */
function disableTextSelection() {
  document.body.style.userSelect = "none";
}

/**
 * Function to enable text selection
 */
function enableTextSelection() {
  document.body.style.userSelect = "";
}

/**
 * Function to handle mouse down on the editor container
 *
 * @param {{target: Object, clientX: Number, clientY: Number}} e - Event for handle mouse move.
 * @param {Object} editorContainer - editor container dom
 * @param {Element} StoryTellingEditor - Dom element
 */
function handleEditorContainerMouseDown(
  e,
  editorContainer,
  StoryTellingEditor
) {
  if (e.target === editorContainer) {
    disableTextSelection();
    StoryTellingEditor.dragging = true;
    StoryTellingEditor.lastX = e.clientX;
    StoryTellingEditor.lastY = e.clientY;
  }
}

/**
 * Function to handle mouse move for dragging and resizing
 *
 * @param {{clientX: Number, clientY: Number}} e - Event for handle mouse move.
 * @param {Object} editorContainer - editor container dom
 * @param {Element} StoryTellingEditor - Dom element
 */
function handleMouseMove(e, editorContainer, StoryTellingEditor) {
  if (StoryTellingEditor.dragging) {
    let dx = e.clientX - StoryTellingEditor.lastX;
    let dy = e.clientY - StoryTellingEditor.lastY;
    let { top, left } = editorContainer.getBoundingClientRect();

    editorContainer.style.top = `${top + dy}px`;
    editorContainer.style.left = `${left + dx}px`;

    StoryTellingEditor.lastX = e.clientX;
    StoryTellingEditor.lastY = e.clientY;
  }

  if (StoryTellingEditor.dragging || StoryTellingEditor.resizing) {
    let dx = StoryTellingEditor.lastX - e.clientX;
    let dy = e.clientY - StoryTellingEditor.lastY;
    let { width, height, left } = editorContainer.getBoundingClientRect();

    if (StoryTellingEditor.resizing) {
      editorContainer.style.width = `${width + dx}px`;
      editorContainer.style.height = `${height + dy}px`;
    }
    editorContainer.style.left = `${left - dx}px`;

    StoryTellingEditor.lastX = e.clientX;
    StoryTellingEditor.lastY = e.clientY;
  }
}

/**
 * Function to handle mouse up and enable text selection
 *
 * @param {Element} StoryTellingEditor - Dom element
 */
function handleMouseUp(StoryTellingEditor) {
  enableTextSelection();
  StoryTellingEditor.dragging = false;
  StoryTellingEditor.resizing = false;
}

/**
 * Function to handle resize handle mouse down
 *
 * @param {{clientX: Number, clientY: Number}} e - Event for handle mouse move.
 * @param {Element} StoryTellingEditor - Dom element
 */
function handleResizeHandleMouseDown(e, StoryTellingEditor) {
  e.stopPropagation();
  disableTextSelection();
  StoryTellingEditor.resizing = true;
  StoryTellingEditor.lastX = e.clientX;
  StoryTellingEditor.lastY = e.clientY;
}

/**
 * Function to initialise monaco editor
 *
 * @param {Object} editorContainer - editor container dom
 * @param {Object} resizeHandle - Dom element
 * @param {Element} StoryTellingEditor - Dom element
 */
export default async function initEditorEvents(
  editorContainer,
  resizeHandle,
  StoryTellingEditor
) {
  editorContainer.addEventListener("mousedown", (e) =>
    handleEditorContainerMouseDown(e, editorContainer, StoryTellingEditor)
  );

  window.addEventListener("mousemove", (e) =>
    handleMouseMove(e, editorContainer, StoryTellingEditor)
  );

  window.addEventListener("mouseup", () => handleMouseUp(StoryTellingEditor));

  resizeHandle.addEventListener("mousedown", (e) =>
    handleResizeHandleMouseDown(e, StoryTellingEditor)
  );
}

/**
 * Function import md file into editor
 *
 * @param {Object} editor - The SimpleMDE instance
 */
export function importMdFile(editor) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".md";
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      editor.value(content);
    };
    reader.readAsText(file);
  };
  fileInput.click();
}

/**
 * Function upload md file from editor
 *
 * @param {Object} editor - The SimpleMDE instance
 */
export function exportMdFile(editor) {
  const content = editor.value();
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `${document.title}.md`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function addCustomSection(
  markdown,
  customSectionIndex,
  newMarkdown,
  EOxStoryTelling
) {
  const sectionIndexes = [];
  const markdownArr = markdown.split("\n");

  const parent = EOxStoryTelling.shadowRoot || EOxStoryTelling;
  const editorDOM = parent.querySelector("eox-storytelling-editor");

  markdownArr.forEach((line, index) => {
    if (
      line.startsWith("## ") ||
      (line.startsWith("# ") && sectionIndexes.length)
    ) {
      sectionIndexes.push(index);
    }
  });

  const insertPos = sectionIndexes[customSectionIndex];

  if (insertPos) markdownArr.splice(insertPos, 0, newMarkdown);
  else markdownArr.push(newMarkdown);

  editorDOM.editor.editor.editors["root.Story"].setValue(
    markdownArr.join("\n")
  );

  EOxStoryTelling.addCustomSectionIndex = -1;
  EOxStoryTelling.requestUpdate();
}
