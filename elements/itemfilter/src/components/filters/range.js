import { LitElement, html } from "lit";
import { when } from "lit/directives/when.js";
import _debounce from "lodash.debounce";
import "toolcool-range-slider";
import {
  rangeInputHandlerMethod,
  rangeLabelMethod,
  resetRangeMethod,
} from "../../methods/filters/index.js";

/**
 * EOxItemFilterRange is a custom web component that provides a range slider for filtering items.
 * It uses the LitElement base class and integrates with external methods for handling input events,
 * generating labels, and resetting the range filter.
 *
 * @module EOxItemFilterRange
 * @extends LitElement
 * @property {Object} filterObject - The filter object containing state and range limits.
 * @property {Number} tabIndex - The tab index for the input elements.
 */
export class EOxItemFilterRange extends LitElement {
  // Define properties with defaults and types
  static properties = {
    filterObject: { attribute: false, type: Object },
    tabIndex: { attribute: false, type: Number },
  };

  constructor() {
    super();

    /**
     * @type Object
     */
    this.filterObject = {};

    /**
     * @type Boolean
     */
    this.tabIndex = 0;

    /**
     * @type {(evt: CustomEvent<any>) => void}
     */
    this.inputHandler = this.#inputHandler.bind(this);

    /**
     * @type Function
     */
    this.debouncedInputHandler = _debounce(this.inputHandler, 500, {
      leading: false,
    });
  }

  /**
   * Handles the input event for the range slider.
   *
   * @param {CustomEvent} evt - The input event.
   */
  #inputHandler(evt) {
    rangeInputHandlerMethod(evt, this);
  }

  /**
   * Generates labels for the range slider.
   *
   * @param {string} val - The value of the label.
   * @param {string} pos - The position of the label (before or after).
   * @returns {import("lit").HTMLTemplateResult} - The generated label.
   */
  #label(val, pos) {
    return rangeLabelMethod(val, pos, this);
  }

  /**
   * Resets the range filter using the resetRangeMethod.
   */
  reset() {
    resetRangeMethod(this);
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
   * Renders the HTML template for the component.
   */
  render() {
    return when(
      this.filterObject,
      () => html`
        ${this.#label("min", "before")}
        <tc-range-slider
          min="${this.filterObject.min}"
          max="${this.filterObject.max}"
          value1="${this.filterObject.state.min || this.filterObject.min}"
          value2="${this.filterObject.state.max || this.filterObject.max}"
          step="${this.filterObject.step || 1}"
          @change=${this.debouncedInputHandler}
        ></tc-range-slider>
        ${this.#label("max", "after")}
      `,
    );
  }
}

customElements.define("eox-itemfilter-range", EOxItemFilterRange);
