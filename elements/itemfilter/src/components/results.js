import { LitElement, html, nothing } from "lit";
import { when } from "lit/directives/when.js";
import { map } from "lit/directives/map.js";
import {
  aggregateResultsMethod,
  createItemDetailsMethod,
  createItemListMethod,
} from "../methods/results/index.js";
import { toggleAccordion } from "../helpers";

/**
 * EOxItemFilterResults is a custom web component that displays the results of item filtering.
 * It uses the LitElement base class and integrates with external methods for aggregating results
 * and creating item details and lists.
 *
 * @module EOxItemFilterResults
 * @extends LitElement
 * @property {Object} config - The configuration object for the results display.
 * @property {Object} results - The state object containing the filter results.
 * @property {Object} filters - The state object containing the applied filters.
 * @property {Array} resultAggregation - The array of properties used for result aggregation.
 * @property {Object} selectedResult - Property with pre-selected result
 */
export class EOxItemFilterResults extends LitElement {
  // Define properties with defaults and types
  static get properties() {
    return {
      config: { attribute: false, type: Object },
      results: { state: true, type: Array },
      filters: { state: true, type: Object },
      resultAggregation: { attribute: false, type: Array },
      selectedResult: { state: true, type: Object },
      resultType: { attribute: "result-type", type: String },
    };
  }

  constructor() {
    super();

    /**
     * @type Object
     */
    this.config = null;

    /**
     * @type Array
     */
    this.results = null;

    /**
     * @type Object
     */
    this.filters = {};

    /**
     * @type Array
     */
    this.resultAggregation = [];

    /**
     * @type Object
     */
    this.selectedResult = null;

    /**
     * @type String("list"|"card")
     */
    this.resultType = "list";
  }

  /**
   * Creates a list of items based on the aggregation property.
   *
   * @param {string} [aggregationProperty] - The property used for aggregation.
   * @returns {import("lit").HTMLTemplateResult} - The template result for the item list.
   */
  #createItemList(aggregationProperty) {
    return createItemListMethod(this, aggregationProperty);
  }

  /**
   * Creates item details based on the aggregation property.
   *
   * @param {string} aggregationProperty - The property used for aggregation.
   * @returns {import("lit").HTMLTemplateResult} - The template result for the item details.
   */
  #createItemDetails(aggregationProperty) {
    return createItemDetailsMethod(aggregationProperty, this);
  }

  /**
   * Aggregates results based on the specified property.
   *
   * @param {Array} items - The array of items to be aggregated.
   * @param {string} property - The property used for aggregation.
   * @returns {Array} - The aggregated results.
   */
  aggregateResults(items, property) {
    return aggregateResultsMethod(items, property, this);
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
   * Handles the toggle event for accordion.
   *
   * @param {CustomEvent} event - The toggle event.
   */
  handleAccordion(event) {
    toggleAccordion(event, this.config, this);
  }

  /**
   * Renders the HTML template for the component.
   */
  render() {
    return html`
      <section id="section-results">
        <div slot="resultstitle"></div>
        <div id="container-results" class="scroll">
          ${when(
            this.results.length < 1,
            () => html`<small class="no-results">No matching items</small>`,
            () => nothing,
          )}
          <ul id="results" part="results">
            ${when(
              this.config.aggregateResults,
              () =>
                map(
                  this.resultAggregation.filter(
                    (aggregationProperty) =>
                      this.aggregateResults(this.results, aggregationProperty)
                        .length,
                  ),
                  (aggregationProperty) =>
                    html`${when(
                      this.aggregateResults(this.results, aggregationProperty)
                        .length === 1 && this.config.autoSpreadSingle,
                      () =>
                        html`<div style="margin-left: -8px">
                          ${this.#createItemList(aggregationProperty)}
                        </div>`,
                      () => this.#createItemDetails(aggregationProperty),
                    )}`,
                ),
              () => this.#createItemList(),
            )}
          </ul>
        </div>
      </section>
    `;
  }
}

customElements.define("eox-itemfilter-results", EOxItemFilterResults);
