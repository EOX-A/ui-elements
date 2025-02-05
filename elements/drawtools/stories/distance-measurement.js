import { html } from "lit";

import { STORIES_MAP_STYLE, STORIES_LAYERS_ARRAY } from "../src/enums";

/**
 * Component demonstrating how EOxMap and the draw tools can be used to measure distances on a map.
 */
export const DistanceMeasurement = {
  render: () => html`
    <eox-map
      id="line-measurement"
      style=${STORIES_MAP_STYLE}
      .layers=${STORIES_LAYERS_ARRAY}
    />
    <eox-drawtools
      for="eox-map#line-measurement"
      type="LineString"
      multiple-features
      allow-modify
      measure
    />
  `,
};

export default DistanceMeasurement;
