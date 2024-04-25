import { importMdFile, exportMdFile } from "../helpers/editor.js";

const addCustomTool = (name, output, className, title, action) => ({
  name,
  action:
    action ||
    function customFunction({ codemirror }) {
      const startPoint = codemirror.getCursor("start");
      const endPoint = codemirror.getCursor("end");
      codemirror.replaceRange(output, startPoint, endPoint);
    },
  className,
  title,
});

export const EDITOR_SCHEMA = {
  properties: {
    Story: {
      type: "string",
      format: "markdown",
      options: {
        simplemde: {
          toolbar: [
            "bold",
            "italic",
            "strikethrough",
            "heading",
            "|",
            "unordered-list",
            "ordered-list",
            "link",
            "|",
            addCustomTool(
              "import",
              null,
              "fa fa-upload",
              "Import Markdown File",
              importMdFile
            ),
            addCustomTool(
              "export",
              null,
              "fa fa-download",
              "Export Markdown File",
              exportMdFile
            ),
            "|",
            addCustomTool(
              "add-custom-section",
              null,
              "fa fa-plus",
              "Add custom section",
              () => {
                const element = document.querySelector("eox-storytelling");
                if (element) {
                  element.addCustomSectionIndex = 0;
                  element.requestUpdate();
                }
              }
            ),
          ],
          spellChecker: false,
          autofocus: true,
        },
      },
    },
  },
};
