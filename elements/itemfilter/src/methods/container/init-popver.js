import { autoUpdate, computePosition } from "@floating-ui/dom";

/**
 * Init popover autoUpdate and position
 *
 * @param {Object} EOxItemFilterContainer - The EOxItemFilterContainer component instance.
 * @return {() => void}
 */
function initPopover(EOxItemFilterContainer) {
  const trigger = EOxItemFilterContainer.renderRoot.querySelector(
    ".inline-container-wrapper",
  );
  const dropdown = EOxItemFilterContainer.renderRoot.querySelector("[popover]");
  const updatePosition = () => {
    // Only compute position if popover is open
    if (dropdown.matches(":popover-open")) {
      computePosition(trigger, dropdown, { strategy: "fixed" }).then(
        ({ x, y }) => {
          Object.assign(dropdown.style, {
            left: `${x}px`,
            top: `${y}px`,
            width: `${trigger.getBoundingClientRect().width}px`,
          });
        },
      );
    }
  };

  return autoUpdate(trigger, dropdown, updatePosition, {
    animationFrame: true,
  });
}

export default initPopover;
