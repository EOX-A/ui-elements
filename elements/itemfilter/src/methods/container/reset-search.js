import searchFilterMethod from "./search-filter.js";

/**
 * Resets the search input in the EOxItemFilterContainer and triggers a search filter update.
 *
 * @param {Object} EOxItemFilterContainer - The EOxItemFilterContainer component instance.
 */
function resetSearchMethod(EOxItemFilterContainer) {
  EOxItemFilterContainer.renderRoot.querySelector(
    "#eox-itemfilter-input-search",
  ).value = "";
  const event = { target: { value: "" } };
  searchFilterMethod(
    /** @type {Event} **/ (/** @type {unknown} **/ (event)),
    EOxItemFilterContainer,
  );
}

export default resetSearchMethod;
