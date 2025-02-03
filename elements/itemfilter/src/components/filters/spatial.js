import { LitElement, html, nothing } from "lit";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";
import booleanWithin from "@turf/boolean-within";
import {
  handleClickSpatialMethod,
  resetSpatialFilterMethod,
  resetSpatialMethod,
  setupSpatialMethod,
} from "../../methods/filters/index.js";

/**
 * Determines if one geometry is within another using Turf.js booleanWithin function.
 *
 * @param {Object} itemGeometry - The geometry of the item.
 * @param {Object} filterGeometry - The geometry of the filter.
 * @returns {boolean} - True if itemGeometry is within filterGeometry, otherwise false.
 */
export const within = (itemGeometry, filterGeometry) => {
  if (!filterGeometry) {
    return true;
  }
  return booleanWithin(itemGeometry, filterGeometry);
};

/**
 * EOxItemFilterSpatial is a custom web component that provides a spatial filter for items.
 * The component allows users to select a spatial filter mode (intersects or within) and apply it to a map.
 *
 * @module EOxItemFilterSpatial
 * @extends LitElement
 * @property {Object} filterObject - The filter object containing the state and geometry.
 * @property {Number} tabIndex - The tab index for the input elements.
 */
class EOxItemFilterSpatial extends LitElement {
  // Define properties with defaults and types
  static get properties() {
    return {
      filterObject: { type: Object },
      tabIndex: { attribute: false, type: Number },
    };
  }

  constructor() {
    super();

    /**
     * @type Object
     */
    this.filterObject = {};

    /**
     * @type Number
     */
    this.tabIndex = 0;
  }

  /**
   * Resets the spatial filter using the resetSpatialMethod.
   */
  reset() {
    resetSpatialMethod(this);
  }

  /**
   * Overrides the default createRenderRoot method to render in the light DOM.
   *
   * @returns {this} - The current instance to render in the light DOM.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Handles the click event for spatial filter mode selection.
   *
   * @param {string} mode - The mode of the spatial filter (e.g., "intersects", "within").
   */
  #handleClick(mode) {
    handleClickSpatialMethod(mode, this);
  }

  /**
   * Renders the HTML template for the component.he template result for rendering.
   */
  render() {
    return when(
      this.filterObject,
      () => html`
        <form style="display: inline">
          ${map(
            ["intersects", "within"],
            (mode) => html`
              <label>
                <input
                  tabindex=${this.tabIndex}
                  type="radio"
                  name="mode"
                  .checked="${(this.filterObject.state.mode || "") === mode ||
                  nothing}"
                  value="${mode}"
                  @click=${() => this.#handleClick(mode)}
                />
                <small>${mode} filter geometry</small>
              </label>
            `,
          )}
        </form>
        <eox-itemfilter-spatial-filter
          exportparts="map: spatial-filter-map"
          .geometry="${this.filterObject.state?.geometry}"
          @filter="${(e) => {
            this.filterObject.state.geometry = e.detail.geometry;
            this.filterObject.dirty = true;
            this.filterObject.stringifiedState = "Polygon";
            this.dispatchEvent(new CustomEvent("filter"));
          }}"
        ></eox-itemfilter-spatial>
      `,
    );
  }
}

customElements.define("eox-itemfilter-spatial", EOxItemFilterSpatial);

/**
 * SpatialFilter is a custom web component that renders a map and allows users to apply spatial filters.
 * It uses the LitElement base class and integrates with external methods for setup and reset functionalities.
 *
 * @module SpatialFilter
 * @extends LitElement
 * @property {Object} geometry - The geometry object used for the spatial filter.
 * @property {Object} eoxMap - The map object used to display and interact with the spatial filter.
 */
class SpatialFilter extends LitElement {
  // Define properties with defaults and types
  static get properties() {
    return {
      geometry: { type: Object },
      eoxMap: { type: Object },
    };
  }

  constructor() {
    super();

    /**
     * @type Object
     */
    this.geometry = null;

    /**
     * @type Object
     */
    this.eoxMap = null;
  }

  /**
   * Lifecycle method called after the first update. Initializes the spatial filter.
   */
  firstUpdated() {
    this.#setup();
  }

  /**
   * Sets up the spatial filter using the setupSpatialMethod.
   */
  #setup() {
    setupSpatialMethod(this);
  }

  /**
   * Resets the spatial filter using the resetSpatialFilterMethod.
   */
  reset() {
    resetSpatialFilterMethod(this);
  }

  /**
   * Renders the HTML template for the component.
   */
  render() {
    return html`<div id="eox-map"></div>`;
  }
}

customElements.define("eox-itemfilter-spatial-filter", SpatialFilter);

export { EOxItemFilterSpatial, SpatialFilter };
