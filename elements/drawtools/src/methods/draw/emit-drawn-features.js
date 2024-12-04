/**
 * Emits drawn features after a timeout to allow updating drawn features.
 *
 * @param {import("../../main").EOxDrawTools} EoxDrawTool - The drawing tool instance.
 * @param {Function} drawUpdateEvent - event to be triggered after drawFeature is updated
 */
const emitDrawnFeaturesMethod = (EoxDrawTool, drawUpdateEvent) => {
  // Function to emit features after a timeout (ensures update)
  const emitFeatures = () => {
    // Update drawnFeatures with features from drawLayer's source
    const drawnFeatures = EoxDrawTool.drawLayer.getSource().getFeatures();
    // Transform drawn features to the desired projection
    const source = EoxDrawTool.eoxMap.projection || "EPSG:3857";
    // has a default value of EPSG:4326
    const destination = EoxDrawTool.projection;
    // Update drawnFeatures with transformed features if the destination is defined
    EoxDrawTool.drawnFeatures = destination
      ? drawnFeatures.map((feat) => {
          feat = feat.clone();
          const transformed = feat.getGeometry().transform(source, destination);
          feat.setGeometry(transformed);
          return feat;
        })
      : drawnFeatures;

    EoxDrawTool.updateGeoJSON();
    EoxDrawTool.requestUpdate();

    // Triggering `drawupdate` event after drawFeature is updated
    drawUpdateEvent();
  };

  // Emit features after a timeout (ensures update)
  setTimeout(emitFeatures, 0);
};

export default emitDrawnFeaturesMethod;
