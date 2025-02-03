import { initSelection } from ".";

/**
 * handles switching between selection and drawing and updates of the selection layer
 *
 * @param {import("../../main").EOxDrawTools} EoxDrawTool
 * @param {import("@eox/map").EOxMap} EoxMap
 * @param {string} oldLayerId
 * @param {string} updatedLayerId
 * @returns
 */
const handleLayerId = (EoxDrawTool, EoxMap, updatedLayerId, oldLayerId) => {
  if (!EoxMap) {
    return;
  }

  if (updatedLayerId) {
    if (oldLayerId && updatedLayerId !== oldLayerId) {
      exitSelection(EoxDrawTool, EoxMap);
      initSelection(EoxDrawTool, EoxMap, updatedLayerId);
    } else {
      initSelection(EoxDrawTool, EoxMap, updatedLayerId);
    }
    return;
  }

  if (!updatedLayerId && oldLayerId) {
    exitSelection(EoxDrawTool, EoxMap);
    return;
  }
};

export default handleLayerId;

/**
 * Exits the selection mode and reverts the selection layer to its original state
 *
 * @param {import("../../main").EOxDrawTools} EoxDrawTool
 * @param {import("@eox/map").EOxMap} EoxMap
 */
function exitSelection(EoxDrawTool, EoxMap) {
  if (!EoxMap) {
    return;
  }
  EoxDrawTool.discardDrawing();
  EoxDrawTool.selectionEvents.removeSelectionEvent();
  EoxDrawTool.draw = /** @type {import("ol/interaction").Draw} */ (
    EoxMap.interactions["drawInteraction"]
  );
  EoxMap.selectInteractions["SelectLayerClickInteraction"].remove();
  EoxMap.selectInteractions["SelectLayerHoverInteraction"].remove();
}
