/**
 * Handles the toggle event for the accordion.
 *
 * @param {CustomEvent} event - The toggle event.
 * @param {Object} config - The configuration object for item-filter.
 * @param {Element} that
 */
function toggleAccordion(event, config, that) {
  let detailsElement;

  if (event.detail) {
    detailsElement = event.detail.target;
  } else {
    detailsElement = event.target;
  }

  if (detailsElement?.classList.contains("details-filter")) {
    if (!detailsElement.open || config?.expandMultipleFilters) return;

    that.shadowRoot
      .querySelectorAll("eox-itemfilter-expandcontainer")
      .forEach((container) => {
        const details = container.shadowRoot.querySelector(".details-filter");
        if (details && details !== detailsElement) {
          details.removeAttribute("open");
        }
      });
  } else {
    if (!detailsElement?.open || config?.expandMultipleResults) return;

    that.querySelectorAll("details").forEach((details) => {
      if (details !== detailsElement) {
        details.removeAttribute("open");
      }
    });
  }
}

export default toggleAccordion;
