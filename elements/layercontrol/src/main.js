import { LitElement, html } from "lit";
import { when } from "lit/directives/when.js";
import "./components/layer-list";
import "./components/optional-list";
import "./components/add-layers";
import { filterLayers } from "./helpers";
import {
  firstUpdatedMethod,
  layerListChangeMethod,
} from "./methods/layercontrol";

/**
 * Display layers and groups of a connected OpenLayers map
 *
 * ## Layer properties
 * In order to be displayed correctly, the OpenLayers map layers need some custom properties (using e.g. `layer.set(property, value)`).
 *
 * #### `id?: string`
 * The layer id. Not required but recommended. Can also be any other layer property (defined via the `idProperty` property or `id-property`attribute - see API).
 *
 * #### `title?: string`
 * The title of the layer displayed in the layer control. Not required, but recommended in order to display human-readable layer titles. Can be any other layer property (defined via the `titleProperty` property or `title-property`attribute - see API).
 *
 * #### `layerControlHide?: Boolean`
 * Completely hide a layer from the layer control.
 *
 * #### `layerControlOptional?: Boolean`
 * Initially hide a layer from the layer control, but make it available as an optional layer. If the layer is selected and added, it will be set to visible and pushed to the top of the layer list or (if originally configured within a layer group) to the top of the layer group.
 *
 * #### `layerControlExclusive?: Boolean`
 * Make layers mutually exclusive. If two or more layers (on the same level, i.e. at root or inside a layer group) have this property, then only one of them can be visualized at a time.
 *
 * #### `layerControlExpand?: Boolean`
 * Pre-expand a layer dropdown so that it is always open when the component initializes.
 *
 * #### `layerControlToolsExpand?: Boolean`
 * Pre-expand the layer tools so they are visible when the component initializes.
 *
 * #### `layerConfig?: Object`
 * Configuration options for the layer (displayed in the layer tools' "config" tab)
 *
 * #### `layerDateTime?: Object`
 * Partial eox-timecontrol config passed to the "datetime" tool
 *
 * ### `layerLegend`?: Object
 * Creates a dynamic color legend based on range & domain of values. Extenteds partial config of `color-legend-element`
 *
 * @element eox-layercontrol
 */
export class EOxLayerControl extends LitElement {
  // Define static properties for the component
  static properties = {
    for: { type: String },
    idProperty: { attribute: "id-property" },
    map: { attribute: false, state: true },
    titleProperty: { attribute: "title-property", type: String },
    showLayerZoomState: { attribute: "show-layer-zoom-state", type: Boolean },
    tools: { attribute: false },
    addExternalLayers: { attribute: false },
    unstyled: { type: Boolean },
    styleOverride: { type: String },
    toolsAsList: { type: Boolean },
    isGloballyExclusive: { type: Boolean },
  };

  /**
   * Instance of `eox-map` which is a wrapper for the OL
   *
   * @type {import("../../map/src/main").EOxMap}
   */
  #eoxMap;

  // Constructor to set default values for properties
  constructor() {
    super();

    /**
     * Query selector of an `eox-map` (`String`, passed as an attribute or property)
     * or an `eox-map` DOM element (`HTMLElement`, passed as property)
     *
     * @type {String|HTMLElement}
     */
    this.for = "eox-map";

    /**
     * Layer id property
     *
     * @type {String}
     */
    this.idProperty = "id";

    /**
     * The native OL map instance
     *
     * @type {import("ol").Map}
     * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html}
     */
    this.map = null;

    /**
     * Layer title property
     *
     * @type {String}
     */
    this.titleProperty = "title";

    /**
     * Show layer state based on zoom level or not
     *
     * @type {Boolean}
     */
    this.showLayerZoomState = false;

    /**
     * Layer tools
     *
     * @type {Array<String>}
     */
    this.tools = ["info", "opacity", "datetime", "config", "remove", "sort"];

    /**
     * Enable-disable external layer
     *
     * @type {Boolean}
     */
    this.addExternalLayers = false;

    /**
     * Render the element without additional styles
     *
     * @type {Boolean}
     */
    this.unstyled = false;

    /**
     * Overrides elements current CSS.
     *
     * @type {String}
     */
    this.styleOverride = "";

    /**
     * If enabled, the tools section will be rendered as list.
     *
     * @type {Boolean}
     */
    this.toolsAsList = false;

    /**
     * Enable global exclusivity for layers that are not restricted to a group
     *
     * @type {Boolean}
     */
    this.isGloballyExclusive = false;
  }

  /**
   * Called when the component is first updated
   * Updated #eoxMap after first update.
   */
  firstUpdated() {
    this.eoxMap = firstUpdatedMethod(this);
  }

  updated(changedProperties) {
    if (changedProperties.has("for")) {
      this.eoxMap = firstUpdatedMethod(this);
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

  /**
   * Event handler for changes in the layer list
   *
   * @param {CustomEvent & {target: Element}} evt
   */
  #handleLayerControlLayerListChange(evt) {
    layerListChangeMethod(evt, this);
    /**
     * A generic layer change event; could be a layer visibility, group length updates and others.
     * Passes the changed layer in the `detail`.
     */
    this.dispatchEvent(new CustomEvent("layerchange", { detail: evt.detail }));
  }

  /**
   * Dispatches datetime updates from layer datetime to the layercontrol
   * @param {CustomEvent} evt
   */
  #handleDatetimeUpdate(evt) {
    this.dispatchEvent(
      new CustomEvent("datetime:updated", { detail: evt.detail }),
    );
  }

  render() {
    // Checks if there are any layers with the 'layerControlOptional' property set to true
    const layers = this.map?.getLayers().getArray();
    const layerControlOptionalCondition =
      layers && filterLayers(layers, "layerControlOptional", true)?.length > 0;

    return html`
      <style>
        ${!this.unstyled && this.#styleEOX}
        ${this.styleOverride}
      </style>

      <!-- Conditional rendering of add layers component -->
      ${when(
        this.addExternalLayers && this.#eoxMap?.addOrUpdateLayer,
        () => html`
          <eox-layercontrol-add-layers
            .noShadow=${true}
            .eoxMap=${this.#eoxMap}
            .unstyled=${this.unstyled}
          ></eox-layercontrol-add-layers>
        `,
      )}

      <!-- Conditional rendering of layer list component -->
      ${when(
        this.map,
        () => html`
          <eox-layercontrol-layer-list
            .noShadow=${true}
            class="layers"
            .idProperty=${this.idProperty}
            .layers=${this.map.getLayers()}
            .map=${this.map}
            .titleProperty=${this.titleProperty}
            .showLayerZoomState=${this.showLayerZoomState}
            .tools=${this.tools}
            .unstyled=${this.unstyled}
            .toolsAsList=${this.toolsAsList}
            @changed=${this.#handleLayerControlLayerListChange}
            @datetime:updated=${this.#handleDatetimeUpdate}
          ></eox-layercontrol-layer-list>
        `,
      )}

      <!-- Conditional rendering of optional list component -->
      ${when(
        layerControlOptionalCondition,
        () => html`
          <eox-layercontrol-optional-list
            .noShadow=${true}
            .idProperty=${this.idProperty}
            .layers=${this.map.getLayers()}
            .titleProperty=${this.titleProperty}
            @changed=${() => this.requestUpdate()}
          ></eox-layercontrol-optional-list>
        `,
      )}
    `;
  }

  #styleEOX = `
    :host, :root {
      font-family: Roboto, sans-serif;
      --padding: 0.5rem;
      --list-padding: 48px;
      --layer-input-visibility: flex;
      --layer-type-visibility: block;
      --layer-title-visibility: flex;
      --layer-visibility: block;
      --layer-tools-button-visibility: flex;

      display: block;
      padding: var(--padding) 0;
    }
  `;
}

customElements.define("eox-layercontrol", EOxLayerControl);
