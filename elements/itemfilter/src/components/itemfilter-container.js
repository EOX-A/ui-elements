import { LitElement, html } from "lit";
import { when } from "lit/directives/when.js";
import { styleEOX } from "../style.eox";
import {
  searchFilterMethod,
  resetFilterMethod,
  handleFormClickMethod,
  handleShowDropdownOnFocusMethod,
  handleToggleDropdownMethod,
  handleKeyDownMethod,
  handleClickOutsideMethod,
  initPopoverMethod,
} from "../methods/container";
import { getChipItems, isFiltersDirty } from "../helpers";

/**
 * EOxItemFilterContainer is a custom web component that provides a container for item filters.
 *
 * @module EOxItemFilterContainer
 * @extends LitElement
 * @property {Object} filterProperties - The properties for the filter.
 * @property {Boolean} inlineMode - Flag to determine if the component should operate in inline mode.
 * @property {Boolean} unstyled - Flag to determine if default styles should be applied.
 * @property {Object} filters - The filters applied in the container.
 */
export class EOxItemFilterContainer extends LitElement {
  // Define properties with defaults and types
  static get properties() {
    return {
      filterProperties: { attribute: false, type: Object },
      inlineMode: { attribute: "inline-mode", type: Boolean },
      unstyled: { type: Boolean },
      filters: { state: true, type: Object },
    };
  }

  constructor() {
    super();

    /**
     * @type Object
     */
    this.filterProperties = {};

    /**
     * @type Boolean
     */
    this.unstyled = false;

    /**
     * @type Boolean
     */
    this.inlineMode = false;

    /**
     * @type Object
     */
    this.filters = {};

    /**
     * @type {(this: Document, ev: MouseEvent|FocusEvent) => any}
     */
    this._handleClickOutside = this.#handleClickOutside.bind(this);

    /**
     * @type {(this: Document, ev: KeyboardEvent) => any}
     */
    this._handleKeyDown = this.#handleKeyDown.bind(this);
  }

  /**
   * @type Boolean
   */
  set showDropdown(show) {
    /** @type {HTMLElement} **/ (
      this.renderRoot.querySelector("[popover]")
    ).togglePopover(show);
  }

  get showDropdown() {
    return this.renderRoot.querySelector("[popover]")?.matches(":popover-open");
  }

  #handlePopover() {
    // Wait for first render tick
    setTimeout(() => (this._overlayCleanup = initPopoverMethod(this)));
  }

  /**
   * Function to add all the inline mode event listener
   */
  #addInlineModeEventListener() {
    document.addEventListener("click", this._handleClickOutside);
    document.addEventListener("focusout", this._handleClickOutside);
    document.addEventListener("keydown", this._handleKeyDown);
    this.#handlePopover();
  }

  /**
   * Lifecycle method called when the element is connected to the DOM.
   * Adds event listeners if inline mode is enabled.
   */
  connectedCallback() {
    super.connectedCallback();
    if (this.inlineMode) this.#addInlineModeEventListener();
  }

  /**
   * Function to remove all the inline mode event listener
   */
  #removeInlineModeEventListener() {
    document.removeEventListener("click", this._handleClickOutside);
    document.removeEventListener("focusout", this._handleClickOutside);
    document.removeEventListener("keydown", this._handleKeyDown);
    this._overlayCleanup();
  }

  /**
   * Lifecycle method called when the element is disconnected from the DOM.
   * Removes event listeners if inline mode is enabled.
   */
  disconnectedCallback() {
    if (this.inlineMode) this.#removeInlineModeEventListener();
    super.disconnectedCallback();
  }

  /**
   * Stores the autoUpdate cleanup function to be called
   * when disconnected
   *
   * @type {() => void}
   * @private
   */
  _overlayCleanup() {}

  /**
   * Handles click events outside the component to close the dropdown.
   *
   * @param {Event} event - The click event.
   */
  #handleClickOutside(event) {
    handleClickOutsideMethod(event, this);
  }

  /**
   * Handles keydown events for the component.
   *
   * @param {KeyboardEvent} event - The keydown event.
   */
  #handleKeyDown(event) {
    handleKeyDownMethod(event, this);
  }

  /**
   * Toggles the dropdown visibility.
   *
   * @param {Event} event - The toggle event.
   */
  #handleToggleDropdown(event) {
    handleToggleDropdownMethod(event, this);
  }

  /**
   * Shows the dropdown on input focus.
   */
  #handleShowDropdownOnFocus() {
    handleShowDropdownOnFocusMethod(this);
  }

  /**
   * Handles click events on the form to prevent closing the dropdown.
   *
   * @param {Event} event - The click event.
   */
  #handleFormClick(event) {
    handleFormClickMethod(event, this);
  }

  /**
   * Resets the filter using the resetFilterMethod.
   *
   * @param {Event} event - The reset event.
   */
  #resetFilter(event) {
    resetFilterMethod(event, this);
  }

  /**
   * Searches the filter using the searchFilterMethod.
   *
   * @param {Event} event - The search event.
   */
  #searchFilter(event) {
    searchFilterMethod(event, this);
  }

  /**
   * Re renders when inline mode is configured
   *
   */
  updateInline() {
    if (this.inlineMode) this.requestUpdate();
  }

  updated(_changedProperties) {
    if (_changedProperties.has("inlineMode")) {
      if (this.inlineMode) this.#addInlineModeEventListener();
      else this.#removeInlineModeEventListener();
    }
  }

  /**
   * Renders the HTML template for the component.
   */
  render() {
    return html`
      <style>
        ${!this.unstyled && styleEOX}
      </style>
      ${this.inlineMode
        ? html`
            <div
              class="inline-container-wrapper"
              @click="${this.#handleToggleDropdown}"
            >
              <div class="inline-container" part="container">
                <div class="chip-container">
                  <div class="chip-wrapper">
                    <eox-itemfilter-chips
                      .items=${getChipItems(this.filters)}
                      .controller=${{
                        remove: (event) => this.#resetFilter(event),
                      }}
                    >
                    </eox-itemfilter-chips>
                  </div>

                  ${when(
                    isFiltersDirty(this.filters),
                    () => html`
                      <span
                        class="chip-close"
                        @click=${() =>
                          this.dispatchEvent(new CustomEvent("reset"))}
                      ></span>
                    `,
                  )}
                </div>
                <div
                  class="input-container ${isFiltersDirty(this.filters)
                    ? "dirty-filter-input"
                    : ""}"
                >
                  <input
                    autocomplete="off"
                    id="eox-itemfilter-input-search"
                    type="text"
                    @click="${this.#handleToggleDropdown}"
                    @focus="${this.#handleShowDropdownOnFocus}"
                    @input="${this.#searchFilter}"
                    placeholder="Search and add filter"
                    aria-haspopup="true"
                    aria-expanded="${this.showDropdown}"
                  />
                </div>
              </div>
              <div popover="manual">
                <div
                  class="inline-content"
                  slot="content"
                  @keydown="${this.#handleKeyDown}"
                  @click="${this.#handleFormClick}"
                  @focus="${this.#handleFormClick}"
                >
                  <slot name="section"></slot>
                </div>
              </div>
            </div>
          `
        : html`<slot name="section"></slot>`}
    `;
  }
}

customElements.define("eox-itemfilter-container", EOxItemFilterContainer);
