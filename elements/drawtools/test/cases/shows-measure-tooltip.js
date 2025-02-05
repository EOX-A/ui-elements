import { TEST_SELECTORS } from "../../src/enums";

// Destructure TEST_SELECTORS object
const { drawTools, controller, drawBtn } = TEST_SELECTORS;

/**
 * Clicks the draw button and verifies the 'drawing' state.
 */
const measureTooltipTest = () => {
  // Start drawing mode so that we get the measure tooltip later
  cy.get(drawTools)
    .shadow()
    .within(() => {
      cy.get(controller).within(() => {
        cy.get(drawBtn).click();
      });
    });

  // Click into the center of the map, move and click again to create a line.
  cy.get("eox-map").click(15, 40);
  cy.get("eox-map").click("center");

  cy.get("eox-map")
    .shadow()
    .within(() => {
      cy.get(".ol-tooltip-measure").should("exist");
    });
};

export default measureTooltipTest;
