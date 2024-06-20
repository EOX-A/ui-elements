import { LitElement, html } from "lit";
import { map } from "lit/directives/map.js";
import { styleEOX } from "../style.eox";
import {
  handleChipClickMethod,
  handleCloseMethod,
  keyboardEventListenerMethod,
} from "../methods/chips";

/**
 * EOxItemFilterChipsV2 is a custom web component that provides a chip-style item selector.
 * It uses the LitElement base class and integrates with external methods for handling chip clicks,
 * close events, and keyboard events.
 *
 * @module EOxItemFilterChips
 * @extends LitElement
 * @property {Object} items - The items to be displayed as chips.
 * @property {Object} controller - The controller object to manage chip actions.
 */
export class EOxItemFilterChipsV2 extends LitElement {
  // Define properties with defaults and types
  static get properties() {
    return {
      items: { attribute: false, type: Object },
      controller: { attribute: false, type: Object },
    };
  }

  constructor() {
    super();

    /**
     * @type Object
     */
    this.items = {};

    /**
     * @type Object
     */
    this.controller = {};
  }

  /**
   * Lifecycle method called when the element is connected to the DOM.
   * Adds a keyboard event listener.
   */
  connectedCallback() {
    super.connectedCallback();
    this.getRootNode().addEventListener(
      "keydown",
      this.#keyboardEventListener.bind(this)
    );
  }

  /**
   * Lifecycle method called when the element is disconnected from the DOM.
   * Removes the keyboard event listener.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.getRootNode().removeEventListener(
      "keydown",
      this.#keyboardEventListener.bind(this)
    );
  }

  /**
   * Handles the close event for a chip.
   *
   * @param {Event} event - The close event.
   * @param {number} index - The index of the chip to be closed.
   * @private
   */
  #handleClose(event, index) {
    handleCloseMethod(event, index, this);
  }

  /**
   * Dispatches a custom event with the selected items.
   *
   * @private
   */
  _dispatchEvent() {
    this.dispatchEvent(
      new CustomEvent("items-selected", {
        detail: this.items,
      })
    );
  }

  /**
   * Handles keyboard events for the component.
   *
   * @param {Event} event - The keyboard event.
   * @private
   */
  #keyboardEventListener(event) {
    keyboardEventListenerMethod(event, this);
  }

  /**
   * Handles click events for the chips.
   *
   * @param {Event} evt - The click event.
   * @private
   */
  #handleChipClick(evt) {
    handleChipClickMethod(evt, this);
  }

  /**
   * Renders the HTML template for the component.
   */
  render() {
    return html`
      <style>
        ${styleEOX}
      </style>
      <span class="chip-container">
        ${map(
          this.items,
          (item) => html`
            <span class="chip" @click=${this.#handleChipClick.bind(this)}>
              <span class="chip-title">${item.title}</span>
            </span>
          `
        )}
      </span>
    `;
  }
}

customElements.define("eox-itemfilter-chips-v2", EOxItemFilterChipsV2);
