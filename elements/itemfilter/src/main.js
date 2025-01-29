import { LitElement, html, nothing } from "lit";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";
import { style } from "./style";
import { styleEOX } from "./style.eox";

import allStyle from "@eox/elements-utils/styles/dist/all.style";
import "./components/expand-container";
import "./components/itemfilter-container";
import "./components/filters/text";
import "./components/results";
import "./components/filters/selector";
import "./components/filters/range";
import "./components/filters/spatial";
import "./components/chips";
import { ELEMENT_CONFIG, ELEMENT_PROPERTIES } from "./enums";
import {
  filterApplyMethod,
  searchMethod,
  createFilterMethod,
  sortResultsMethod,
  createResetMethod,
  resetFilterMethod,
} from "./methods/itemfilter";
import _debounce from "lodash.debounce";
import {
  getTabIndex,
  isFiltersDirty,
  toggleAccordion,
} from "./helpers/index.js";

/**
 * EOxItemFilter is a custom web component that provides a comprehensive item filtering system.
 * It includes methods for applying filters, searching, sorting results, and resetting filters.
 * The component supports both inline and dropdown modes for filter display.
 *
 * @module EOxItemFilter
 * @extends {LitElement}
 */
export class EOxItemFilter extends LitElement {
  // Define properties with defaults and types
  static get properties() {
    return {
      items: { attribute: false, type: Object },
      results: { state: true, attribute: false, type: Object },
      filters: { state: true, attribute: false, type: Object },
      selectedResult: { attribute: false, type: Object },
      aggregateResults: { attribute: "aggregate-results", type: String },
      autoSpreadSingle: { attribute: "auto-spread-single", type: Boolean },
      enableHighlighting: { attribute: "enable-highlighting", type: Boolean },
      filterProperties: { attribute: false, type: Array },
      fuseConfig: { attribute: false, type: Object },
      inlineMode: { attribute: "inline-mode", type: Boolean },
      matchAllWhenEmpty: { attribute: "match-all-when-empty", type: Boolean },
      showResults: { attribute: "show-result", type: Boolean },
      idProperty: { attribute: "id-property", type: String },
      titleProperty: { attribute: "title-property", type: String },
      subTitleProperty: { attribute: "sub-title-property", type: String },
      imageProperty: { attribute: "image-property", type: String },
      expandMultipleFilters: {
        attribute: "enable-multiple-filter",
        type: Boolean,
      },
      expandResults: { attribute: "expand-result", type: Boolean },
      expandMultipleResults: {
        attribute: "expand-multiple-results",
        type: Boolean,
      },
      externalFilter: { attribute: false, type: Function },
      resultType: { attribute: "result-type", type: String },
      resultActionIcon: { attribute: false, type: String },
      unstyled: { type: Boolean },
    };
  }

  /**
   * @type Array<string>
   */
  #resultAggregation = [];

  /**
   * @type Array<object>
   */
  #items = [];

  /**
   * @type Object
   */
  #config = ELEMENT_CONFIG;

  constructor() {
    super();

    /** The items to be filtered
     * @type Array<Object>
     */
    this.items = null;

    /**
     * The state object containing the applied filters.
     * @type Object
     */
    this.filters = {};

    /**
     * The state object containing the filtered results.
     * @type Array<Object>
     */
    this.results = [];

    /**
     * The currently selected result
     * @type Object
     */
    this.selectedResult = null;

    /**
     * @type Function
     * @private
     */
    this.search = _debounce(this.searchHandler, 100, {
      leading: true,
    });

    /**
     * Aggregate results by a property key
     *
     * @type String
     */
    this.aggregateResults = undefined;

    /**
     * Automatically spread single item summaries
     * removing the summary header
     *
     * @type Boolean
     */
    this.autoSpreadSingle = false;

    /**
     * Highlighting of search result character matches
     *
     * @type Boolean
     */
    this.enableHighlighting = false;

    /**
     * Use an external search endpoint instead of fuse search.
     * Passed properties: input string, filters object
     *
     * @type Function
     */
    this.externalFilter = null;

    /**
     * The filter properties.
     * @type Array<{key?: String, keys?: Array<String>, title: String, type: String, placeholder?: String, format?: String, state?: Object}>
     */
    this.filterProperties = [];

    /**
     * Native fuse.js config override
     *
     * @type Object
     */
    this.fuseConfig = {};

    /**
     * Inline mode, for rendering the itemfilter in a very condensed space.
     * Expects showResults to be false
     *
     * @type Boolean
     */
    this.inlineMode = false;

    /**
     * Show all result items if nothing is input by the user
     *
     * @type Boolean
     */
    this.matchAllWhenEmpty = true;

    /**
     * Display results list
     *
     * @type Boolean
     */
    this.showResults = true;

    /**
     * The property of the result items used for display
     *
     * @type String
     */
    this.titleProperty = "title";

    /**
     * The property of the result items used for a subtitle
     *
     * @type String
     */
    this.subTitleProperty = undefined;

    /**
     * The property of the result items used for an image
     *
     * @type String
     */
    this.imageProperty = undefined;

    /**
     * Unique id property of items
     *
     * @type String
     */
    this.idProperty = "id";

    /**
     * Allow opening multiple filter accordions in parallel
     *
     * @type Boolean
     */
    this.expandMultipleFilters = true;

    /**
     * Initialize result accordions expanded
     *
     * @type Boolean
     */
    this.expandResults = true;
    /**
     * Allow opening multiple result accordions in parallel
     *
     * @type Boolean
     */
    this.expandMultipleResults = true;

    /**
     * Rendering type for results (can be `list`or `cards`)
     *
     * @type String
     */
    this.resultType = "list";

    /**
     * Icon for result action. Supports html.
     *
     * @type String
     */
    this.resultActionIcon = undefined;

    /**
     * Render the element without additional styles
     */
    this.unstyled = false;
  }

  /**
   * Applies the filters to the items and updates the result aggregation.
   */
  apply() {
    this.#resultAggregation = filterApplyMethod(
      this.#config,
      this.#items,
      this,
    );
    this.search();
  }

  /**
   * Performs a search based on the current configuration and items.
   * Requests an update after the search completes.
   */
  async searchHandler() {
    await searchMethod(this.#config, this.#items, this);
    /**
     * Fires when the filters are changed; event detail includes `filters` and `results`
     */
    this.dispatchEvent(
      new CustomEvent("filter", {
        detail: {
          results: this.results,
          filters: this.filters,
        },
        bubbles: true,
        composed: true,
      }),
    );
    if (this.inlineMode)
      this.renderRoot.querySelector("eox-itemfilter-container").updateInline();
    this.requestUpdate();
  }

  /**
   * Sorts the given items based on the current configuration.
   *
   * @param {Array<object>} items - The items to be sorted.
   * @returns {Array<object>} - The sorted items.
   */
  sortResults(items) {
    return sortResultsMethod(items, this.#config);
  }

  /**
   * Creates a filter element based on the given filter object and tab index.
   *
   * @param {Object} filterObject - The filter object.
   * @param {number} tabIndex - The tab index for the filter element.
   * @returns {import("lit")} - The template result for the filter element.
   * @private
   */
  #createFilter(filterObject, tabIndex) {
    return createFilterMethod(filterObject, tabIndex, this);
  }

  /**
   * Creates a reset element for the given filter object and tab index.
   *
   * @param {Object} filterObject - The filter object.
   * @param {number} tabIndex - The tab index for the reset element.
   * @returns {import("lit")} - The template result for the filter element.
   * @private
   */
  #createReset(filterObject, tabIndex) {
    return createResetMethod(filterObject, tabIndex, this);
  }

  /**
   * Resets all applied filters.
   */
  resetFilters() {
    resetFilterMethod(this);
  }

  /**
   * Lifecycle method called after the first update.
   * Initializes the configuration and items, and applies the filters.
   *
   * @param {Map} _changedProperties - The changed properties.
   */
  firstUpdated(_changedProperties) {
    let config = {};
    ELEMENT_PROPERTIES.map((property) => {
      config = {
        ...config,
        [property]: this[property],
      };
    });
    this.#config = config;
    this.#items =
      this.items?.map((i, index) =>
        Object.assign({ id: i[this.idProperty] || `item-${index}` }, i),
      ) || [];
    this.apply();
  }

  /**
   * Called when the element is updated.
   * Re-Initialize itemfilter when `config` and `items` changes.
   *
   * @param {Map} changedProperties - The properties that have changed.
   */
  updated(changedProperties) {
    ELEMENT_PROPERTIES.map((property) => {
      if (changedProperties.has(property)) {
        this.firstUpdated();
        return true;
      }
    });
  }

  /**
   * Updates selected result when result component triggers the "result" event.
   *
   * @param {{detail: Object}} evt - "result" event triggered by result component
   */
  updateResult(evt) {
    this.selectedResult = evt.detail;
    /**
     * Fires when a result is selected; event detail is `selectedResult`
     */
    this.dispatchEvent(
      new CustomEvent("select", {
        detail: this.selectedResult,
        bubbles: true,
        composed: true,
      }),
    );
    this.requestUpdate();
  }

  /**
   * Emits "result-action" event.
   *
   * @param {{detail: Object}} evt - "result-action" event triggered by result component
   */
  emitResultAction(evt) {
    /**
     * Fires when a result-action is clicked; event detail is `result`
     */
    this.dispatchEvent(
      new CustomEvent("result-action", {
        detail: evt.detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Renders the HTML template for the component.
   */
  render() {
    return html`
      <style>
        ${style}
        ${!this.unstyled && styleEOX}
        ${!this.unstyled && allStyle}
        ${this.styleOverride}
      </style>
      <form
        id="itemfilter"
        class=${this.inlineMode ? "inline" : nothing}
        @submit="${(evt) => evt.preventDefault()}"
      >
        ${when(
          this.filterProperties,
          () => html`
            <eox-itemfilter-container
              .filters=${this.filters}
              .filterProperties=${this.filterProperties}
              .inlineMode=${this.inlineMode || false}
              @reset=${() => this.resetFilters()}
              @filter=${() => this.search()}
            >
              <section slot="section">
                ${when(
                  !this.inlineMode,
                  () => html`
                    <slot name="filterstitle"
                      ><h6 class="main-heading">Filters</h6></slot
                    >
                  `,
                )}
                <ul id="filters">
                  ${map(
                    Object.values(this.filters),
                    (filterObject, index) =>
                      html` <li>
                        <eox-itemfilter-expandcontainer
                          .filterObject=${filterObject}
                          @details-toggled=${(e) =>
                            toggleAccordion(e, this.#config, this)}
                          data-details="${filterObject.key}"
                        >
                          ${this.#createReset(
                            filterObject,
                            getTabIndex(index, 1),
                          )}
                          ${this.#createFilter(
                            filterObject,
                            getTabIndex(index, 2),
                          )}
                        </eox-itemfilter-expandcontainer>
                      </li>`,
                  )}
                </ul>
                ${when(
                  !this.inlineMode &&
                    this.#config.filterProperties &&
                    !this.inlineMode &&
                    this.#config.filterProperties &&
                    isFiltersDirty(this.filters),
                  () => html`
                    <button
                      type="button"
                      id="filter-reset"
                      class="outline small icon-text reset-icon"
                      data-cy="filter-reset"
                      @click=${() => this.resetFilters()}
                    >
                      Reset all
                    </a>
                  `,
                )}
              </section>
            </eox-itemfilter-container>
          `,
        )}
        ${when(
          this.#config?.showResults && this.results,
          () => html`
            <eox-itemfilter-results
              .config=${this.#config}
              .results=${this.results}
              .filters=${this.filters}
              .resultAggregation=${this.#resultAggregation}
              .selectedResult=${this.selectedResult}
              .resultType=${this.resultType}
              .resultActionIcon=${this.resultActionIcon}
              @result=${this.updateResult}
              @result-action=${this.emitResultAction}
            >
              <slot name="resultstitle"
                ><h6 class="main-heading">Results</h6></slot
              >
            </eox-itemfilter-results>
          `,
        )}
      </form>
    `;
  }
}

customElements.define("eox-itemfilter", EOxItemFilter);
