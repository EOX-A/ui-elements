import { html } from "lit";
import uniq from "lodash.uniq";
import flatMap from "lodash.flatmap";

/**
 * Creates a filter element based on the filter object type.
 *
 * @param {Object} filterObject - The filter object containing filter details.
 * @param {number} tabIndex - The tab index for the filter element.
 * @param {Object} EOxItemFilter - The EOxItemFilter component instance.
 * @returns {import("lit").HTMLTemplateResult} The HTML template for the filter element.
 */
function createFilterMethod(filterObject, tabIndex, EOxItemFilter) {
  // Create a unique ID for the filter element by replacing '|' with '-'
  const filterId = `filter-${filterObject.key}`.replace("|", "-");

  // Generate the appropriate filter element based on the filter type
  switch (filterObject.type) {
    case "text":
      // Return a text filter element
      return html`<eox-itemfilter-text
        data-type="filter"
        data-cy="text-filter"
        slot="filter"
        id="${filterId}"
        .tabIndex=${tabIndex}
        .filterObject=${filterObject}
        .unstyled=${EOxItemFilter.unstyled}
        @filter=${() => EOxItemFilter.search()}
      ></eox-itemfilter-text>`;

    case "multiselect":
    case "select":
      // Return a select or multiselect filter element
      return html`
        <eox-itemfilter-select
          .inlineMode=${EOxItemFilter.inlineMode || false}
          data-type="filter"
          id="${filterId}"
          .tabIndex=${tabIndex}
          .filterObject=${filterObject}
          slot="filter"
          .suggestions="${uniq(
            flatMap(EOxItemFilter.items, filterObject.key),
          ).filter((i) => i)}"
          type="${filterObject.type}"
          .unstyled=${EOxItemFilter.unstyled}
          @filter=${() => EOxItemFilter.search()}
        ></eox-itemfilter-select>
      `;
    case "range":
      // Return a range filter element
      return html`
        <eox-itemfilter-range
          id="${filterId}"
          data-type="filter"
          .tabIndex=${tabIndex}
          .filterObject=${filterObject}
          slot="filter"
          .unstyled=${EOxItemFilter.unstyled}
          @filter=${() => EOxItemFilter.search()}
        ></eox-itemfilter-range>
      `;
    case "spatial":
      // Return a spatial filter element
      return html`
        <eox-itemfilter-spatial
          id="${filterId}"
          data-type="filter"
          .tabIndex=${tabIndex}
          .filterObject=${filterObject}
          slot="filter"
          @filter=${() => EOxItemFilter.search()}
        ></eox-itemfilter-spatial>
      `;

    default:
      // Return an empty template for unknown filter types
      return html``;
  }
}

export default createFilterMethod;
