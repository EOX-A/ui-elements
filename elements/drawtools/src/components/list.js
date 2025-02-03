import { LitElement, html, nothing } from "lit";
import { keyed } from "lit/directives/keyed.js";
import {
  deleteFeatureMethod,
  firstUpdatedMethod,
  hoverFeatureMethod,
  selectAndDeselectFeatureMethod,
} from "../methods/list";
import listStyle from "@eox/elements-utils/styles/dist/list.style";

/**
 * Display list of features
 *
 * @element eox-drawtools-list
 */
export class EOxDrawToolsList extends LitElement {
  static properties = {
    eoxMap: { attribute: false, state: true },
    olMap: { attribute: false, state: true },
    draw: { attribute: false, state: true },
    drawLayer: { attribute: false, state: true },
    drawnFeatures: { attribute: false, state: true, type: Array },
    modify: { attribute: false, state: true },
    unstyled: { type: Boolean },
  };

  /**
   * @type import("@eox/map/types/src/helpers/select").EOxSelectInteraction
   */
  hoverInteraction;

  /**
   * @type import("@eox/map/types/src/helpers/select").EOxSelectInteraction
   */
  clickInteraction;

  /**
   * @type string | number
   */
  hoverId;

  /**
   * @type string | number
   */
  clickId;

  constructor() {
    super();

    /**
     * @type import("@eox/map").EOxMap
     */
    this.eoxMap = null;

    /**
     * @type import("ol").Map
     */
    this.olMap = null;

    /**
     * The current native OpenLayers `draw` interaction
     * @type import("ol/interaction").Draw
     */

    this.draw = null;

    /**
     * The current native OpenLayers draw `layer`
     * @type import("ol/layer").Vector<import("ol/source").Vector>
     */

    this.drawLayer = null;

    /**
     * The array of drawn native OpenLayers features. Normally includes only one feature,
     * until multiple feature drawing is enabled.
     *
     * @type Array<import("ol").Feature>
     */
    this.drawnFeatures = [];

    /**
     * The current native OpenLayers `modify` interaction
     * @type import("ol/interaction").Modify
     */

    this.modify = null;

    /**
     * Render the element without additional styles
     */
    this.unstyled = false;
  }

  /**
   * Handles the deletion of an individual feature.
   *
   * @param {Event & { target: HTMLButtonElement }} evt - Event object containing button target.
   */
  _handleDelete(evt) {
    deleteFeatureMethod(evt, this);
    this.dispatchEvent(new CustomEvent("changed", { bubbles: true }));
  }

  /**
   * Handles the selection and deselection of a feature from the list.
   *
   * @param {import("ol").Feature} feature - The selected feature.
   */
  _handleFeatureSelectAndDeselect(feature) {
    selectAndDeselectFeatureMethod(feature, this);
  }

  /**
   *
   * @param {number | string | undefined} featureId - The ID of the feature to hover.
   * @param {Boolean} mouseOut - Flag indicating mouse out event.
   */
  _handleHoverFeature(featureId, mouseOut = false) {
    hoverFeatureMethod(this, featureId, mouseOut);
  }

  /**
   * Initiates initial settings and event triggers upon the component's first update.
   */
  firstUpdated() {
    firstUpdatedMethod(this);
  }

  /**
   * Overrides createRenderRoot to handle shadow DOM.
   */
  createRenderRoot() {
    return this;
  }

  render() {
    // Update hover and click IDs
    this.hoverId = this.hoverInteraction?.selectedFids[0];
    this.clickId = this.clickInteraction?.selectedFids[0];

    return html`
      <style>
        ${!this.unstyled && listStyle}
      </style>
      <ul class="list-wrap">
        ${this.drawnFeatures.map((feature, i) => {
          // Determine feature number and ID
          const featureNumber = i + 1;
          const featureId = feature.getId();

          // Check if the feature is hovered or clicked
          const isFeatureHovered = this.hoverId === featureId;
          const isFeatureClicked = this.clickId === featureId;
          const isSelected = isFeatureHovered || isFeatureClicked;
          const selectionClass = isSelected ? "selected" : nothing;

          return keyed(
            featureNumber,
            html`
              <li
                class="${selectionClass}"
                @mouseover=${() => this._handleHoverFeature(featureId)}
                @mouseout=${() => this._handleHoverFeature(featureId, true)}
              >
                <div
                  class="list"
                  @click="${() =>
                    this._handleFeatureSelectAndDeselect(feature)}"
                >
                  <span class="title">Feature #${featureNumber}</span>
                  <button
                    index=${i}
                    class="icon smallest discard"
                    @click="${this._handleDelete}"
                  >
                    x
                  </button>
                </div>
              </li>
            `,
          );
        })}
      </ul>
    `;
  }
}

customElements.define("eox-drawtools-list", EOxDrawToolsList);
