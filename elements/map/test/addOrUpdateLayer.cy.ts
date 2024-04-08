import { html } from "lit";
import "../main";
import { EoxLayer } from "../src/generate";

describe("Map", () => {
  it("add and update layer", () => {
    cy.intercept("https://openlayers.org/data/vector/ecoregions.json", {
      fixture: "/ecoregions.json",
    });
    cy.intercept(/^.*openstreetmap.*$/, { fixture: "/tiles/osm/0/0/0.png" });
    cy.mount(
      html`<eox-map
        .layers=${[
          { type: "Tile", properties: { id: "osm" }, source: { type: "OSM" } },
        ]}
      ></eox-map>`
    ).as("eox-map");
    cy.get("eox-map").and(($el) => {
      const layerDefinition = {
        type: "Vector",
        properties: {
          id: "regions",
          value: 1,
        },
        visible: true,
        opacity: 0.9,
        source: {
          type: "Vector",
          url: "https://openlayers.org/data/vector/ecoregions.json",
          format: "GeoJSON",
          attributions: "Regions: @ openlayers.org",
        },
      } as EoxLayer;
      const eoxMap = <EOxMap>$el[0];
      eoxMap.layers = [layerDefinition];

      const layer = eoxMap.getLayerById("regions");
      expect(layer, "add layer").to.exist;
      expect(layer.getOpacity(), "set opacity on new layer").to.be.equal(0.9);

      const updatedLayerDefinition = {
        type: "Vector",
        properties: {
          id: "regions",
          value: 2,
        },
        visible: true,
        opacity: 1,
        source: {
          type: "Vector",
          url: "https://openlayers.org/data/vector/ecoregions.json",
          format: "GeoJSON",
          attributions: "Regions: @ openlayers.org",
        },
      } as EoxLayer;

      eoxMap.addOrUpdateLayer(updatedLayerDefinition);
      expect(layer.getOpacity(), "update opacity").to.be.equal(1);
      expect(
        layer.get("_jsonDefinition").properties.value,
        "update json definition object"
      ).to.be.equal(2);
    });
  });
});
