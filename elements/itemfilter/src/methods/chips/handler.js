/**
 * Handles the click event on a chip, highlighting the clicked chip and updating the component.
 *
 * @param {Event} evt - The click event.
 * @param {Object} EOxItemFilterChips - The EOxItemFilterChips component instance.
 */
export function handleChipClickMethod(evt, EOxItemFilterChips) {
  // Remove the 'highlighted' class from all chips
  EOxItemFilterChips.renderRoot.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.remove("highlighted");
  });
  // Add the 'highlighted' class to the clicked chip
  if (evt.target instanceof HTMLElement) {
    evt.target.classList.add("highlighted");
  }
  EOxItemFilterChips.requestUpdate();
}

/**
 * Handles the close event on a chip, removing the chip from the controller.
 *
 * @param {Event} event - The close event.
 * @param {number} index - The index of the chip to be removed.
 * @param {Object} EOxItemFilterChips - The EOxItemFilterChips component instance.
 */
export function handleCloseMethod(event, index, EOxItemFilterChips) {
  // Remove the chip from the controller
  EOxItemFilterChips.controller.remove(event, index);
}

/**
 * Handles keyboard events for the EOxItemFilterChips component.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {Object} EOxItemFilterChips - The EOxItemFilterChips component instance.
 */
export function keyboardEventListenerMethod(event, EOxItemFilterChips) {
  const { code, target } = event;

  // Ignore the events that don't come from search input
  if (
    target instanceof HTMLElement &&
    target.id !== "eox-itemfilter-input-search"
  )
    return;

  // If the parent element is hidden and the key is one of the specified keys, do nothing
  if (
    EOxItemFilterChips.parentElement.classList.contains("hidden") &&
    ["ArrowLeft", "ArrowRight", "Backspace"].includes(code)
  )
    return;

  // Prevent default action for the Space key
  if (code === "Space") event.preventDefault();

  // Stop propagation for keys other than Escape, Space, and Enter
  if (!["Escape", "Space", "Enter"].includes(code)) event.stopPropagation();

  // Handle specific keyboard keys
  if (["ArrowLeft", "ArrowRight", "Escape", "Backspace"].includes(code))
    handleKeyboard(
      code,
      /** @type {HTMLInputElement} **/ (event.target).value ?? "",
      EOxItemFilterChips,
    );
}

/**
 * Handles specific keyboard keys to navigate and manipulate chips.
 *
 * @param {string} key - The key pressed.
 * @param {string} textValue - The current value of the input field.
 * @param {Object} that - The EOxItemFilterChips component instance.
 */
function handleKeyboard(key, textValue, that) {
  const highlightedChip = that.renderRoot.querySelector(".chip.highlighted");
  // Handle Escape key or text value changes
  if (key === "Escape" || textValue) {
    if (highlightedChip) {
      highlightedChip.classList.remove("highlighted");
    }
  }

  // Handle Backspace key with no text value
  if (key === "Backspace" && !textValue) {
    if (that.items.length) {
      if (highlightedChip) {
        highlightedChip.querySelector(".chip-item-close").click();
        that.items.splice(
          Array.from(that.renderRoot.querySelectorAll(".chip")).indexOf(
            highlightedChip,
          ),
          1,
        );
      }
      const lastChip =
        that.renderRoot.querySelectorAll(".chip")[
          that.renderRoot.querySelectorAll(".chip").length - 1
        ];
      if (!lastChip.classList.contains("highlighted")) {
        lastChip.classList.add("highlighted");
      }
      that.requestUpdate();
    }
    that._dispatchEvent();
  }

  // Handle ArrowLeft and ArrowRight keys with no text value
  if ((key === "ArrowLeft" || key === "ArrowRight") && !textValue) {
    if (that.renderRoot.querySelectorAll(".chip").length < 1) {
      return;
    }
    let highlightedChipIndex = 0;
    const highlightedChip = that.renderRoot.querySelector(".chip.highlighted");
    if (highlightedChip) {
      highlightedChipIndex = Array.from(
        that.renderRoot.querySelectorAll(".chip"),
      ).indexOf(highlightedChip);
      highlightedChip.classList.remove("highlighted");
    }
    highlightedChipIndex =
      highlightedChipIndex + (key === "ArrowLeft" ? -1 : +1);
    if (key === "ArrowLeft" && highlightedChipIndex < 0) {
      highlightedChipIndex =
        that.renderRoot.querySelectorAll(".chip").length - 1;
    }
    if (
      key === "ArrowRight" &&
      highlightedChipIndex >
        that.renderRoot.querySelectorAll(".chip").length - 1
    ) {
      highlightedChipIndex = 0;
    }
    Array.from(that.renderRoot.querySelectorAll(".chip"))[
      highlightedChipIndex
    ].classList.add("highlighted");
  }
}
