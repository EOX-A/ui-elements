import { html } from "lit";
import "../map/main";
import "./src/main";

export default {
  title: "Elements/eox-drawtools",
  tags: ["autodocs"],
  component: "eox-drawtools",
};

export const Primary = {
  render: () => html` <eox-map
      id="primary"
      style="width: 400px; height: 300px;"
      layers='[
    {"type":"Tile","source":{"type":"OSM"}}
  ]'
    ></eox-map>
    <eox-drawtools for="eox-map#primary"></eox-drawtools>`,
};

/**
 * By setting the `multiple-features` attribute or `multipleFeatures` property to `true`,
 * multiple polygons can be drawn.
 */
export const MultiPolygon = {
  render: () => html` <eox-map
      id="multi"
      style="width: 400px; height: 300px;"
      layers='[
      {"type":"Tile","source":{"type":"OSM"}}
    ]'
    ></eox-map>
    <eox-drawtools for="eox-map#multi" multiple-features></eox-drawtools>`,
};

/**
 * By setting the `show-list` attribute or `showList` property to `true`,
 * List of features will be visible
 */
export const MultiPolygonWithList = {
  render: () => html`
    <div style="display: flex">
      <eox-map
        id="list"
        style="width: 500px; height: 300px;"
        layers=${JSON.stringify([
          {
            type: "Tile",
            source: {
              type: "OSM",
            },
          },
        ])}
      ></eox-map>
      <eox-drawtools
        for="eox-map#list"
        multiple-features
        show-list
      ></eox-drawtools>
    </div>
  `,
};
