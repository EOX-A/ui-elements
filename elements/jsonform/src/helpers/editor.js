import { JSONEditor } from "@json-editor/json-editor/src/core.js";
import { SimplemdeEditor } from "@json-editor/json-editor/src/editors/simplemde.js";
import EasyMDE from "easymde/dist/easymde.min.js";
import AceEditor from "ace-builds";
import "ace-builds/esm-resolver.js";
import addCustomInputs from "../custom-inputs";

// using a drop-in replacement for EasyMDE,
// see https://github.com/json-editor/json-editor/issues/1093
window.SimpleMDE = EasyMDE;

// using Ace editor for code
// see https://github.com/json-editor/json-editor/tree/master?tab=readme-ov-file#specialized-string-editors
window.ace = AceEditor;
window.ace.config.set("useWorker", false);

/**
 * Create the editor instance
 *
 * @param {HTMLElement} element - The eox-jsonform instance
 * @returns {JSONEditor} - The initialized JSONEditor instance
 */
export const createEditor = (element) => {
  // Add custom inputs if any
  addCustomInputs(element.value || {}, element.customEditorInterfaces || []);

  // Get the form element from the shadow DOM
  const formEle = element.renderRoot.querySelector("form");

  // Add default button callback for submit
  // see https://github.com/json-editor/json-editor?tab=readme-ov-file#button-editor
  JSONEditor.defaults.callbacks = {
    button: {
      onSubmit: function () {
        element.dispatchEvent(
          new CustomEvent(`submit`, {
            detail: element.value,
            bubbles: true,
            composed: true,
          }),
        );
      },
    },
  };

  // Allow overriding the resolver
  // see open issue at https://github.com/json-editor/json-editor/issues/1647
  JSONEditor.defaults.resolvers.unshift(
    (schema) => schema.options?.resolver && schema.options.resolver,
  );

  // Initialize the JSONEditor with the given schema, value, and options
  const initEditor = () =>
    new JSONEditor(formEle, {
      schema: element.schema,
      ...(element.value ? { startval: element.value } : {}),
      theme: "html",
      iconlib: "fontawesome5", // necessary to get information about expand/collapse state
      ajax: true,
      ...element.options,
    });

  // Create the editor instance
  let editor = initEditor();

  // Event listener for the 'ready' event
  editor.on("ready", () => {
    //
    element.renderRoot.querySelector("form").dataset.themeCustom = "eox";

    /// Check if any editor requires SimpleMDE and load necessary stylesheets
    if (
      Object.values(editor.editors).some((e) => e instanceof SimplemdeEditor)
    ) {
      // Add SimpleMDE styles
      const style = document.createElement("style");
      style.innerHTML = `
          @import url("https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css");
          @import url("https://unpkg.com/easymde/dist/easymde.min.css");
        `;
      element.renderRoot.insertBefore(style, element.renderRoot.firstChild);
    }

    // Check if any editor requires AceEditor
    const aceUsed = Object.values(editor.editors).find((e) => e?.ace_container);
    if (aceUsed && !element.noShadow) {
      // https://github.com/ajaxorg/ace/wiki/Configuring-Ace
      aceUsed.ace_editor_instance.setOptions({
        showPrintMargin: false,
        useSoftTabs: true,
        wrap: true,
      });
      // Attach to shadow root
      aceUsed.ace_editor_instance.renderer.attachToShadowRoot();
      aceUsed.ace_editor_instance.resize();
    }
  });
  return editor;
};

/**
 * Fetch properties from a URL and return them
 *
 * @typedef {JSON & {properties: object}} JsonSchema
 * @param {JsonSchema | String} property - The property to fetch or parse
 * @returns {Promise<JsonSchema | String>} - The parsed property or fetched schema
 */
export async function parseProperty(property) {
  if (property) {
    if (typeof property !== "object") {
      // Property is a URL so we need to fetch it
      try {
        const response = await fetch(property);
        if (response.ok) return await response.json();
        else
          console.error("Failed to fetch schema from URL: ", response.status);
      } catch (error) {
        console.error("Error fetching schema: ", error);
      }
    }
  }
  return property;
}
