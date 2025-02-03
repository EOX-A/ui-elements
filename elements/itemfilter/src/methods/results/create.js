import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { when } from "lit/directives/when.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getValue } from "../../helpers";

/**
 * Creates the item details view for the aggregation property in the EOxItemFilterResults component.
 *
 * @param {string} aggregationProperty - The property used for aggregation.
 * @param {Object} EOxItemFilterResults - The EOxItemFilterResults component instance.
 * @returns {import("lit").HTMLTemplateResult} The HTML template for the item details view.
 */
export function createItemDetailsMethod(
  aggregationProperty,
  EOxItemFilterResults,
) {
  return html`
    <details
      class="details-results"
      @toggle=${EOxItemFilterResults.handleAccordion}
      ?open=${EOxItemFilterResults.config.expandResults || nothing}
    >
      <summary>
        <span class="title">
          ${aggregationProperty}
          <span class="count"
            >${EOxItemFilterResults.aggregateResults(
              EOxItemFilterResults.results,
              aggregationProperty,
            ).length}</span
          >
        </span>
      </summary>
      <div>
        ${createItemListMethod(EOxItemFilterResults, aggregationProperty)}
      </div>
    </details>
  `;
}

/**
 * Creates the item list view for the aggregation property in the EOxItemFilterResults component.
 *
 * @param {Object} EOxItemFilterResults - The EOxItemFilterResults component instance.
 * @param {string} [aggregationProperty] - The property used for aggregation.
 * @returns {import("lit").HTMLTemplateResult} The HTML template for the item list view.
 */
export function createItemListMethod(
  EOxItemFilterResults,
  aggregationProperty,
) {
  const results = EOxItemFilterResults.results;
  const items = aggregationProperty
    ? EOxItemFilterResults.aggregateResults(results, aggregationProperty)
    : results;

  const config = EOxItemFilterResults.config;

  const className = (item) =>
    EOxItemFilterResults.selectedResult?.[config.idProperty] ===
    item[config.idProperty]
      ? "highlighted"
      : nothing;

  return html`
    <ul class=${EOxItemFilterResults.resultType}>
      ${repeat(
        items,
        (item) => item.id,
        (item) => html`
          <li
            class=${className(item)}
            @click=${() => {
              if (EOxItemFilterResults.selectedResult === item) {
                EOxItemFilterResults.selectedResult = null;
              } else {
                EOxItemFilterResults.selectedResult = item;
              }
              EOxItemFilterResults.dispatchEvent(
                new CustomEvent("result", {
                  detail: EOxItemFilterResults.selectedResult,
                }),
              );
            }}
          >
            <span id="${item.id}">
              ${when(
                config.subTitleProperty || config.imageProperty,
                () => html`
                  ${getValue(config.imageProperty, item)
                    ? html`
                        <img
                          class="image"
                          src="${getValue(config.imageProperty, item)}"
                        />
                      `
                    : html`
                        <svg
                          class="image"
                          width="800"
                          height="600"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="800"
                            height="600"
                            fill="var(--primary-color)"
                          />
                        </svg>
                      `}
                  <div class="title-container">
                    <span class="title"
                      >${unsafeHTML(item[config.titleProperty])}</span
                    >
                    <span class="subtitle"
                      >${unsafeHTML(item[config.subTitleProperty])}</span
                    >
                  </div>
                `,
                () => html`
                  <span class="title"
                    >${unsafeHTML(item[config.titleProperty])}</span
                  >
                `,
              )}
            </span>
          </li>
        `,
      )}
    </ul>
  `;
}
