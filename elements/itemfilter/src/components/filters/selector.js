import { LitElement, html, nothing } from "lit";
import { styleEOX } from "../../style.eox.js";
import { when } from "lit/directives/when.js";
import _debounce from "lodash.debounce";
import checkboxStyle from "@eox/elements-utils/styles/dist/checkbox.style.js";
import radioStyle from "@eox/elements-utils/styles/dist/radio.style.js";
import {
  resetSelectorMethod,
  toggleItemSelectorMethod,
  handleInputSelectorMethod,
  handleKeyDownSelectorMethod,
  updatedSelectorMethod,
} from "../../methods/filters";

/**
 * EOxSelector is a custom web component that provides a flexible selector interface for filtering items.
 * It supports both autocomplete and select modes and integrates with external methods for handling input,
 * key events, and selection updates.
 *
 * @module EOxSelector
 * @extends LitElement
 * @property {Object} filterObject - The filter object containing state and placeholder.
 * @property {Array} suggestions - The list of suggestions for the selector.
 * @property {Array} selectedItems - The list of currently selected items.
 * @property {String} query - The current input query for autocomplete.
 * @property {Boolean} showSuggestions - Flag to control the display of suggestions in autocomplete mode.
 * @property {Number} highlightedIndex - The index of the currently highlighted suggestion.
 * @property {Array} filteredSuggestions - The list of suggestions filtered based on the query.
 * @property {String} type - The type of selector ("select", "multi-select", etc.).
 * @property {Boolean} unstyled - Flag to determine if default styles should be applied.
 * @property {Number} tabIndex - The tab index for the input elements.
 * @property {Boolean} inlineMode - State whether to enable or disable inline mode
 */
export class EOxSelector extends LitElement {
  // Define properties with defaults and types
  static properties = {
    filterObject: { attribute: false, type: Object },
    suggestions: { attribute: false, type: Array },
    selectedItems: { state: true, type: Array },
    query: { state: true, type: String },
    showSuggestions: { state: true, type: Boolean },
    highlightedIndex: { state: true, type: Number },
    filteredSuggestions: { state: true, type: Array },
    type: { attribute: true, type: String },
    unstyled: { type: Boolean },
    tabIndex: { attribute: false, type: Number },
    inlineMode: { attribute: "inline-mode", type: Boolean },
  };

  constructor() {
    super();

    /**
     * @type Object
     */
    this.filterObject = {};

    /**
     * @type Array
     */
    this.suggestions = [];

    /**
     * @type Array
     */
    this.selectedItems = [];

    /**
     * @type String
     */
    this.query = "";

    /**
     * @type Boolean
     */
    this.showSuggestions = false;

    /**
     * @type Number
     */
    this.highlightedIndex = -1;

    /**
     * @type Array
     */
    this.filteredSuggestions = [];

    /**
     * @type String
     */
    this.type = "select";

    /**
     * @type Boolean
     */
    this.unstyled = false;

    /**
     * @type Number
     */
    this.tabIndex = 0;

    /**
     * @type Boolean
     */
    this.inlineMode = false;
  }

  /**
   * Called when the element is updated. Triggers the updatedSelectorMethod.
   *
   * @param {Map} changedProperties - The properties that have changed.
   */
  updated(changedProperties) {
    updatedSelectorMethod(changedProperties, this);
  }

  /**
   * Handles input events on the autocomplete input element.
   *
   * @param {Event} event - The input event.
   */
  #handleInput(event) {
    handleInputSelectorMethod(event, this);
  }

  /**
   * Handles keydown events on the autocomplete input element.
   *
   * @param {KeyboardEvent} event - The keydown event.
   */
  #handleKeyDown(event) {
    handleKeyDownSelectorMethod(event, this);
  }

  /**
   * Toggles the selection of an item.
   *
   * @param {Object} item - The item to toggle.
   */
  #toggleItem(item) {
    toggleItemSelectorMethod(item, this);
  }

  /**
   * Resets the selector using the resetSelectorMethod.
   */
  reset() {
    resetSelectorMethod(this);
  }

  /**
   * Debounced version of the toggleItem method to improve performance by limiting the rate at which the method is called.
   *
   * @function debouncedInputHandler
   * @private
   */
  debouncedInputHandler = _debounce(this.#toggleItem, 500, {
    leading: true,
  });

  /**
   * Initialise pre-defined selected items using `state`
   *
   */
  firstUpdated() {
    if (this.filterObject.state) {
      this.selectedItems = Object.keys(this.filterObject.state)
        .map((item) => (this.filterObject.state[item] ? item : null))
        .filter((item) => Boolean(item));

      this.filterObject.stringifiedState = this.selectedItems.join(", ") || "";

      this.requestUpdate();
    }
  }

  /**
   * Renders the HTML template for the component.
   */
  render() {
    const type = this.type.includes("multi") ? "checkbox" : "radio";
    const selectOverflowClass =
      this.filteredSuggestions.length > 5 ? "select-overflow" : nothing;
    return html`
      <style>
        ${!this.unstyled && styleEOX}
        ${!this.unstyled && checkboxStyle}
        ${!this.unstyled && radioStyle}
      </style>
      ${when(
        this.suggestions.length > 10,
        () =>
          html`<div class="autocomplete-container">
            <div class="autocomplete-container-wrapper">
              <input
                autocomplete="off"
                tabindex=${this.tabIndex}
                class="autocomplete-input"
                type="text"
                .value=${this.query}
                placeholder="${this.filterObject.placeholder || ""}"
                @input=${this.#handleInput}
                @keydown=${this.#handleKeyDown}
                @blur=${() => (this.showSuggestions = false)}
                @focus=${() => (this.showSuggestions = true)}
              />
            </div>
          </div>`,
      )}
      <div class="select-container ${selectOverflowClass}">
        <ul class="${this.type}">
          ${this.filteredSuggestions.map(
            (suggestion) => html`
              <li
                data-identifier="${suggestion.toString().toLowerCase()}"
                data-title="${suggestion}"
              >
                <label>
                  <input
                    type="${type}"
                    name=${suggestion}
                    .checked=${this.selectedItems.includes(suggestion)}
                    @change=${() => this.debouncedInputHandler(suggestion)}
                    @keydown=${(e) => {
                      if (e.key === " " && this.inlineMode)
                        this.debouncedInputHandler(suggestion);
                    }}
                    tabindex=${this.tabIndex + 1}
                  />
                  <span class="title">${suggestion}</span>
                </label>
              </li>
            `,
          )}
        </ul>
      </div>
    `;
  }
}

customElements.define("eox-itemfilter-select", EOxSelector);
