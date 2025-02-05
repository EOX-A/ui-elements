import { TEST_SELECTORS } from "../../src/enums";
import { STORIES_VECTOR_LAYERS } from "../../src/enums";

const { drawTools, drawBtn } = TEST_SELECTORS;

/**
 * Test to verify the "layer-id" attribute in the drawtools element.
 */
const setLayerId = () => {
  const layerId = "regions";
  cy.get("eox-map").then(($el) => {
    cy.log($el[0]);
    $el[0].layers = STORIES_VECTOR_LAYERS;
  });

  cy.get(drawTools).then(($el) => {
    cy.log(drawTools.eoxMap);
    $el[0].setAttribute("layer-id", layerId);
  });

  cy.get(drawTools)
    .shadow()
    .within(() => {
      cy.get(drawBtn).should("have.class", "pointer");
    });
};

export default setLayerId;
