/**
 * Stories for eox-drawtools component showcasing various configurations.
 * These stories provide visual representations and usage examples for different scenarios.
 */
import {
  PrimaryStory,
  DrawTypeStory,
  MultiPolygonStory,
  ModifyFeaturesStory,
  MultiPolygonWithListStory,
  UnstyledStory,
  CSSVariableOverrideStory,
  ImportFeaturesWithEditorStory,
  SelectFeatureStory,
  MultiFeaturesSelectStory,
  FeaturesProjectionStory,
  FormatStory,
  DistanceMeasurementStory,
} from "./index";

export default {
  title: "Elements/eox-drawtools",
  tags: ["autodocs"],
  component: "eox-drawtools",
};

// Exporting each individual story for the eox-drawtools component.

/**
 * Primary story showcasing basic usage.
 */
export const Primary = PrimaryStory;

/**
 * By setting the `multiple-features` attribute or `multipleFeatures` property to `true`,
 * multiple polygons can be drawn.
 */
export const MultiPolygon = MultiPolygonStory;

/**
 * By setting the `allow-modify` attribute or `allowModify` property,
 * the user can modify features after drawing.
 */
export const ModifyFeatures = ModifyFeaturesStory;

/**
 * The `type` attribute/property controls which drawing type is enabled
 * (defaults to "Polygon").
 */
export const DrawType = DrawTypeStory;

/**
 * By setting the `show-list` attribute or `showList` property to `true`,
 * a list of the drawn features will be populated.
 */
export const MultiPolygonWithList = MultiPolygonWithListStory;

/**
 * By setting the `show-editor` attribute or `import-features` property to `true`,
 * generates an editor to edit features and allow users to drag-drop/upload/paste shape files in
 * - GeoJSON, TopoJSON and KML format.
 */
export const ImportFeaturesWithEditor = ImportFeaturesWithEditorStory;

/**
 * Setting `layer-id` attribute or `layerId` property enables selection of features on the specified layer.
 */
export const SelectFeature = SelectFeatureStory;

/**
 * Showcasing the combination of `multiple-features`, `show-list` and `layer-id` attributes or properties, allowing the selection of multiple features.
 */
export const MultiFeaturesSelect = MultiFeaturesSelectStory;
/**
 * Showcasing the possibilty to emit drawn features in different projections
 */
export const FeaturesProjection = FeaturesProjectionStory;

/**
 * Showcasing the possibilty to emit drawn features in different formats
 */
export const Formats = FormatStory;

/**
 * Override css variable directly using styles.
 */
export const CSSVariableOverride = CSSVariableOverrideStory;

/**
 * By setting the `unstyled` attribute or property, the element has no styling applied.
 */
export const Unstyled = UnstyledStory;

/**
 * Setting the `measure` attribute on the map and drawing with `LineString`s will cause
 * a tooltip to be displayed showing the distance of the line being drawn.
 */
export const DistanceMeasurement = DistanceMeasurementStory;
