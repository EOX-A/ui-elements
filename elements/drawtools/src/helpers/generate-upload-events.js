/**
 * Initializes upload-related event listeners for drag-and-drop interactions on a map element.
 * It configures the map to react visually to drag-and-drop actions and processes dropped files.
 *
 * @param {import("../main.js").EOxDrawTools} EOxDrawTool - The drawing tool instance.
 * @param {import("@eox/map").EOxMap} EOxMap - The EOx Map instance.
 */
export function initMapDragDropImport(EOxDrawTool, EOxMap) {
  // Helper function to prevent default behavior for drag and drop events
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Changes the opacity of the map element to indicate a drag-and-drop action is in progress
  function highlight(e) {
    e.srcElement.style.opacity = "0.4";
  }

  // Reverts the opacity of the map element back to normal
  function unHighlight(e) {
    e.srcElement.style.opacity = "1";
  }

  // Attaches event listeners for drag-and-drop actions
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    EOxMap.addEventListener(eventName, preventDefaults, false);
    if (["dragenter", "dragover"].includes(eventName))
      EOxMap.addEventListener(eventName, highlight, false);
    else EOxMap.addEventListener(eventName, unHighlight, false);
  });

  // Handle dropped files specifically
  EOxMap.addEventListener("drop", (e) => handleFiles(e, EOxDrawTool), false);
}

/**
 * Prevents the default action of an event from occurring
 * and stops it from propagating further.
 *
 * @param {Event} e - The event object to be handled.
 */
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 * Handles file input from drag-and-drop or file selection events,
 * forwarding each file to a specified processing function.
 *
 * @param {DragEvent} e - The event object from the file input interaction.
 * @param {import("../main.js").EOxDrawTools} EOxDrawTool - The drawing tool instance.
 */
export function handleFiles(e, EOxDrawTool) {
  preventDefaults(e);

  // Extract files from the event, supporting both drag-and-drop and file input sources
  const files = e.dataTransfer
    ? e.dataTransfer.files
    : /**@type {HTMLInputElement}*/ (e.target).files;

  Array.from(files).forEach((file) => importFile(file, EOxDrawTool));
}

/**
 * Reads the content of a provided file as text and
 * then triggers a specified handling function
 *
 * @param {File} file - The file object to be read.
 * @param {import("../main.js").EOxDrawTools} EOxDrawTool - The drawing tool instance.
 */
function importFile(file, EOxDrawTool) {
  const reader = new FileReader();

  // Initiate reading the file's content as text
  reader.readAsText(file);

  // Define the onloadend event handler
  reader.onloadend = function () {
    if (typeof reader.result === "string")
      EOxDrawTool.handleFeatureChange(reader.result);
  };
}
