import { JSONEditor } from "@json-editor/json-editor/dist/jsoneditor.js";
import { MinMaxEditor } from "./minmax";
const inputs = [
  {
    type: "object",
    format: "minmax",
    func: MinMaxEditor,
  },
];

export const addCustomInputs = () => {
  inputs.map(({ type, format, func }) => {
    JSONEditor.defaults.editors[format] = func;
    JSONEditor.defaults.resolvers.unshift((schema) => {
      if (schema.type === type && schema.format === format) {
        return format;
      }
    });
  });
};

export default addCustomInputs;
