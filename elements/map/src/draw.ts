import Modify from "ol/interaction/Modify";
import Draw, { createBox } from "ol/interaction/Draw";
import { EOxMap } from "../main";
import { getArea, getLength } from "ol/sphere";
import { LineString, Polygon } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { getUid } from "ol";

export type DrawOptions = Omit<
  import("ol/interaction/Draw").Options,
  "type"
> & {
  id: string | number;
  type: "Point" | "LineString" | "Polygon" | "Circle" | "Box";
  modify?: boolean;
  // TODO
  active?: boolean;
};

/**
 * Adds a `draw`-interaction to the map.
 * Additionally, if {options.modify} is set, it also adds a `modify` interaction. The name `modify`-interaction
 * follows the naming convention `${DrawOptions.id}_modify`
 * @param {EOxMap} EOxMap
 * @param {VectorLayer<VectorSource>} drawLayer
 * @param {DrawOptions} options
 */
export function addDraw(
  EOxMap: EOxMap,
  drawLayer: VectorLayer<VectorSource>,
  options: DrawOptions
): void {
  const options_ = Object.assign({}, options);
  if (EOxMap.interactions[options_.id]) {
    throw Error(`Interaction with id: ${options_.id} already exists.`);
  }
  options_.modify =
    typeof options_.modify === "boolean" ? options_.modify : true;

  const source = drawLayer.getSource();

  if (options_.type === "Box") {
    options_.geometryFunction = createBox();
    options_.type = "Circle";
  }

  const drawInteraction = new Draw({
    ...options_,
    source,
  } as import("ol/interaction/Draw").Options);

  // TODO cleaner way of initializing as inactive?
  if (options_.active === false) {
    drawInteraction.setActive(false);
  }

  const format = new GeoJSON();
  drawInteraction.on("drawend", (e) => {
    const geom = e.feature.getGeometry();
    if (geom instanceof LineString) {
      const length = getLength(geom, {
        radius: 6378137,
        projection: "EPSG:3857",
      });
      e.feature.set("measure", length);
    } else if (geom instanceof Polygon) {
      const area = getArea(geom, { radius: 6378137, projection: "EPSG:3857" });
      e.feature.set("measure", area);
    }
    const uid = getUid(e.feature);
    e.feature.set("id", uid);
    e.feature.setId(uid);

    const geoJsonObject = format.writeFeatureObject(e.feature);
    const drawendEvt = new CustomEvent("drawend", {
      detail: {
        originalEvent: e,
        geojson: geoJsonObject,
      },
    });
    EOxMap.dispatchEvent(drawendEvt);
  });

  // identifier to retrieve the interaction
  EOxMap.map.addInteraction(drawInteraction);
  EOxMap.interactions[options_.id] = drawInteraction;

  const modifyInteraction = new Modify({
    source,
  });
  modifyInteraction.setActive(options_.modify);
  EOxMap.map.addInteraction(modifyInteraction);
  EOxMap.interactions[`${options_.id}_modify`] = modifyInteraction;
}
