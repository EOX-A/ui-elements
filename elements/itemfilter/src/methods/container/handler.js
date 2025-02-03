import resetSearchMethod from "./reset-search.js";

/**
 * Handles the click event on the form, stopping propagation if in inline mode.
 *
 * @param {Event} event - The click event.
 * @param {Object} EOxItemFilterContainer - The EOxItemFilterContainer component instance.
 */
export function handleFormClickMethod(event, EOxItemFilterContainer) {
  if (EOxItemFilterContainer.inlineMode) event.stopPropagation();
}

/**
 * Shows the dropdown when the component is focused, if in inline mode.
 *
 * @param {Object} EOxItemFilterContainer - The EOxItemFilterContainer component instance.
 */
export function handleShowDropdownOnFocusMethod(EOxItemFilterContainer) {
  if (EOxItemFilterContainer.inlineMode) {
    EOxItemFilterContainer.showDropdown = true;
  }
}

/**
 * Toggles the dropdown visibility when an event occurs, stopping propagation if in inline mode.
 *
 * @param {Event} event - The event that triggers the toggle.
 * @param {Object} EOxItemFilterContainer - The EOxItemFilterContainer component instance.
 */
export function handleToggleDropdownMethod(event, EOxItemFilterContainer) {
  if (EOxItemFilterContainer.inlineMode) {
    event.stopPropagation();
    EOxItemFilterContainer.showDropdown = true;
  }
}

/**
 * Handles the keydown event, resetting the search and hiding the dropdown if Escape is pressed in inline mode.
 *
 * @param {KeyboardEvent} event - The keydown event.
 * @param {Object} EOxItemFilterContainer - The EOxItemFilterContainer component instance.
 */
export function handleKeyDownMethod(event, EOxItemFilterContainer) {
  if (
    EOxItemFilterContainer.inlineMode &&
    event.key === "Escape" &&
    EOxItemFilterContainer.showDropdown
  ) {
    resetSearchMethod(EOxItemFilterContainer);
    EOxItemFilterContainer.showDropdown = false;
  }
}

/**
 * Handles clicks outside the component, resetting the search and hiding the dropdown if in inline mode.
 *
 * @param {Event} event - The click event.
 * @param {Object} EOxItemFilterContainer - The EOxItemFilterContainer component instance.
 */
export function handleClickOutsideMethod(event, EOxItemFilterContainer) {
  if (
    EOxItemFilterContainer.inlineMode &&
    event.target instanceof HTMLElement &&
    event.target.tagName !== "DROPDOWN-FORM" &&
    event.target.tagName !== "EOX-ITEMFILTER" &&
    EOxItemFilterContainer.showDropdown
  ) {
    resetSearchMethod(EOxItemFilterContainer);
    EOxItemFilterContainer.showDropdown = false;
  }
}
