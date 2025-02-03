import Fuse from "fuse.js";

/**
 * Filters the items in the EOxItemFilterContainer based on the search input.
 *
 * @param {Event} event - The input event that triggers the search.
 * @param {Object} EOxItemFilterContainer - The EOxItemFilterContainer component instance.
 */
function searchFilterMethod(event, EOxItemFilterContainer) {
  // Create a Fuse instance for fuzzy searching with the filter properties
  const fuse = new Fuse(EOxItemFilterContainer.filterProperties, {
    keys: ["title"],
  });
  if (!(event.target instanceof HTMLInputElement)) {
    return;
  }
  const inputText = event.target.value;
  const result = fuse.search(inputText);
  const matches = result.map((res) => res.item.key || res.item.keys.join("|"));

  // Update the display of filter elements based on the search results
  Object.keys(EOxItemFilterContainer.filters).forEach((filter) => {
    EOxItemFilterContainer.querySelector(
      `[data-details="${filter}"]`,
    ).parentElement.style.display =
      matches.includes(filter) || !inputText ? "" : "none";
  });
}

export default searchFilterMethod;
