import GeoTIFF from "ol/source/GeoTIFF.js";
import TileLayer from "ol/layer/WebGLTile.js";
import { EOxLayerSwitcher } from "../src/main";
import { EOxMap } from "../../map/main";

// const channels = ['red', 'green', 'blue'];

function getVariables() {
  // const variables = {};
  // for (const channel of channels) {
  //   const selector = document.getElementById(channel);
  //   variables[channel] = parseInt(selector.value, 10);

  //   const inputId = `${channel}Max`;
  //   const input = document.getElementById(inputId);
  //   variables[inputId] = parseInt(input.value, 10);
  // }
  return {
    red: 1,
    green: 2,
    blue: 3,
    redMax: 3000,
    greenMax: 3000,
    blueMax: 3000,
  };
  // return variables;
}

const cogLayer = new TileLayer({
  style: {
    variables: getVariables(),
    color: [
      "array",
      ["/", ["band", ["var", "red"]], ["var", "redMax"]],
      ["/", ["band", ["var", "green"]], ["var", "greenMax"]],
      ["/", ["band", ["var", "blue"]], ["var", "blueMax"]],
      1,
    ],
  },
  source: new GeoTIFF({
    normalize: false,
    sources: [
      {
        url: "https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif",
      },
    ],
  }),
});

describe("Layer Switcher", () => {
  beforeEach(() => {
    cy.visit("/elements/layerswitcher/test/mapIntegration.html");
  });

  it("loads the layerswitcher", () => {
    let eoxMap: EOxMap;
    cy.get("eox-map").should(($el) => {
      eoxMap = <EOxMap>$el[0];
      eoxMap.map.addLayer(cogLayer);
      eoxMap.map
        .getLayers()
        .getArray()
        .forEach((layer, index) => {
          layer.set("name", "Layer " + index);
          layer.set("id", "layer" + index);
        });
    });
    cy.get("eox-layerswitcher").should(($ls) => {
      const eoxLayerSwitcher = <EOxLayerSwitcher>$ls[0];
      eoxLayerSwitcher.attachTo(eoxMap.map);
      const eoxLayerSwitcher2 = <EOxLayerSwitcher>$ls[1];
      eoxLayerSwitcher2.attachTo(eoxMap.map);
    });
  });
});
