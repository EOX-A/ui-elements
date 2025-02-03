import { LitElement, html, nothing } from "lit";
import { updateButtonStatesMethod } from "../methods/controller";
import buttonStyle from "@eox/elements-utils/styles/dist/button.style";
import inputStyle from "@eox/elements-utils/styles/dist/input.style";
import { copyTextToClipboard } from "../helpers/index.js";
import { when } from "lit/directives/when.js";

/**
 * Controller component for drawing features
 *
 * @element eox-drawtools-controller
 */
export class EOxDrawToolsController extends LitElement {
  // Define properties with default values and types
  static properties = {
    multipleFeatures: { attribute: false, type: Boolean },
    drawnFeatures: { attribute: false, state: true, type: Array },
    currentlyDrawing: { attribute: false, state: true, type: Boolean },
    drawFunc: { attribute: false, type: Object },
    select: { type: Boolean },
    importFeatures: { attribute: "import-features", type: Boolean },
    showEditor: { attribute: "show-editor", type: Boolean },
    geoJSON: { attribute: "geo-json", type: String },
    unstyled: { type: Boolean },
  };

  /**
   * @type boolean | import("lit").nothing
   */
  #drawDisabled = true;

  /**
   * @type boolean | import("lit").nothing
   */
  #discardDisabled = true;

  constructor() {
    super();

    /**
     * Allow adding more than one feature at a time
     */
    this.multipleFeatures = false;

    /**
     * The array of drawn native OpenLayers features. Normally includes only one feature,
     * until multiple feature drawing is enabled.
     *
     * @type Array<import("ol").Feature>
     */
    this.drawnFeatures = [];

    /**
     * Allow import features using drag-drop and upload button
     * @type Boolean
     */
    this.importFeatures = false;

    /**
     * Show geo-json editor for draw tool
     * @type Boolean
     */
    this.showEditor = false;

    /**
     * Whether the user is currently in the process of drawing or not
     */
    this.currentlyDrawing = false;

    /**
     * List of draw function object like start, discard etc.
     */
    this.drawFunc = null;

    /**
     * Parsed and Stringify Geo JSON
     * @type String
     */
    this.geoJSON = "";

    /**
     * Render the element without additional styles
     */
    this.unstyled = false;

    /**
     *
     */
    this.select = false;
  }

  /**
   * Updates button states based on conditions
   */
  updateButtonStates() {
    const { drawDisabled, discardDisabled } = updateButtonStatesMethod(this);

    this.#drawDisabled = drawDisabled;
    this.#discardDisabled = discardDisabled;
  }

  /**
   * Overrides createRenderRoot to handle shadow DOM
   */
  createRenderRoot() {
    return this;
  }

  render() {
    this.updateButtonStates();
    const drawLabel = this.currentlyDrawing ? "drawing" : "draw";

    return html`
      <style>
        ${!this.unstyled && buttonStyle}
        ${!this.unstyled && inputStyle}
      </style>
      <div class="wrap-btn">
        <slot></slot>
        <div>
          <!-- Draw Button -->
          <button
            data-cy="drawBtn"
            class="${this.select ? "pointer" : "polygon"} icon"
            ?disabled="${this.#drawDisabled || nothing}"
            @click="${() => this.drawFunc.start()}"
          >
            ${drawLabel}
          </button>

          <!-- Discard Button -->
          <button
            data-cy="discardBtn"
            class="discard icon"
            ?disabled="${this.#discardDisabled || nothing}"
            @click="${() => this.drawFunc.discard()}"
          >
            discard
          </button>
        </div>

        <!-- Import Button -->
        ${when(
          this.importFeatures,
          () => html`
            <!-- Import Input Field : Hidden -->
            <input
              type="file"
              id="import-file"
              style="display: none;"
              @change=${this.drawFunc.import}
            />

            <!-- Main Import Button -->
            <button
              data-cy="importBtn"
              class="import icon"
              @click=${() =>
                /**@type {HTMLElement}*/ (
                  this.querySelector("#import-file")
                ).click()}
            >
              import
            </button>
          `,
        )}
      </div>

      <!-- Geo JSON Wrapper -->
      ${when(
        this.showEditor,
        () => html`
          <div class="json-wrapper">
            <!-- Geo JSON Editor -->
            <textarea
              @drop=${this.drawFunc.import}
              @input=${this.drawFunc.editor}
              .value=${this.geoJSON}
            ></textarea>

            <!-- Geo JSON Copy Button -->
            <button
              data-cy="copyBtn"
              class="icon-copy"
              @click=${() => copyTextToClipboard(this.geoJSON)}
            >
              ${this.unstyled ? "copy" : nothing}
            </button>
          </div>
        `,
      )}
    `;
  }
}

customElements.define("eox-drawtools-controller", EOxDrawToolsController);
