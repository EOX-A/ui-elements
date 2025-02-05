// Importing necessary modules, test cases, and enums
import "../src/main";
import "./_mockMap";
import {
  clickDiscardBtnTest,
  clickDrawBtnTest,
  copyGeoJsonEditorTest,
  loadDrawToolsTest,
  setDifferentFormats,
  setLayerId,
  measureTooltipTest,
} from "./cases";

import { TEST_SELECTORS } from "../src/enums";
import "../../map/src/main";

// Destructuring TEST_SELECTORS object
const { drawTools } = TEST_SELECTORS;

// Test suite for Drawtools
describe("Drawtools", () => {
  // Setting up the environment before each test
  beforeEach(() => {
    cy.mount(
      '<eox-map center="[15,48]" layers="[{"type":"Tile","source":{"type":"OSM"}}]" zoom="7" style="width: 100%; height: 300px;"></eox-map>',
    ).as("eox-map");

    //cy.mount("<mock-map></mock-map>").as("mock-map");

    cy.mount(
      `<eox-drawtools show-editor import-features measure type="LineString" for="eox-map"></eox-drawtools>`,
    ).as(drawTools);
  });

  // Test case to ensure the drawtools component loads successfully
  it("loads the drawtools", () => loadDrawToolsTest());

  // Test case to simulate clicking the draw button
  it("clicks the draw button", () => clickDrawBtnTest());

  // Test case to simulate clicking the discard button and clearing drawn features
  it("clicks the discard button and clears drawn features", () =>
    clickDiscardBtnTest());

  // Test case to check whether a valid geo-json present in the clipboard
  it("check valid geo-json present in the clipboard.", () =>
    copyGeoJsonEditorTest());
  // Test case to set the layer id and check if the draw button icon changes
  it("setting layer id changes draw btn icon", () => setLayerId());

  // Test case to check if the drawn features are emitted in different formats
  it("emits drawn features in different formats", () => setDifferentFormats());

  it("renders the measurement tooltip correctly", () => measureTooltipTest());
});
