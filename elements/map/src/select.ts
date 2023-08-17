import { EOxMap } from "../main";
import { Overlay } from "ol";
import "./tooltip";
import { EOxMapTooltip } from "./tooltip";
import { createLayer } from "./generate";
import Feature from "ol/Feature";
import RenderFeature from "ol/render/Feature";
import VectorTileLayer from "ol/layer/VectorTile.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import MapBrowserEvent from "ol/MapBrowserEvent";

export async function addSelect(
  EOxMap: EOxMap,
  layerId: string,
  options: any
): Promise<void> {
  if (EOxMap.interactions[options.id]) {
    throw Error(`Interaction with id: ${options.id} already exists.`);
  }

  const tooltip: EOxMapTooltip = EOxMap.querySelector(options.tooltip);

  let overlay: Overlay;
  let selectedFid: string | number = null;

  const map = EOxMap.map;

  if (tooltip) {
    overlay = new Overlay({
      element: tooltip,
      position: undefined,
      offset: [0, -30],
      positioning: "top-center",
      className: "eox-map-tooltip",
    });
    map.addOverlay(overlay);
  }

  /**
   * returns the ID of a feature.
   * @param feature
   * @returns {number | string} ID value of feature
   */
  function getId(feature: Feature | RenderFeature) {
    if (options.idProperty) {
      return feature.get(options.idProperty);
    }
    return feature.getId();
  }

  const selectLayer = EOxMap.getLayerById(layerId);
  await selectLayer.get("sourcePromise");

  options.layer.renderMode = "vector";

  // a layer that only contains the selected features, for displaying purposes only
  // unmanaged by the map
  const selectStyleLayer = createLayer(options.layer) as
    | VectorTileLayer
    | VectorLayer<VectorSource>;
  await selectStyleLayer.get("sourcePromise");
  selectStyleLayer.setSource(selectLayer.getSource());
  selectStyleLayer.setMap(map);

  const initialStyle = selectStyleLayer.getStyleFunction();

  selectStyleLayer.setStyle((feature, resolution) => {
    if (selectedFid && getId(feature) === selectedFid) {
      return initialStyle(feature, resolution);
    }
    return null;
  });

  const listener = (event: MapBrowserEvent<any>) => {
    if (event.dragging) {
      return;
    }
    selectLayer
      .getFeatures(event.pixel)
      .then(function (features: Array<Feature | RenderFeature>) {
        const feature = features.length ? features[0] : null;
        selectedFid = feature ? getId(feature) : null;
        selectStyleLayer.changed();

        if (overlay) {
          overlay.setPosition(feature ? event.coordinate : null);
          tooltip.renderContent(feature.getProperties());
        }

        const selectdEvt = new CustomEvent("select", {
          detail: {
            originalEvent: event,
            feature: feature,
          },
        });
        EOxMap.dispatchEvent(selectdEvt);
      });
  };
  map.on(options.condition || "click", listener);

  // if the parent layer changes, also change the selection layer.
  selectLayer.on("change:opacity", (value: number) => {
    selectStyleLayer.setOpacity(value);
  });
  selectLayer.on("change:visible", (visible: boolean) => {
    selectStyleLayer.setVisible(visible);
  });
  //@ts-ignore
  selectLayer.on("change:source", (value) => {
    selectStyleLayer.setSource(value);
  });
  map.getLayers().on("remove", () => {
    if (!EOxMap.getLayerById(layerId)) {
      selectStyleLayer.setMap(null);
      if (overlay) {
        map.removeOverlay(overlay);
      }
    }
  });
}
