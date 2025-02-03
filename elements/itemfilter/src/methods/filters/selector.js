import { resetFilter } from "../../helpers/index.js";
import Fuse from "fuse.js";

/**
 * Resets the selector filter to its default state and updates the component.
 *
 * @param {Object} EOxItemFilterSelector - The EOxItemFilterSelector component instance.
 */
export function resetSelectorMethod(EOxItemFilterSelector) {
  removeItemSelectorMethod(-1, EOxItemFilterSelector);

  resetFilter(EOxItemFilterSelector.filterObject);
  EOxItemFilterSelector.requestUpdate();
}

/**
 * Removes an item from the selected items list and updates suggestions and filter list.
 *
 * @param {number} index - The index of the item to remove, or -1 to remove all items.
 * @param {Object} EOxItemFilterSelector - The EOxItemFilterSelector component instance.
 */
export function removeItemSelectorMethod(index, EOxItemFilterSelector) {
  EOxItemFilterSelector.selectedItems =
    index === -1
      ? []
      : EOxItemFilterSelector.selectedItems.filter((_, i) => i !== index);

  updateSuggestions(EOxItemFilterSelector);
  updateFilterList(EOxItemFilterSelector);
}

/**
 * Toggles the selection of an item and updates the component.
 *
 * @param {Object} item - The item to toggle.
 * @param {Object} EOxItemFilterSelector - The EOxItemFilterSelector component instance.
 */
export function toggleItemSelectorMethod(item, EOxItemFilterSelector) {
  const itemIndex = EOxItemFilterSelector.selectedItems.indexOf(item);
  if (itemIndex >= 0) {
    // Remove the item if it's already selected
    EOxItemFilterSelector.selectedItems =
      EOxItemFilterSelector.selectedItems.filter((_, i) => i !== itemIndex);
  } else {
    // Add the item if it's not selected
    if (EOxItemFilterSelector.type === "multiselect") {
      EOxItemFilterSelector.selectedItems = [
        ...EOxItemFilterSelector.selectedItems,
        item,
      ];
    } else {
      EOxItemFilterSelector.selectedItems = [item];
      EOxItemFilterSelector.showSuggestions = false;
    }
  }
  // EOxItemFilterSelector.query = "";

  // Update suggestions and filter list
  updateSuggestions(EOxItemFilterSelector);
  updateFilterList(EOxItemFilterSelector);
}

/**
 * Handles input changes for the selector and updates the query and suggestions.
 *
 * @param {Event} event - The input event.
 * @param {Object} EOxItemFilterSelector - The EOxItemFilterSelector component instance.
 */
export function handleInputSelectorMethod(event, EOxItemFilterSelector) {
  if (!(event.target instanceof HTMLInputElement)) {
    return;
  }
  EOxItemFilterSelector.query = event.target.value;
  EOxItemFilterSelector.showSuggestions = true;
}

/**
 * Handles keydown events for the selector and navigates or selects items based on the key pressed.
 *
 * @param {KeyboardEvent} event - The keydown event.
 * @param {Object} EOxItemFilterSelector - The EOxItemFilterSelector component instance.
 */
export function handleKeyDownSelectorMethod(event, EOxItemFilterSelector) {
  switch (event.key) {
    case "ArrowDown":
      // Navigate down the suggestions list
      EOxItemFilterSelector.highlightedIndex = Math.min(
        EOxItemFilterSelector.highlightedIndex + 1,
        EOxItemFilterSelector.filteredSuggestions.length - 1,
      );
      break;

    case "ArrowUp":
      // Navigate up the suggestions list
      EOxItemFilterSelector.highlightedIndex = Math.max(
        EOxItemFilterSelector.highlightedIndex - 1,
        0,
      );
      break;

    case "Enter":
      // Select the highlighted item
      if (EOxItemFilterSelector.highlightedIndex >= 0)
        toggleItemSelectorMethod(
          EOxItemFilterSelector.filteredSuggestions[
            EOxItemFilterSelector.highlightedIndex
          ],
          EOxItemFilterSelector,
        );
      break;

    case "Escape":
      // Hide suggestions
      EOxItemFilterSelector.showSuggestions = false;
      break;
  }
}

/**
 * Updates the Fuse.js instance and suggestions when properties change.
 *
 * @param {Object} changedProperties - The properties that changed.
 * @param {Object} EOxItemFilterSelector - The EOxItemFilterSelector component instance.
 */
export function updatedSelectorMethod(
  changedProperties,
  EOxItemFilterSelector,
) {
  if (changedProperties.has("suggestions") || changedProperties.has("query")) {
    updateSuggestions(EOxItemFilterSelector);
  }
}

/**
 * Sorts and returns the suggestions based on the filter's sort method or default string comparison.
 *
 * @param {Object} EOxItemFilterSelector - The EOxItemFilterSelector component instance.
 * @param {Array<Object>} suggestion - The suggestions to sort.
 * @returns {Array<Object>} The sorted suggestions.
 */
function getSortedSuggestions(EOxItemFilterSelector, suggestion) {
  const sortCallback =
    EOxItemFilterSelector.filterObject?.sort || ((a, b) => a.localeCompare(b));

  return suggestion.sort(sortCallback).map((i) => i);
}

/**
 * Updates the filtered suggestions based on the current query.
 *
 * @param {Object} EOxItemFilterSelector - The EOxItemFilterSelector component instance.
 */
function updateSuggestions(EOxItemFilterSelector) {
  let filteredSuggestion;
  if (EOxItemFilterSelector.query) {
    const fuse = new Fuse(EOxItemFilterSelector.suggestions, {
      threshold: 0.4,
    });
    filteredSuggestion = fuse
      .search(EOxItemFilterSelector.query)
      .map((result) => result.item);
  }
  EOxItemFilterSelector.filteredSuggestions = getSortedSuggestions(
    EOxItemFilterSelector,
    filteredSuggestion || EOxItemFilterSelector.suggestions,
  );

  // if `filterKeys` is defined, force filter keys
  if (EOxItemFilterSelector.filterObject?.filterKeys) {
    EOxItemFilterSelector.filteredSuggestions =
      EOxItemFilterSelector.filterObject?.filterKeys.map((k) => `${k}`);
    EOxItemFilterSelector.filterObject.state =
      EOxItemFilterSelector.filterObject?.filterKeys
        .map((k) => `${k}`)
        .reduce((acc, curr) => {
          if (!(curr in acc)) {
            acc[curr] = undefined;
          }
          return acc;
        }, EOxItemFilterSelector.filterObject.state);
  }

  EOxItemFilterSelector.highlightedIndex = -1;
}

/**
 * Updates the filter list based on the selected items.
 *
 * @param {Object} EOxItemFilterSelector - The EOxItemFilterSelector component instance.
 */
function updateFilterList(EOxItemFilterSelector) {
  // Update the state of the filter object based on the selected items
  Object.keys(EOxItemFilterSelector.filterObject.state).forEach((k) => {
    EOxItemFilterSelector.filterObject.state[k] =
      EOxItemFilterSelector.selectedItems.includes(k);
  });

  // Update the stringified state of the filter object
  EOxItemFilterSelector.filterObject.stringifiedState =
    Object.keys(EOxItemFilterSelector.filterObject.state)
      .filter((k) => EOxItemFilterSelector.filterObject.state[k])
      .join(", ") || "";

  // Mark the filter as dirty if there are selected items
  EOxItemFilterSelector.filterObject.dirty = Boolean(
    EOxItemFilterSelector.filterObject.stringifiedState.length > 0,
  );

  // Dispatch a custom event named "filter" and request an update
  EOxItemFilterSelector.dispatchEvent(new CustomEvent("filter"));
  EOxItemFilterSelector.requestUpdate();
}
