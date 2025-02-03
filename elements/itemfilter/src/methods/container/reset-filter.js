/**
 * Resets a specific filter in the EOxItemFilterContainer based on the event target.
 *
 * @param {Event} event - The event that triggers the filter reset.
 * @param {Object} EOxItemFilterContainer - The EOxItemFilterContainer component instance.
 */
function resetFilterMethod(event, EOxItemFilterContainer) {
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  const filterKey = event.target.getAttribute("data-close").replace("|", "-");
  EOxItemFilterContainer.querySelector(`#filter-${filterKey}`).reset();
  EOxItemFilterContainer.dispatchEvent(new CustomEvent("filter"));
  EOxItemFilterContainer.requestUpdate();
}

export default resetFilterMethod;
