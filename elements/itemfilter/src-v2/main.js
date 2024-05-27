import { LitElement, html } from "lit";
import { map } from "lit/directives/map.js";
import { style } from "./style";
import { styleEOX } from "./style.eox";

import allStyle from "../../../utils/styles/dist/all.style";

import uniq from "lodash.uniq";
import flatMap from "lodash.flatmap";
import "./components/expand-container";

export class EOxItemFilter extends LitElement {
  // Define properties with defaults and types
  static get properties() {
    return {
      config: { attribute: false, type: Object },
      items: { attribute: false, type: Object },
    };
  }

  constructor() {
    super();
    this.config = null;
    this.items = null;
  }

  createFilter(filter) {
    switch (filter.type) {
      case "text":
        return html`<input
          type="text"
          slot="filter"
          placeholder="${filter.placeholder}"
          value=""
        />`;
      case "multiselect":
        const result = uniq(flatMap(this.items, filter.key));
        return html`
          <ul slot="filter">
            ${map(
              result,
              (item) => html`
                <li
                  data-identifier="${item.toLowerCase()}"
                  data-title="${item}"
                >
                  <label>
                    <input type="checkbox" />
                    <span class="title">${item}</span>
                  </label>
                </li>
              `
            )}
          </ul>
        `;
      default:
        return html``;
    }
  }

  render() {
    console.log(this.config?.filterProperties);
    return html`
      <style>
        ${style}
        ${!this.unstyled && styleEOX}
        ${!this.unstyled && allStyle}
        ${this.styleOverride}
      </style>
      <form id="itemfilter" @submit="${(evt) => evt.preventDefault()}">
        ${map(
          this.config?.filterProperties || [],
          (filter) => html` <itemfilter-expandcontainer .filterObject=${filter}
            >${this.createFilter(filter)}
          </itemfilter-expandcontainer>`
        )}
      </form>
    `;
  }
}

customElements.define("eox-itemfilter-v2", EOxItemFilter);
