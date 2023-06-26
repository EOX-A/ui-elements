import { EOxMap } from "../../map/main";
import mapIntegrationJson from "./mapIntegration.json";

describe("Layer Control", () => {
  beforeEach(() => {
    cy.visit("/elements/layercontrol/test/mapIntegration.html");
  });

  it("loads the layercontrol", () => {
    let eoxMap: EOxMap;
    cy.get("eox-map").should(($el) => {
      eoxMap = <EOxMap>$el[0];
      // @ts-ignore
      const olMap = eoxMap.map;
      eoxMap.setLayers(mapIntegrationJson);
      olMap
        .getLayers()
        .getArray()
        .forEach((layer, index) => {
          layer.set("name", "Layer " + index);
          layer.set("id", "layer" + index);
          if (index === 0) {
            layer.set("zIndex", 44);
          }
          if (index === 1) {
            layer.set("zIndex", 0);
          }
          if (index === 2) {
            layer.set("zIndex", 10);
          }
        });
    });
  });
});
