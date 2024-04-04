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
            "|",
            "link",
            "image",
            "table",
            "|",
            addCustomTool(
              "map",
              `\n\n## Map Title <!--{as="eox-map" style="width: 100%; height: 500px;" layers='[{"type":"Tile","properties":{"id":"osm"},"source":{"type":"OSM"}}]' center=[15,48] zoom="1"}-->`,
              "fa fa-globe",
              "Insert Map"
            ),
            addCustomTool(
              "map-tour",
              `\n\n## EOX Map ss <!--{ as="eox-map" mode="tour" }--> \n\n### <!--{ layers='[{"type":"Tile","properties":{"id":"osm"},"source":{"type":"OSM"}}]' center=[15,48] zoom="5" }--> \n\n#### Tour step one \n Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
              "fa fa-map",
              "Insert Map Tour"
            ),
            "|",
            addCustomTool(
              "hero-image",
              `\n\n# Hero Image <!--{ as="img" mode="hero" src="image-url" }-->\n`,
              "fa fa-file-image-o",
              "Insert Image based Hero Section"
            ),
            addCustomTool(
              "hero-video",
              `\n\n# Hero Video <!--{ as="video" mode="hero" src="video-url" }-->\n`,
              "fa fa-file-video-o",
              "Insert Video based Hero Section"
            ),
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
          ],
          spellChecker: false,
          autofocus: true,
        },
      },
    },
  },
};
