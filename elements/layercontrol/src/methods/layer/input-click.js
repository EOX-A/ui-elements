/**
 * Handles the click event on an input element to control layer visibility.
 *
 * @param {{target: { checked: boolean }}} evt - The input change event triggering the method.
 * @param {import("../../components/layer").EOxLayerControlLayer} EOxLayerControlLayer - Instance of EOxLayerControlLayer.
 */
const inputClickMethod = (evt, EOxLayerControlLayer) => {
  const layer = EOxLayerControlLayer.layer; // The layer instance associated with the control.

  console.log(layer);

  // Set the visibility of the layer based on the input's checked state.
  layer.setVisible(evt.target.checked);

  // Check if the layer is checked and marked as 'layerControlExclusive'.
  if (evt.target.checked && layer.get("layerControlExclusive")) {
    /**
     * @type NodeListOf<Element & {layer: any, requestUpdate: function}>
     */
    const siblings = EOxLayerControlLayer.closest(
      ".layers > ul",
    ).querySelectorAll("eox-layercontrol-layer");

    // Loop through the sibling layers to handle exclusive visibility.
    siblings.forEach((sibling) => {
      if (
        sibling.layer !== layer &&
        sibling.layer?.get("layerControlExclusive")
      ) {
        sibling.layer.setVisible(false);
        sibling.requestUpdate();
      }
    });
  }

  //console.log(document.querySelector("eox-layercontrol").isGloballyExclusive);

  // Handle globally exclusive layers
  let layerControl = document.querySelector("eox-layercontrol");

  if (evt.target.checked
        && layer.get("layerControlExclusive")
        && layerControl.isGloballyExclusive) {
    console.log("Globally exclusive layer");
    // *:has(> .layers > ul) { /* styles to apply to the tag */ }      

    // Find all exclusive layers across all groups
    const allLayers = layerControl
      .shadowRoot
      .querySelectorAll("eox-layercontrol-layer");

    const allExclusiveLayers = Array.from(allLayers)
      .filter((layer) => layer.layer.get("layerControlExclusive"));

    console.log("allExclusiveLayers", allExclusiveLayers);

    /*allExclusiveLayers.forEach((exclusiveLayerElement) => {
      const exclusiveLayer = exclusiveLayerElement.layer;

      console.log("exclusiveLayer", exclusiveLayer);

      // Ensure we don't hide the currently checked layer
      if (exclusiveLayer !== layer) {
        exclusiveLayer.setVisible(false);
        exclusiveLayerElement.closest("eox-layercontrol-layer").requestUpdate();
      }
    });*/
  }


  // Dispatch a 'changed' event to signal a change in the layer's state.
  EOxLayerControlLayer.dispatchEvent(
    new CustomEvent("changed", { bubbles: true, detail: layer }),
  );

  // Request an update for the layer control to reflect the changes.
  EOxLayerControlLayer.requestUpdate();
};

export default inputClickMethod;
