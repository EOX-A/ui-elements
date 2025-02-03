import { html, nothing } from "lit";
import { when } from "lit/directives/when.js";

/**
 * Creates a reset button for the filter object if it is dirty.
 *
 * @param {Object} filterObject - The filter object containing filter details.
 * @param {number} tabIndex - The tab index for the reset button.
 * @param {Object} EOxItemFilter - The EOxItemFilter component instance.
 * @returns {import("lit").HTMLTemplateResult} The HTML template for the reset button.
 */
function createResetMethod(filterObject, tabIndex, EOxItemFilter) {
  return html`
    ${when(
      filterObject.dirty,
      () => html`
        <button
          type="button"
          tabindex=${tabIndex}
          slot="reset-button"
          class="reset-icon icon"
          @click=${(e) => {
            const filterElement =
              e.target.parentElement.querySelector("[slot=filter]");
            if (filterElement && typeof filterElement.reset === "function") {
              filterElement.reset();
            }
            EOxItemFilter.search();
            EOxItemFilter.requestUpdate();
          }}
        >
          ${EOxItemFilter.unstyled ? "Reset" : nothing}
        </button>
      `,
    )}
  `;
}

export default createResetMethod;
