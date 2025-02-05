import measure from "../../helpers/measure.js";

/**
 * Initiates the drawing process by initializing the draw layer,
 * activating drawing, and updating the drawing status.
 *
 * @param {import("../../main").EOxDrawTools} EoxDrawTool - The drawing tool instance.
 */
const startDrawingMethod = (EoxDrawTool) => {
  // Function to initialize the drawing process
  const initializeDrawing = () => {
    EoxDrawTool.drawLayer.set("isDrawingEnabled", true);
    EoxDrawTool.draw.setActive(true);
    // Add selection
    EoxDrawTool.selectionEvents.addSelectionEvent();

    // Set up measurements, if desired
    if (EoxDrawTool.measure) {
      EoxDrawTool.draw.on("drawstart", (evt) => {
        measure(evt, EoxDrawTool);
      });
    }
  };

  // Function to update the drawing status and request an update
  const updateDrawingStatus = () => {
    EoxDrawTool.currentlyDrawing = true;
    EoxDrawTool.requestUpdate();
  };

  // Initialize the drawing process
  initializeDrawing();
  // Update the drawing status
  updateDrawingStatus();
};

export default startDrawingMethod;
