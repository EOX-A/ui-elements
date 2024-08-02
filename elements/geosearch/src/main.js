import { LitElement, html } from "lit";
import proj4 from "proj4";
import _debounce from "lodash.debounce";

import mainStyle from "../../../utils/styles/dist/main.style";
import buttonStyle from "../../../utils/styles/dist/button.style";
import { styleEOX } from "./style.eox";

import { getElement } from "../../../utils/getElement";

class EOxGeoSearch extends LitElement {
  static get properties() {
    return {
      /**
       * Internal storage of OpenCage API data after a successful API request.
       * @private
       */
      _data: { attribute: false },
      /**
       * Whether or not the list dropdown is visible.
       * @private
       */
      _isListVisible: { attribute: false },
      /**
       * Whether or not the input field is visible.
       * @private
       */
      _isInputVisible: { attribute: false },
      /**
       * The search query, which is bound to the input field.
       * @private
       */
      _query: { attribute: false },
      /**
       * The OpenCage API endpoint to use for the search, including the key but without the query parameter.
       *
       */
      endpoint: { type: String },
      /**
       * Selector for the eox-map instance
       */
      for: {
        type: String,
      },
      /**
       * The name of the query parameter to use for the search query in the endpoint URI.
       *
       */
      queryParameter: { type: String, default: "q" },
      /**
       * Whether or not to enable button mode, which hides and shows the input field
       * similar to how a modal works.
       *
       */
      button: { type: Boolean },
      /**
       * Set a custom interval for the debounce function.
       *
       */
      interval: { type: Number, default: 800 },
      /**
       * Enables a smaller version of the button for use in map controls.
       *
       */
      small: { type: Boolean },
      /**
       * Which text to use for the button if it is enabled.
       *
       */
      label: { type: String },
      /**
       * The direction of the search input relative to the button, with the following options:
       *
       * - `left`
       * - `top`
       * - `right`
       * - `bottom`
       *
       */
      direction: {
        type: String,
        attribute: "list-direction",
      },
      /**
       * The direction of the results box relative to the input, with the following options:
       *
       * - `left`
       * - `top`
       * - `right`
       * - `bottom`
       *
       */
      resultsDirection: {
        type: String,
        attribute: "results-direction",
      },
      unstyled: { type: Boolean },
    };
  }

  /**
   * @type import("../../map/main").EOxMap
   */
  #eoxMap;

  constructor() {
    super();

    this._data = [];
    this._isListVisible = false;
    this._isInputVisible = false;
    this._query = "";
    /**
     * The query selector for the map
     * @default eox-map
     */
    this.for = "eox-map";
    this.listDirection = "right";
    this.resultsDirection = "down";
    this.interval = 800;

    this.fetchDebounced = _debounce(async () => {
      if (this._query.length <= 2) return;
      try {
        const uri = `${this.endpoint}${
          this.endpoint.includes("?") ? "&" : "?"
        }${this.queryParameter ?? "q"}=${this._query}`;
        const response = await fetch(encodeURI(uri));
        const json = await response.json();
        this._data = json.results;
      } catch (error) {
        console.log("Error setting up or requesting from geosearch endpoint");
      }
    }, this.interval);
  }

  async onInput(e) {
    this._query = e.target.value;
    if (this._query.length == 0) {
      this._isListVisible = false;
      return;
    } else {
      this._isListVisible = true;
    }
    this.fetchDebounced();
  }

  onInputBlur() {
    this._isInputVisible = false;
    this._isListVisible = false;
    this._query = "";
  }

  onButtonClick() {
    this._isInputVisible = !this._isInputVisible;

    // Auto-focus the input field when it becomes visible
    if (this._isInputVisible) {
      setTimeout(() => this.renderRoot.querySelector("#gazetteer").focus());
    }
  }

  getFlexDirection() {
    return this.direction === "up"
      ? "column-reverse"
      : this.direction === "left"
      ? "row-reverse"
      : this.direction === "down"
      ? "column"
      : this.direction === "right"
      ? "row"
      : "row";
  }

  getResultsDirection() {
    return this.resultsDirection === "up"
      ? "column-reverse"
      : this.resultsDirection === "left"
      ? "row-reverse"
      : this.resultsDirection === "down"
      ? "column"
      : this.resultsDirection === "right"
      ? "row"
      : "row";
  }

  getVerticalAlign() {
    return this.resultsDirection === "up" ? "end" : "start";
  }

  getMarginDirection(direction) {
    return direction === "up"
      ? "top"
      : direction === "left"
      ? "left"
      : direction === "down"
      ? "bottom"
      : direction === "right"
      ? "right"
      : "row";
  }

  handleSelect(event) {
    this._isInputVisible = false;
    this._isListVisible = false;
    this._query = "";

    /**
     * This for now only supports OpenCage
     */
    const viewProjection = this.eoxMap.map.getView().getProjection().getCode();

    let sw = proj4("EPSG:4326", viewProjection, [
      event.bounds.southwest.lng,
      event.bounds.southwest.lat,
    ]);
    let ne = proj4("EPSG:4326", viewProjection, [
      event.bounds.northeast.lng,
      event.bounds.northeast.lat,
    ]);
    const zoomExtent = [sw[0], sw[1], ne[0], ne[1]];

    this.eoxMap.zoomExtent = zoomExtent;

    console.log(`Zooming to extent: ${zoomExtent}`);
    console.log(JSON.stringify(this.eoxMap));

    /**
     * The select event, including the details of the selected item
     */
    this.dispatchEvent(new CustomEvent("geosearchSelect", event));
  }

  updateMap() {
    const foundElement = getElement(this.for);

    if (foundElement) {
      const EoxMap = /** @type {import("@eox/map/main").EOxMap} */ (foundElement);
      this.eoxMap = foundElement;
      console.log(this.eoxMap);
    } else {
      console.error("No eox-map element found");
    }
  }

  /**
   * initializes the EOxMap instance
   * And stores it in the private property #eoxMap.
   */
  firstUpdated() {
    this.updateMap();
  }

  updated(changedProperties) {
    if (changedProperties.has('for')) {
      this.updateMap();
      console.log('new map', this.eoxMap);
    }
  }

  get eoxMap() {
    return this.#eoxMap;
  }

  set eoxMap(value) {
    const oldValue = this.#eoxMap;
    this.#eoxMap = value;
    this.requestUpdate('eoxMap', oldValue);
  }

  render() {
    return html`
      <style>
        .hidden {
          display: none;
        }
        ${!this.unstyled && mainStyle}
        ${!this.unstyled && buttonStyle}
        ${!this.unstyled && styleEOX}
      </style>
      <div
        class="geosearch ${this.small ? "small" : ""}"
        style="
            flex-direction: ${this.getFlexDirection()};
            align-items: ${this.getVerticalAlign()};
        "
      >
        <button
          class="${this.button ? "" : "hidden"} ${this._isInputVisible
            ? "active"
            : ""}"
          style="
            margin-${this.getMarginDirection(this.direction)}: 12px;
            flex-direction: ${this.getFlexDirection()};
          "
          @click="${this.onButtonClick}"
        >
          <span class="icon"></span>
          <span
            class="chevron ${this.direction ?? "right"} ${this._isInputVisible
              ? "active"
              : ""}"
          ></span>
          <span
            style="display: ${this.small && !this.unstyled ? "none" : "flex"}"
            >${(this.label || this.unstyled) ?? "Search"}</span
          >
        </button>
        <div
          class="search-container ${this.button
            ? this._isInputVisible
              ? ""
              : "hidden"
            : ""}"
          style="flex-direction: ${this.getResultsDirection()};"
        >
          <input
            id="gazetteer"
            type="text"
            placeholder="Type to search"
            .value="${this._query}"
            style="margin-${this.getMarginDirection(
              this.resultsDirection
            )}: ${this._isListVisible ? 12 : 0}px"
            @input="${this.onInput}"
          />
          <ul class="results-container ${this._isListVisible ? "" : "hidden"}">
            ${this._query.length <= 2
              ? html`<span class="hint"
                  >Enter at least two characters to search</span
                >`
              : html``}
            ${this._query.length >= 2
              ? this._data.map(
                  (item) => html`
                    <eox-geosearch-item
                      .item="${item}"
                      .onClick="${(e) => {
                        this.handleSelect(e);
                      }}"
                      .unstyled=${this.unstyled}
                    />
                  `
                )
              : html``}
          </ul>
        </div>
      </div>
    `;
  }

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    super.disconnectedCallback();
  }
}

class EOxGeoSearchItem extends LitElement {
  static get properties() {
    return {
      item: { type: Object },
      onClick: { type: Function },
      unstyled: { type: Boolean },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        ${!this.unstyled && mainStyle}
        ${!this.unstyled && styleEOX}
      </style>
      <li class="search-result" @click="${() => this.onClick(this.item)}">
        <span class="name">${this.item.formatted}</span>
      </li>
    `;
  }
}

customElements.define("eox-geosearch", EOxGeoSearch);
customElements.define("eox-geosearch-item", EOxGeoSearchItem);

export { EOxGeoSearch };
