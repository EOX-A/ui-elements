import { html } from "lit";
import "../main";
import drawInteractionLayerJson from "./drawInteraction.json";
import { simulateEvent } from "./utils/events";
import { Point } from "ol/geom";
import { EOxMap } from "../main";

describe("draw interaction", () => {
  beforeEach(() => {});
  it("adds a draw interaction", () => {
    cy.mount(html`<eox-map .layers=${drawInteractionLayerJson}></eox-map>`).as(
      "eox-map"
    );
    cy.get("eox-map").and(($el) => {
      // get the interaction via the source key
      let drawInteraction = (<EOxMap>$el[0]).interactions["drawInteraction"];
      expect(drawInteraction).to.exist;
      expect(drawInteraction.getActive()).to.equal(true);

      const eoxMap = <EOxMap>$el[0];
      const map = eoxMap.map;
      const originalNumberOfInteractions = map.getInteractions().getLength();
      console.log(map.getInteractions().getArray());
      const newLayerJson = [Object.assign({}, drawInteractionLayerJson[0])];
      delete newLayerJson[0].interactions;
      //@ts-ignore
      eoxMap.layers = newLayerJson;
      drawInteraction = (<EOxMap>$el[0]).interactions["drawInteraction"];
      expect(drawInteraction, 'remove interaction from dictionary').to.not.exist;
      expect(
        map.getInteractions().getLength(),
        "remove draw and modify interaction"
      ).to.be.equal(originalNumberOfInteractions - 2);
    });
  });

  it("creates correct geometry", () => {
    cy.mount(html`<eox-map .layers=${drawInteractionLayerJson}></eox-map>`).as(
      "eox-map"
    );
    cy.get("eox-map").and(($el) => {
      const eoxMap = <EOxMap>$el[0];
      simulateEvent(eoxMap.map, "pointerdown", 10, 20);
      simulateEvent(eoxMap.map, "pointerup", 10, 20);
      const drawLayer = eoxMap.getLayerById("drawLayer");
      // @ts-ignore
      const features = drawLayer.getSource().getFeatures();
      const geometry = features[0].getGeometry() as Point;
      expect(features).to.have.length(1);
      expect(geometry.getCoordinates().length).to.be.equal(2);
      const buffer = eoxMap.buffer(geometry.getExtent(), 100);
      expect(Array.isArray(buffer), "create buffer from point extent").to.be
        .true;
    });
  });

  it("remove interaction", () => {
    cy.mount(html`<eox-map .layers=${drawInteractionLayerJson}></eox-map>`).as(
      "eox-map"
    );
    cy.get("eox-map").and(($el) => {
      const eoxMap = <EOxMap>$el[0];
      expect(eoxMap.interactions.drawInteraction).to.exist;
      expect(eoxMap.interactions.drawInteraction_modify).to.exist;
      (<EOxMap>$el[0]).removeInteraction("drawInteraction");
      (<EOxMap>$el[0]).removeInteraction("drawInteraction_modify");
      expect(eoxMap.interactions.drawInteraction).to.not.exist;
      expect(eoxMap.interactions.drawInteraction_modify).to.not.exist;
    });
  });

  it("creates line and measure event", () => {
    drawInteractionLayerJson[0].interactions[0].options.type = "LineString";
    cy.mount(html`<eox-map .layers=${drawInteractionLayerJson}></eox-map>`).as(
      "eox-map"
    );
    cy.get("eox-map").and(($el) => {
      const eoxMap = <EOxMap>$el[0];
      eoxMap.addEventListener("drawend", (evt) => {
        // @ts-ignore
        expect(evt.detail.geojson.properties.measure).to.be.greaterThan(0);
      });

      // first point
      simulateEvent(eoxMap.map, "pointermove", 10, 20);
      simulateEvent(eoxMap.map, "pointerdown", 10, 20);
      simulateEvent(eoxMap.map, "pointerup", 10, 20);

      // second point
      simulateEvent(eoxMap.map, "pointermove", 30, 20);
      simulateEvent(eoxMap.map, "pointerdown", 30, 20);
      simulateEvent(eoxMap.map, "pointerup", 30, 20);

      // finish on second point
      simulateEvent(eoxMap.map, "pointerdown", 30, 20);
      simulateEvent(eoxMap.map, "pointerup", 30, 20);

      const drawLayer = eoxMap.getLayerById(
        "drawLayer"
      ) as import("ol/layer").Vector<import("ol/source").Vector>;
      const source = drawLayer.getSource();
      const features = source.getFeatures();
      expect(features).to.have.length(1);
    });
  });

  it("creates polygon and measure event", () => {
    drawInteractionLayerJson[0].interactions[0].options.type = "Polygon";
    cy.mount(html`<eox-map .layers=${drawInteractionLayerJson}></eox-map>`).as(
      "eox-map"
    );
    cy.get("eox-map").and(($el) => {
      const eoxMap = <EOxMap>$el[0];
      eoxMap.addEventListener("drawend", (evt) => {
        // @ts-ignore
        expect(evt.detail.geojson.properties.measure).to.be.greaterThan(0);
      });

      // first point
      simulateEvent(eoxMap.map, "pointermove", 10, 20);
      simulateEvent(eoxMap.map, "pointerdown", 10, 20);
      simulateEvent(eoxMap.map, "pointerup", 10, 20);

      // second point
      simulateEvent(eoxMap.map, "pointermove", 30, 20);
      simulateEvent(eoxMap.map, "pointerdown", 30, 20);
      simulateEvent(eoxMap.map, "pointerup", 30, 20);

      // third point
      simulateEvent(eoxMap.map, "pointermove", 40, 10);
      simulateEvent(eoxMap.map, "pointerdown", 40, 10);
      simulateEvent(eoxMap.map, "pointerup", 40, 10);

      // finish on first point
      simulateEvent(eoxMap.map, "pointermove", 10, 20);
      simulateEvent(eoxMap.map, "pointerdown", 10, 20);
      simulateEvent(eoxMap.map, "pointerup", 10, 20);

      const drawLayer = eoxMap.getLayerById(
        "drawLayer"
      ) as import("ol/layer").Vector<import("ol/source").Vector>;
      const features = drawLayer.getSource().getFeatures();
      expect(features).to.have.length(1);
    });
  });

  it("creates box", () => {
    drawInteractionLayerJson[0].interactions[0].options.type = "Box";
    drawInteractionLayerJson[0].interactions[0].options.modify = false;
    cy.mount(html`<eox-map .layers=${drawInteractionLayerJson}></eox-map>`).as(
      "eox-map"
    );
    cy.get("eox-map").and(($el) => {
      const eoxMap = <EOxMap>$el[0];

      eoxMap.addEventListener("drawend", (evt) => {
        // @ts-ignore
        expect(evt.detail.geojson.properties.measure).to.be.greaterThan(0);
        // @ts-ignore
        const coordinates = evt.detail.geojson.geometry.coordinates[0];
        const isRectangle =
          coordinates[0][1] === coordinates[1][1] &&
          coordinates[1][0] === coordinates[2][0];
        expect(isRectangle, "create Box").to.be.true;
      });
      simulateEvent(eoxMap.map, "pointerdown", 50, 80);
      simulateEvent(eoxMap.map, "pointerup", 50, 80);

      simulateEvent(eoxMap.map, "pointerdown", -50, -50);
      simulateEvent(eoxMap.map, "pointerup", -50, -50);

      expect(
        eoxMap.interactions.drawInteraction_modify,
        "do not add modify if flag is set to false"
      ).to.not.exist;
    });
  });
});
