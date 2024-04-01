import { html } from "lit";
import "../main";
import vectorTileLayerJson from "./vectorTilesLayer.json";
import vectorLayerJson from "./vectorLayer.json";
import { simulateEvent } from "./utils/events";
import { EoxLayer } from "../src/generate";
import ecoRegionsFixture from "./fixtures/ecoregions.json"
import mapboxFixture from "./fixtures/tiles/mapbox-streets-v6/14/8937/5679.vector.pbf"
describe("select interaction on click", () => {
  it("adds a select interaction to VectorTile layer", () => {
    cy.intercept(/^.*geoserver.*$/, (req) => {
      req.reply(mapboxFixture)
    });
    return new Cypress.Promise((resolve) => {
      const layerJson = vectorTileLayerJson as Array<EoxLayer>;
      layerJson[0].interactions = [
        {
          type: "select",
          options: {
            id: "selectInteraction",
            condition: "click",
            layer: {
              type: "VectorTile",
              properties: {
                id: "selectLayer",
              },
              source: {
                type: "VectorTile",
              },
              style: {
                "stroke-color": "chartreuse",
                "stroke-width": 5,
              },
            },
          },
        },
      ];
      cy.mount(html`<eox-map .layers=${layerJson}></eox-map>`).as("eox-map");
      cy.get("eox-map").and(($el) => {
        const eoxMap = <EOxMap>$el[0];
        eoxMap.addEventListener("select", (evt) => {
          // @ts-ignore
          expect(evt.detail.feature).to.exist;
          resolve();
        });
        eoxMap.map.on("loadend", () => {
          simulateEvent(eoxMap.map, "click", 65, 13);
        });
      });
    });
  });

  it("adds a select interaction to Vector layer", () => {
    cy.intercept("https://openlayers.org/data/vector/ecoregions.json", (req) => {
      req.reply(ecoRegionsFixture)
    });
    const styleJson = JSON.parse(
      JSON.stringify(vectorLayerJson)
    ) as Array<EoxLayer>;
    styleJson[0].minZoom = 3;
    styleJson[0].interactions = [
      {
        type: "select",
        //@ts-ignore
        options: {
          id: "selectInteraction",
          condition: "click",
          style: {
            "stroke-color": "white",
            "stroke-width": 3,
          },
        },
      },
    ];
    cy.mount(html`<eox-map .layers=${styleJson}></eox-map>`).as("eox-map");
    cy.get("eox-map").and(($el) => {
      const eoxMap = <EOxMap>$el[0];

      eoxMap.addEventListener("select", (evt) => {
        // @ts-ignore
        expect(evt.detail.feature).to.exist;
      });
      eoxMap.map.on("loadend", () => {
        simulateEvent(eoxMap.map, "click", 120, -140);
      });
    });
  });

  it("remove interaction", () => {
    const styleJson = JSON.parse(
      JSON.stringify(vectorTileLayerJson)
    ) as Array<EoxLayer>;
    styleJson[0].interactions = [
      {
        type: "select",
        //@ts-ignore
        options: {
          id: "selectInteraction",
          condition: "click",
          style: {
            "stroke-color": "white",
            "stroke-width": 3,
          },
        },
      },
    ];
    cy.mount(html`<eox-map .layers=${styleJson}></eox-map>`).as("eox-map");
    cy.get("eox-map").and(($el) => {
      const eoxMap = <EOxMap>$el[0];
      expect(eoxMap.selectInteractions.selectInteraction).to.exist;
      eoxMap.layers = vectorLayerJson as Array<EoxLayer>;
      expect(eoxMap.selectInteractions.selectInteraction).to.not.exist;
    });
  });
});
