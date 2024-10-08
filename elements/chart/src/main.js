import { LitElement, html } from "lit";
import { style } from "./style";
import { styleEOX } from "./style.eox";
import allStyle from "../../../utils/styles/dist/all.style";
import { default as vegaEmbed } from "vega-embed";

/**
 * @element eox-chart
 */
export class EOxChart extends LitElement {
  static properties = {
    spec: { attribute: false, type: Object },
    noShadow: { attribute: "no-shadow", type: Boolean },
    unstyled: { type: Boolean },
  };

  constructor() {
    super();

    /**
     * Vega-Lite spec
     *
     * @type {import("vega-embed").VisualizationSpec}
     */
    this.spec;

    /**
     * Renders the element without a shadow root
     *
     * @type {Boolean}
     */
    this.noShadow = false;

    /**
     * Render the element without additional styles
     *
     * @type {Boolean}
     */
    this.unstyled = false;
  }

  /**
   * Render Vega-Lite using vega-embed
   *
   * @param {import("vega-embed").VisualizationSpec} spec
   */
  renderVega(spec) {
    /** */
    vegaEmbed(
      /** @type {HTMLElement} */ (this.renderRoot.querySelector("#vis")),
      spec
    );
  }

  /**
   * Lifecycle method called when the element is updated
   *
   * @param {import("lit").PropertyValues} changedProperties
   */
  async updated(changedProperties) {
    // check if spec has been changed to prevent useless parsing
    if (changedProperties.has("spec")) {
      this.renderVega(this.spec);
    }
  }

  firstUpdated() {
    this.renderVega(this.spec);
  }

  /**
   * Overrides createRenderRoot to handle shadow DOM creation based on the noShadow property.
   */
  createRenderRoot() {
    return this.noShadow ? this : super.createRenderRoot();
  }

  /**
   * Renders the component's HTML and CSS
   */
  render() {
    return html`
      <style>
        ${style}
        ${!this.unstyled && allStyle}
        ${!this.unstyled && styleEOX}
      </style>
      <div id="vis"></div>
    `;
  }
}

customElements.define("eox-chart", EOxChart);
