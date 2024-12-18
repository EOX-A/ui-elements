// Importing necessary modules, test cases, and enums
import "../src/main";
import "./_mockedDrawtools";
import {
  loadJsonFormTest,
  loadJsonFormNoShadowTest,
  loadExternalSchemaTest,
  loadExternalValueTest,
  loadReRenderFormOnChangeTest,
  loadMarkdownTest,
  triggerChangeEventTest,
  loadValuesTest,
  loadMisMatchingValuesTest,
  renderDrawtools,
} from "./cases";

// Test suite for Jsonform
describe("Jsonform", () => {
  // Test case to ensure the jsonform component loads successfully
  it("loads the jsonform", () => loadJsonFormTest());
  it("loads the jsonform without shadow root", () =>
    loadJsonFormNoShadowTest());
  it("loads schema from url", () => loadExternalSchemaTest());
  it("loads value from url", () => loadExternalValueTest());
  it("re-renders form on change", () => loadReRenderFormOnChangeTest());
  it("loads the markdown editor", () => loadMarkdownTest());
  it("triggers a change event when typing", () => triggerChangeEventTest());
  it("loads values", () => loadValuesTest());
  it("loads mismatching values", () => loadMisMatchingValuesTest());
  it.only("renders drawtools as a custom input", () => renderDrawtools());
});
