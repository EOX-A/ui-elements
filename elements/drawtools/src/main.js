import { LitElement, html, nothing } from "lit";
import "./components/list";
import "./components/controller";
import { styleEOX } from "./style.eox";
import {
  startDrawingMethod,
  initLayerMethod,
  discardDrawingMethod,
  emitDrawnFeaturesMethod,
  createSelectHandler,
  handleLayerId,
} from "./methods/draw";
import mainStyle from "@eox/elements-utils/styles/dist/main.style";
import { DUMMY_GEO_JSON } from "./enums/index.js";
import {
  initMapDragDropImport,
  handleFiles,
} from "./helpers/generate-upload-events.js";

/**
 * Manage drawn features on a map
 *
 * @element eox-drawtools
 */
export class EOxDrawTools extends LitElement {
  // Define properties with defaults and types
  static get properties() {
    return {
      allowModify: { attribute: "allow-modify", type: Boolean },
      for: { type: String },
      currentlyDrawing: { attribute: false, state: true, type: Boolean },
      draw: { attribute: false, state: true },
      drawLayer: { attribute: false, state: true },
      layerId: { attribute: "layer-id", type: String },
      drawnFeatures: { attribute: false, state: true, type: Array },
      modify: { attribute: false, state: true },
      multipleFeatures: { attribute: "multiple-features", type: Boolean },
      importFeatures: { attribute: "import-features", type: Boolean },
      showEditor: { attribute: "show-editor", type: Boolean },
      showList: { attribute: "show-list", type: Boolean },
      projection: { type: String },
      noShadow: { type: Boolean },
      format: { type: String },
      type: { type: String },
      unstyled: { type: Boolean },
    };
  }

  /**
   * @type import("@eox/map").EOxMap
   */
  #eoxMap;

  /**
   * @type import("ol").Map
   */
  #olMap;

  /**
   * @type string
   */
  #geoJSON;

  /**
   * @type string
   */
  #layerId;

  constructor() {
    super();

    /**
     * Allow modifying the drawn feature(s)
     */
    this.allowModify = false;

    /**
     * Query selector of an `eox-map` (`String`, passed as an attribute or property)
     * or an `eox-map` DOM element (`HTMLElement`, passed as property)
     *
     * @type {String|HTMLElement}
     */
    this.for = "eox-map";

    /**
     * Whether the user is currently in the process of drawing or not
     */
    this.currentlyDrawing = false;

    /**
     * The current native OpenLayers `draw` interaction
     * @type import("ol/interaction").Draw | import("@eox/map/src/helpers").EOxSelectInteraction
     */
    this.draw = null;

    /**
     * The current native OpenLayers draw `layer` (initialized with a `zIndex` of 100)
     * @type import("ol/layer/Vector").default
     */

    this.drawLayer = null;

    /**
     * The ID of the Vector/Vector Tile Layer that contains features to be selected
     */
    this.layerId = "";

    /**
     * The array of drawn native OpenLayers features. Normally includes only one feature, until multiple feature drawing is enabled.
     * @type Array<import("ol").Feature>
     */
    this.drawnFeatures = [];

    /**
     * The current native OpenLayers `modify` interaction
     * @type import("ol/interaction").Modify
     */
    this.modify = null;

    /**
     * Allow adding more than one feature at a time
     */
    this.multipleFeatures = false;

    /**
     * Allow import features using drag-drop and upload button
     */
    this.importFeatures = false;

    /**
     * Show geo-json editor for draw tool
     */
    this.showEditor = false;

    /**
     * Show list of features
     */
    this.showList = false;
    /**
     * Projection of the emitted drawn features
     */
    this.projection = "EPSG:4326";

    /**
     * Type of the drawn feature
     * @type {"Polygon" | "Point" | "LineString" | "Circle" | "Box"}
     */
    this.type = "Polygon";

    /**
     * @type {ReturnType<typeof import("./methods/draw/create-select-handler").default>}
     */
    this.selectionEvents = null;

    /**
     * The format in which the drawn features should be emitted
     *
     * @default "feature"
     * @type {"feature"| "geojson" | "wkt"}
     */
    this.format = "feature";

    /**
     * Render the element without additional styles
     */
    this.unstyled = false;

    /**
     * Renders the element without a shadow root
     *
     * @type {Boolean}
     */
    this.noShadow = false;
  }

  /**
   *
   *
   * @type {string}
   */
  set layerId(value) {
    handleLayerId(this, this.eoxMap, value, this.#layerId);
    this.#layerId = value;
  }

  get layerId() {
    return this.#layerId;
  }

  /**
   * @onClick Event handler triggered to start drawing on the map.
   */
  startDrawing() {
    startDrawingMethod(this);
  }

  /**
   * @onClick Event handler triggered to discard/stop drawing
   * on the map and delete the drawn shapes.
   */
  discardDrawing() {
    discardDrawingMethod(this);
  }

  /**
   * @param {string} text - The string representation of the features to be parsed.
   * @param {boolean} replaceFeatures - A boolean flag indicating whether to replace the existing features.
   */
  handleFeatureChange(text, replaceFeatures = false) {
    this.eoxMap.parseTextToFeature(
      text || JSON.stringify(DUMMY_GEO_JSON),
      this.drawLayer,
      this.eoxMap,
      replaceFeatures,
    );
  }

  /**
   * @param {DragEvent} evt - The event object from the file input interaction.
   */
  handleFilesChange(evt) {
    handleFiles(evt, this);
  }

  /**
   * @event onModifyEnd triggered when the modification of a shape is completed.
   */
  onModifyEnd() {
    this.emitDrawnFeatures();
  }

  /**
   * Update #geoJSON with stringify feature.
   */
  updateGeoJSON() {
    this.#geoJSON = JSON.stringify(
      this.eoxMap.parseFeature(this.drawnFeatures) || DUMMY_GEO_JSON,
      undefined,
      2,
    );
  }

  /**
   * Triggers different events when the drawing of a shape is completed.
   */
  emitDrawnFeatures() {
    /**
     * @param {import("./methods/draw/emit-drawn-features").EmitFormat} value
     */
    const drawUpdateEvent = (value) => {
      /**
       * Fires whenever features are added, modified or discarded, where the event detail
       * is the `drawnFeatures` array
       * @type Array<import("ol").Feature>
       */
      this.dispatchEvent(new CustomEvent("drawupdate", { detail: value }));
    };
    emitDrawnFeaturesMethod(this, drawUpdateEvent);
  }

  /**
   * Overrides createRenderRoot to handle shadow DOM creation based on the noShadow property.
   */
  createRenderRoot() {
    return this.noShadow ? this : super.createRenderRoot();
  }

  /**
   * initializes the EOxMap and OlMap instances
   * And stores them in the private properties #eoxMap and #olMap, respectively.
   * It then calls requestUpdate to trigger a re-render.
   */
  firstUpdated() {
    const { EoxMap, OlMap } = initLayerMethod(this, this.multipleFeatures);
    this.eoxMap = EoxMap;
    this.#olMap = OlMap;
    this.selectionEvents = createSelectHandler(this);

    if (this.importFeatures) initMapDragDropImport(this, this.eoxMap);

    this.updateGeoJSON();
    this.requestUpdate();
  }

  updated(changedProperties) {
    if (changedProperties.has("for")) {
      const { EoxMap, OlMap } = initLayerMethod(this, this.multipleFeatures);
      this.eoxMap = EoxMap;
      this.#olMap = OlMap;
    }
  }

  get eoxMap() {
    return this.#eoxMap;
  }

  set eoxMap(value) {
    const oldValue = this.#eoxMap;
    this.#eoxMap = value;
    this.requestUpdate("eoxMap", oldValue);
  }

  disconnectedCallback() {
    this.eoxMap?.map.removeLayer(this.drawLayer);
    super.disconnectedCallback();
  }
  // Render method for UI display
  render() {
    return html`
      <style>
        :host { display: block; }
        ${!this.unstyled && mainStyle}
        ${!this.unstyled && styleEOX}
      </style>

      <!-- Controller Component -->
      <eox-drawtools-controller
        .drawFunc=${{
          start: () => this.startDrawing(),
          discard: () => this.discardDrawing(),
          editor: (/** @type {{ target: { value: string; }; }} */ evt) =>
            this.handleFeatureChange(evt.target.value, true),
          import: (/** @type {DragEvent} */ evt) => this.handleFilesChange(evt),
        }}
        ?select=${!!this.layerId}
        .unstyled=${this.unstyled}
        .drawnFeatures=${this.drawnFeatures}
        .currentlyDrawing=${this.currentlyDrawing}
        .multipleFeatures=${this.multipleFeatures}
        .importFeatures=${this.importFeatures}
        .showEditor=${this.showEditor}
        .geoJSON=${this.#geoJSON}
      ></eox-drawtools-controller>

      <!-- List Component -->
      ${this.showList && this.drawnFeatures?.length
        ? html`<eox-drawtools-list
            .eoxMap=${this.eoxMap}
            .olMap=${this.#olMap}
            .draw=${this.draw}
            .drawLayer=${this.drawLayer}
            .drawnFeatures=${this.drawnFeatures}
            .modify=${this.modify}
            .unstyled=${this.unstyled}
            @changed=${() => {
              this.updateGeoJSON();
              this.requestUpdate();
            }}
          ></eox-drawtools-list>`
        : nothing}
    `;
  }
}

customElements.define("eox-drawtools", EOxDrawTools);
