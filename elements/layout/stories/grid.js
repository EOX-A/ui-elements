import { html } from "lit";
import "../src/main";
import { STORIES_LAYOUT_STYLE } from "../src/enums";

const renderItems = () => {
  let items = [];
  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 12; y++) {
      items.push([x, y]);
    }
  }
  return items;
};

export const Grid = {
  args: {},
  render: () => html`
    <!-- Render eox-layout component -->
    <eox-layout style="${STORIES_LAYOUT_STYLE}">
      ${renderItems().map(
        ([x, y]) =>
          html`<eox-layout-item x="${x}" y="${y}" w="1" h="1"
            >${x}/${y}</eox-layout-item
          >`
      )}
    </eox-layout>
  `,
};

export default Grid;
