import { html } from "lit";
import {
  /*STORIES_MAIN_MAP_LAYERS,*/
  STORIES_MAP_STYLE,
  STORIES_LAYER_SENTINEL_HUB,
  STORIES_LAYER_REGION,
  STORIES_LAYER_S2,
  STORIES_LAYER_OSM,
} from "../src/enums";

const STORIES_MAIN_MAP_LAYERS = [
  {
    type: "Group",
    properties: {
      id: "group3",
      title: "Data Layers",
      layerControlExpand: true,
      layerControlExclusive: true,
      description: "# Hello world",
    },
    layers: [
      { ...STORIES_LAYER_SENTINEL_HUB.wind, layerControlGloballyExclusive: true },
    ],
  },
  {
    type: "Group",
    properties: {
      id: "group2",
      title: "Data Layers",
      layerControlExpand: true,
      layerControlExclusive: true,
      description: "# Hello world",
    },
    layers: [
      //{ ...STORIES_LAYER_SENTINEL_HUB.wind, layerControlGloballyExclusive: true },
      { ...STORIES_LAYER_SENTINEL_HUB.no2, layerControlGloballyExclusive: true },
      STORIES_LAYER_REGION,
    ],
  },
  {
    type: "Group",
    properties: {
      id: "group1",
      title: "Background Layers",
      //layerControlExclusive: true,
    },
    layers: [
      { ...STORIES_LAYER_S2, layerControlGloballyExclusive: true },
      STORIES_LAYER_OSM,
    ],
  },
];



// layerControlExclusive

export const Primary = {
  args: {
    idProperty: "id",
    titleProperty: "title",
    unstyled: false,
  },
  render: (args) => html`
    <div style="display: flex">
      <eox-layercontrol
        .idProperty=${args.idProperty}
        .titleProperty=${args.titleProperty}
        .unstyled=${args.unstyled}
        .isGloballyExclusive=${true}
        for="eox-map"
      ></eox-layercontrol>
      <eox-map
        .style=${STORIES_MAP_STYLE}
        .zoom=${3}
        .layers=${STORIES_MAIN_MAP_LAYERS}
      ></eox-map>
    </div>
  `,
};

export default Primary;
