import { LitElement, html, nothing } from "lit";
import { styleEOX } from "../style.eox";

export class EOxItemFilterExpandContainer extends LitElement {
  static get properties() {
    return {
      filterObject: { attribute: false, type: Object },
      unstyled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.filterObject = {};
    this.unstyled = false;
  }

  handleDetailsToggle(event) {
    this.dispatchEvent(
      new CustomEvent("details-toggled", {
        detail: event,
        bubbles: true,
        composed: true,
      })
    );
  }

  // _resetFilter() {
  //   const filterEl = this.querySelector(`[slot='filter']`) as Element & {
  //     reset: () => void;
  //   };
  //   filterEl.reset();
  // }

  render() {
    return html`
      <style>
        ${!this.unstyled && styleEOX}
      </style>
      <details
        @toggle="${this.handleDetailsToggle}"
        class="details-filter"
        ?open=${this.filterObject.expanded || nothing}
      >
        <summary>
          <span
            class="title"
            style="${!this.filterObject.title && "text-transform: capitalize"}"
          >
            ${this.filterObject.title || this.filterObject.key || "Filter"}
            <slot name="reset-button"></slot>
          </span>
        </summary>
        <div class="scroll">
          <slot name="filter"></slot>
        </div>
      </details>
    `;
  }
}

customElements.define(
  "itemfilter-expandcontainer",
  EOxItemFilterExpandContainer
);
