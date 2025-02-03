/**
 * Initializes the selection interactions for the given layer ID to the DrawTool.
 *
 * @param {import('../../main').EOxDrawTools} EoxDrawTool - The drawing tool instance.
 * @param {import("@eox/map").EOxMap} EoxMap - The map instance.
 */
const initSelection = (EoxDrawTool, EoxMap, updatedLayerId) => {
  if (!updatedLayerId || !EoxMap) {
    return;
  }

  const selectionLayer =
    JSON.parse(
      JSON.stringify(
        /** @type {import("@eox/map").EoxLayer} */ (
          EoxMap.getLayerById(updatedLayerId).get("_jsonDefinition")
        ),
      ),
    ) || null;
  if (!selectionLayer) {
    console.error(`Layer with id ${updatedLayerId} not found`);
    return;
  }

  /** @type {import("@eox/map/types").EOxInteraction} */
  const hoverInteraction = {
    type: "select",
    active: false,
    //@ts-expect-error TODO
    options: {
      id: "SelectLayerHoverInteraction",
      condition: "pointermove",
      active: false,
      style: {
        "fill-color": "rgba(0, 0, 0,0.0)",
        "stroke-color": "#3399CC",
        "stroke-width": 2.5,
      },
    },
  };

  /** @type {import("../../../../map/types").EOxInteraction} */
  const clickInteraction = {
    type: "select",
    //@ts-expect-error TODO
    options: {
      id: "SelectLayerClickInteraction",
      condition: "click",
      multi: EoxDrawTool.multipleFeatures,
      modify: EoxDrawTool.allowModify,
      active: false,
      style: {
        "fill-color": "rgba(0, 0, 0,0.0)",
        "stroke-color": "rgba(0, 0, 0,0.0)",
      },
    },
  };

  selectionLayer.interactions = [hoverInteraction, clickInteraction];

  EoxMap.addOrUpdateLayer(selectionLayer);

  const oldDrawInteraction = EoxDrawTool.draw;
  EoxDrawTool.draw = EoxMap.selectInteractions["SelectLayerClickInteraction"];

  oldDrawInteraction.setActive(false);
  EoxMap.selectInteractions["SelectLayerClickInteraction"].setActive(false);
  EoxMap.selectInteractions["SelectLayerHoverInteraction"].setActive(false);
};

export default initSelection;
