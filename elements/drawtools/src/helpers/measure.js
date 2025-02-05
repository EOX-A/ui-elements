import { getLength } from "ol/sphere";
import Overlay from "ol/Overlay";

/**
 * Render the tooltip overlay on the map near the last point of the drawn line.
 *
 * @param {Object} evt The triggering draw event.
 * @param {import("../main").EOxDrawTools} EoxDrawTool
 */
function measure(evt, EoxDrawTool) {
  let { measureTooltip, measureTooltipElement } = createTooltip();
  let tooltipCoord = evt.coordinate;

  let geometry = evt.feature.getGeometry();

  EoxDrawTool.eoxMap.map.addOverlay(measureTooltip);

  if (geometry.getType() === "LineString") {
    measureTooltipElement.style.visibility = "visible";
    measureTooltipElement.style.pointerEvents = "inherit";

    evt.feature.getGeometry().on("change", function (_evt) {
      tooltipCoord = geometry.getLastCoordinate();
      measureTooltipElement.innerHTML = formatLength(geometry);
      measureTooltip.setPosition(tooltipCoord);
    });
  }
}

/**
 * Create an OpenLayers overlay with the measuring tooltip.
 *
 * @return {Object} An object with the overlay and its element.
 */
function createTooltip() {
  let measureTooltipElement = document.createElement("div");

  const measureTooltip = new Overlay({
    element: measureTooltipElement,
    offset: [16, 0],
    positioning: "center-left",
    stopEvent: false,
    insertFirst: false,
  });

  measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
  measureTooltipElement.style.padding = "3px 7px";
  measureTooltipElement.style.borderRadius = "4px";
  measureTooltipElement.style.backdropFilter = "blur(20px)";
  measureTooltipElement.style.background = "#004180AA";
  measureTooltipElement.style.fontFamily = "monospace, sans-serif";
  measureTooltipElement.style.color = "#FFF";
  measureTooltipElement.style.visibility = "visible";
  measureTooltipElement.style.display = "block";
  measureTooltipElement.style.pointerEvents = "none";

  return { measureTooltip, measureTooltipElement };
}

/**
 * Calculate real distance on the map and format the output.
 *
 * @param {Polygon} line The line string to calculate the distance for.
 * @return {string} Formatted length.
 */
const formatLength = function (line) {
  const length = getLength(line);
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + " " + "km";
  } else {
    output = Math.round(length * 100) / 100 + " " + "m";
  }
  return output;
};

export default measure;
