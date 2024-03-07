import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Map from "ol/Map.js";
import View, { ViewObjectEventTypes } from "ol/View.js";
// @ts-ignore
import olCss from "ol/ol.css?inline";
import { EOxSelectInteraction } from "./src/select";
import { EoxLayer, createLayer, updateLayer } from "./src/generate";
import { Draw, Modify } from "ol/interaction";
import Control from "ol/control/Control";
import { getLayerById, getFlatLayersArray } from "./src/layer";
import { getCenterFromProperty } from "./src/center";
import {
  addOrUpdateControl,
  controlDictionary,
  controlType,
} from "./src/controls";
import { buffer } from "ol/extent";
import "./src/compare";
import {
  addScrollInteractions,
  coordinatesRoughlyEquals,
  removeDefaultScrollInteractions,
} from "./src/utils";
import GeoJSON from "ol/format/GeoJSON";
import { parseText, READ_FEATURES_OPTIONS } from "./helpers";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { ProjectionLike, transform } from "ol/proj";

type ConfigObject = {
  controls: controlDictionary;
  layers: Array<EoxLayer>;
  view: {
    center: Array<number>;
    zoom: number;
    projection?: ProjectionLike;
  };
  preventScroll: boolean;
};

/**
 * The `eox-map` is a wrapper for the library [OpenLayers](https://openlayers.org/) with additional features and helper functions.
 *
 * Basic usage:
 *
 * ```
 * import "@eox/map"
 *
 * <eox-map [...]></eox-map>
 * ```
 *
 * Some basic layers, sources and formats are included in the default bundle, for advanced usage it is
 * required to import the `advanced-layers-and-sources` plugin.
 *
 * Included in the base bundle:
 * - Formats: `GeoJSON`, `MVT`
 * - Layers: `Group`, `Image`, `Tile`, `Vector`, `VectorTile`
 * - Sources: `ImageWMS`, `OSM`, `Tile`, `TileWMS`, `Vector`, `VectorTile`, `WMTS`, `XYZ`
 *
 * In order to use the rest of the layers and sources provided by OpenLayers, import the plugin as well:
 *
 * ```
 * import "@eox/map/dist/eox-map-advanced-layers-and-sources.js"
 * import "@eox/map/dist/eox-map.js"
 *
 * <eox-map [...]></eox-map>
 * ```
 * Included in the advanced plugin bundle:
 * - Layers: All OpenLayers layer types, plus [STAC](https://github.com/m-mohr/ol-stac)
 * - Sources: All OpenLayers source types
 * - Reprojection through [proj4](https://github.com/proj4js/proj4js)
 */
@customElement("eox-map")
export class EOxMap extends LitElement {
  /**
   * Map center, can be lon/lat or web mercator
   */
  @property({ attribute: false, type: Array })
  center: Array<number> = [0, 0];

  private _controls: controlDictionary;

  set controls(controls: controlDictionary) {
    const oldControls = this._controls;
    const newControls = controls;

    // remove controls that are not defined anymore
    if (oldControls) {
      const oldControlTypes = Object.keys(oldControls);
      const newControlTypes = Object.keys(newControls);
      for (let i = 0, ii = oldControlTypes.length; i < ii; i++) {
        const oldControlType = oldControlTypes[i];
        if (!newControlTypes.includes(oldControlType)) {
          this.removeControl(oldControlType);
        }
      }
    }
    if (newControls) {
      const keys = Object.keys(controls);
      for (let i = 0, ii = keys.length; i < ii; i++) {
        const key = keys[i] as controlType;
        addOrUpdateControl(this, oldControls, key, controls[key]);
      }
    }
    this._controls = newControls;
  }

  /**
   * Map controls, in JSON format
   */
  get controls() {
    return this._controls;
  }

  private _layers: Array<EoxLayer>;

  /**
   * The map layers, in eox-map JSON format!
   * @type {Array<EoxLayer>}
   */
  @property({ attribute: false, type: Array })
  set layers(layers: Array<EoxLayer>) {
    const oldLayers = this._layers;
    const newLayers = JSON.parse(
      JSON.stringify(layers)
    ).reverse() as Array<EoxLayer>;

    // remove layers that are not defined anymore
    if (oldLayers) {
      oldLayers.forEach((l: EoxLayer) => {
        if (
          !l.properties?.id || // always remove old layers without id
          !newLayers.find(
            (newLayer) => newLayer.properties.id === l.properties.id
          )
        ) {
          const layerToBeRemoved = getLayerById(this, l.properties?.id);
          this.map.removeLayer(layerToBeRemoved);
        }
      });
    }

    newLayers.forEach((l) => {
      this.addOrUpdateLayer(l);
    });

    // after all layers were added/updated/deleted, rearrange them in the correct order
    const sortedIds = newLayers.map((l) => l.properties?.id);
    this.map
      .getLayers()
      .getArray()
      .sort((layerA, layerB) => {
        return (
          sortedIds.indexOf(layerA.get("id")) -
          sortedIds.indexOf(layerB.get("id"))
        );
      });
    this._layers = newLayers;
  }

  get layers() {
    return this._layers;
  }

  private _preventScroll: boolean;

  /**
   * Set new `preventScroll`
   */
  @property({ attribute: "prevent-scroll", type: Boolean })
  set preventScroll(preventScroll: boolean) {
    if (preventScroll) {
      removeDefaultScrollInteractions(this.map);
      addScrollInteractions(this.map, true);
    } else addScrollInteractions(this.map);

    this._preventScroll = preventScroll;
  }

  /**
   * Prevent accidental scrolling / drag-pan of the map.
   * Scrolling only enabled while pressing the platform modifier key (ctrl/cmd).
   * @type Boolean
   */
  get preventScroll() {
    return this._preventScroll;
  }

  private _config: ConfigObject;

  set config(config: ConfigObject) {
    this._config = config;
    this.center = config.view?.center;
    this.zoom = config?.view?.zoom;
    this.projection = config?.view?.projection || "EPSG:3857";
    this.layers = config?.layers;
    this.controls = config?.controls;
    if (this.preventScroll === undefined) {
      this.preventScroll = config?.preventScroll;
    }
  }

  /**
   * Config object, including `controls`, `layers` and `view`.
   * Alternative way of defining the map config.
   */
  @property({ attribute: false, type: Object })
  get config() {
    return this._config;
  }

  private _projection: ProjectionLike;

  /**
   * @type ProjectionLike
   */
  get projection() {
    return this._projection;
  }

  /**
   * projection of the map view as SRS-identifier (e.g. EPSG:4326)
   */
  @property({ attribute: "projection", type: String })
  set projection(projection: ProjectionLike) {
    const oldView = this.map.getView();
    if (projection && projection !== oldView.getProjection().getCode()) {
      const newCenter = transform(
        this.center,
        oldView.getProjection().getCode(),
        projection
      );
      const newView = new View({
        zoom: oldView.getZoom(),
        center: newCenter,
        rotation: oldView.getRotation(),
        projection,
      });
      const eventTypes = [
        "change:center",
        "change:resolution",
        "change:rotation",
        "propertychange",
      ] as Array<ViewObjectEventTypes>;
      eventTypes.forEach((eventType: ViewObjectEventTypes) => {
        const existingListeners = oldView.getListeners(eventType);
        if (existingListeners?.length) {
          for (let i = existingListeners.length - 1; i >= 0; i--) {
            const listener = existingListeners[i];
            //@ts-ignore
            oldView.un(eventType, listener);
            //@ts-ignore
            newView.on(eventType, listener);
          }
        }
      });
      this.map.setView(newView);
      this._projection = projection;
      this.center = newCenter;
    }
  }

  /**
   * Map zoom
   */
  @property({ attribute: false, type: Number })
  zoom: number = 0;

  /**
   * Sync map with another map view by providing its query selector
   */
  @property()
  sync: string;

  /**
   * The native OpenLayers map object.
   * See [https://openlayers.org/en/latest/apidoc/](https://openlayers.org/en/latest/apidoc/)
   */
  @state()
  map: Map = new Map({
    controls: [],
    layers: [],
    view: new View({
      center: [0, 0],
      zoom: 0,
      projection: this.projection,
    }),
  });

  /**
   * Dictionary of ol interactions associated with the map.
   */
  @state()
  interactions: { [index: string]: Draw | Modify } = {};

  /**
   * Dictionary of select interactions.
   */
  @state()
  selectInteractions: { [index: string]: EOxSelectInteraction } = {};

  /**
   * Dictionary of ol controls associated with the map.
   */
  @state()
  mapControls: { [index: string]: Control } = {};

  /**
   * Creates or updates an existing layer
   * will update an layer if the ID already exists
   * @param json EoxLayer JSON definition
   * @returns the created or updated ol layer
   */
  addOrUpdateLayer = (json: EoxLayer) => {
    if (!json.interactions) {
      json.interactions = [];
    }
    const id = json.properties?.id;

    // if id is undefined, never try to update an existing layer, always create a new one instead.
    const existingLayer = id ? getLayerById(this, id) : false;
    let layer;
    if (existingLayer) {
      updateLayer(this, json, existingLayer);
      layer = existingLayer;
    } else {
      layer = createLayer(this, json);
      this.map.addLayer(layer);
    }
    return layer;
  };

  /**
   * Removes a given ol-interaction from the map. Layer have to be removed seperately
   * @param id id of the interaction
   */
  removeInteraction = (id: string | number) => {
    this.map.removeInteraction(this.interactions[id]);
    delete this.interactions[id];
    if (this.interactions[`${id}_modify`]) {
      this.map.removeInteraction(this.interactions[`${id}_modify`]);
      delete this.interactions[`${id}_modify`];
    }
  };

  /**
   * Removes a given EOxSelectInteraction from the map.
   * @param id id of the interaction
   */
  removeSelect = (id: string) => {
    this.selectInteractions[id].remove();
    delete this.selectInteractions[id];
  };

  /**
   * Removes a given control from the map.
   * @param id id of the control element
   */
  removeControl = (id: string) => {
    this.map.removeControl(this.mapControls[id]);
    delete this.mapControls[id];
  };

  /**
   * Gets an OpenLayers-Layer by its "id"
   * @param id id of the layer
   */
  getLayerById = (layerId: string) => {
    return getLayerById(this, layerId);
  };

  /**
   * Converts an array of OpenLayers Feature objects into a GeoJSON object.
   * This function utilizes the OpenLayers GeoJSON format writer to serialize
   *
   * @param features - The array of features to be serialized.
   * @returns The GeoJSON representation of the input features.
   */
  parseFeature = (features: Feature<Geometry>[]) => {
    const format = new GeoJSON();
    return format.writeFeaturesObject(features, READ_FEATURES_OPTIONS);
  };

  /**
   * Parses a text representation of geographic features and adds them to a vector layer.
   *
   * @param text - The string representation of the features to be parsed.
   * @param vectorLayer - The vector layer to which the parsed features will be added.
   * @param replaceFeatures - A boolean flag indicating whether to replace the existing features in the vector layer.
   */

  parseTextToFeature = (
    text: string,
    vectorLayer: VectorLayer<VectorSource>,
    replaceFeatures: boolean = false
  ) => {
    parseText(text, vectorLayer, this, replaceFeatures);
  };

  /**
   * Gets all map layers (including groups and nested layers)
   * as flat array
   */
  getFlatLayersArray = getFlatLayersArray;

  render() {
    const shadowStyleFix = `
      :host {
        display: block;
      }
      .eox-map-tooltip {
        pointer-events: none !important;
      }
    `;

    return html`
      <style>
        ${shadowStyleFix}
        ${olCss}
      </style>
      <div style="width: 100%; height: 100%"></div>
      <slot></slot>
    `;
  }

  /**
   * Return extent increased by the provided value.
   * @param {import("ol/extent").Extent} extent
   * @param {number} value
   * @returns {import("ol/extent").Extent}
   */
  buffer(extent: import("ol/extent").Extent, value: number) {
    return buffer(extent, value);
  }

  firstUpdated() {
    if (this.sync) {
      const originMap: EOxMap = document.querySelector(this.sync);
      if (originMap) {
        this.map.setView(originMap.map.getView());
      }
    } else {
      const centerIsSame = coordinatesRoughlyEquals(
        this.center,
        this.map.getView().getCenter()
      );
      if (this.center && !centerIsSame) {
        this.map.getView().setCenter(getCenterFromProperty(this.center));
      }
      if (this.zoom) {
        this.map.getView().setZoom(this.zoom);
      }
    }

    this.map.setTarget(this.renderRoot.querySelector("div"));

    this.map.on("loadend", () => {
      /**
       * OpenLayers map has finished loading, passes the map instance as detail.
       * For all other native events, attach an event listener to the map instance directly
       */
      this.dispatchEvent(new CustomEvent("loadend", { detail: this.map }));
    });
  }

  protected updated(
    _changedProperties: // eslint-disable-next-line
    PropertyValueMap<any> | globalThis.Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has("center")) {
      this.map.getView().setCenter(getCenterFromProperty(this.center));
    }
    if (_changedProperties.has("zoom")) {
      this.map.getView().setZoom(this.zoom || 0);
    }
  }
}
