import { onDrawEndMethod, initSelection } from "./";

import { getElement } from "@eox/elements-utils";

/**
 * Initializes the draw layer, interacts with the map, and returns map instances.
 *
 * @param {import("../../main").EOxDrawTools} EoxDrawTool - The drawing tool instance.
 * @param {Boolean} multipleFeatures - Allow adding more than one feature at a time
 * @returns {{EoxMap: import("@eox/map").EOxMap, OlMap: import("ol").Map}} - The map instances.
 */
const initLayerMethod = (EoxDrawTool, multipleFeatures) => {
  const mapQuery = getElement(EoxDrawTool.for);

  const EoxMap = /** @type {import("@eox/map").EOxMap} */ (mapQuery);

  const OlMap = EoxMap.map;

  EoxDrawTool.drawLayer = EoxMap.addOrUpdateLayer({
    zIndex: 100,
    type: "Vector",
    properties: {
      id: "drawLayer",
      // @ts-expect-error TODO
      layerControlHide: true,
      isDrawingEnabled: false,
      multipleFeatures: multipleFeatures,
    },
    source: {
      type: "Vector",
    },
    interactions: [
      {
        type: "draw",
        options: {
          active: false,
          id: "drawInteraction",
          type: EoxDrawTool.type,
          modify: EoxDrawTool.allowModify,
          stopClick: true,
        },
      },
      {
        type: "select",
        //@ts-expect-error TODO
        options: {
          id: "selectHover",
          condition: "pointermove",
          style: {
            "fill-color": "rgba(51, 153, 204,0.5)",
            "stroke-color": "#3399CC",
            "stroke-width": 2.5,
          },
          tooltip: false,
        },
      },
      {
        type: "select",
        //@ts-expect-error TODO
        options: {
          id: "selectClick",
          condition: "click",
          panIn: true,
          style: {
            "fill-color": "rgba(51, 153, 204,0.5)",
            "stroke-color": "#3399CC",
            "stroke-width": 2.5,
          },
        },
      },
    ],
  });

  EoxDrawTool.draw = /** @type {import("ol/interaction").Draw} */ (
    /** @type {unknown} */ (EoxMap.interactions["drawInteraction"])
  );

  EoxDrawTool.modify = /** @type {import("ol/interaction").Modify} */ (
    /** @type {unknown} */ (EoxMap.interactions["drawInteractionmodify"])
  );

  // Initialize selection interactions
  initSelection(EoxDrawTool, EoxMap, EoxDrawTool.layerId);

  EoxDrawTool.modify?.on("modifyend", () => EoxDrawTool.onModifyEnd());

  EoxMap.addEventListener("addfeatures", () => onDrawEndMethod(EoxDrawTool));

  return { EoxMap, OlMap };
};

export default initLayerMethod;
