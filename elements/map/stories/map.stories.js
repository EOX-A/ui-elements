// Global import of eox-elements in .storybook/preview.js!
import { html } from "lit";
import "../src/main.js";
import {
  PrimaryStory,
  VectorLayerStory,
  VectorTileLayerStory,
  WMSLayerStory,
  WMTSCapabilitiesLayerStory,
  WMTSTileGridStory,
  StaticImageLayerStory,
  STACLayerStory,
  GeoTIFFLayerStory,
  GroupLayerStory,
  ControlsStory,
  GeolocationStory,
  StandardLoadingIndicatorStory,
  CustomFullScreenLoadingIndicatorStory,
  HoverSelectStory,
  ClickSelectStory,
  TooltipStory,
  TooltipWithPropertyTransformStory,
  HighlightFeaturesAndAnimateStory,
  MapSyncStory,
  ABCompareStory,
  ConfigObjectStory,
  ProjectionStory,
  ProjectionTransformStory,
  AnimationsStory,
  PreventScrollStory,
  FlatGeoBufStory,
} from "./index.js";

export default {
  title: "Elements/eox-map",
  tags: ["autodocs"],
  component: "eox-map",
  render: /** @param {Object.<string, unknown>} args **/ (args) => html`
    <eox-map
      style="width: 100%; height: 300px;"
      .center=${args.center}
      .controls=${args.controls}
      .layers=${args.layers}
      .zoom=${args.zoom}
    ></eox-map>
  `,
};

/**
 * Basic map rendered using `eox-map` configuration
 */
export const Primary = PrimaryStory;

/**
 * Basic vector layer map rendered using `GeoJSON`
 */
export const VectorLayer = VectorLayerStory;

/**
 * Basic vector layer map rendered using `MVT` tiles
 */
export const VectorTileLayer = VectorTileLayerStory;

/**
 * Renders WMS layer using geo-server
 */
export const WMSLayer = WMSLayerStory;

/**
 * Renders `WMTSCapabilities` layer and fetches the provided capabilities url
 */
export const WMTSCapabilitiesLayer = WMTSCapabilitiesLayerStory;

/**
 * Renders `FlatGeoBuf` layer
 */
export const FlatGeoBuf = FlatGeoBufStory;

/**
 * Renders `WMTSCapabilities` layer and fetches the provided capabilities url
 */
export const WMTSTileGrid = WMTSTileGridStory;

/**
 * Renders a static image layer
 */
export const StaticImage = StaticImageLayerStory;

/**
 * Renders STAC Layer using STAC url json.
 */
export const STACLayer = STACLayerStory;

/**
 * Renders `GeoTIFF` layer as `WebGLTile`
 */
export const GeoTIFFLayer = GeoTIFFLayerStory;

/**
 * Renders `Group` layer which contains multiple layers in a group
 */
export const GroupLayer = GroupLayerStory;

/**
 * Renders different `Controls` for the `eox-map` using control config
 */
export const Controls = ControlsStory;

/**
 * Renders Geolocation Control in `eox-map`
 */
export const Geolocation = GeolocationStory;

/**
 * A simple, unobtrusive loading indicator in the bottom left that appears any time when the map is loading.
 */
export const StandardLoadingIndicator = StandardLoadingIndicatorStory;

/**
 * Loading Indicators can also be centered over the entire map by setting the option `type` to `'fullscreen'`, adapting the opacity is adviced when doing so.
 */
export const CustomFullScreenLoadingIndicator =
  CustomFullScreenLoadingIndicatorStory;

/**
 * Renders `eox-map` with `Hover` interaction
 */
export const HoverSelect = HoverSelectStory;

/**
 * Renders `eox-map` with `Click` interaction
 */
export const ClickSelect = ClickSelectStory;

/**
 * `eox-map` offers a built-in tooltip, which needs to be placed inside the default slot:
 * ```
 * <eox-map [...]>
 *   <eox-map-tooltip></eox-map-tooltip>
 * </eox-map>
 * ```
 * This renders a list of all feature properties of the currently selected feature.
 * Note that if multiple interactions are registered (e.g. `pointermove` and `singleclick`),
 * the `pointermove` interaction will have higher priority for the tooltip.
 */
export const Tooltip = TooltipStory;

/**
 * The rendering of feature properties inside the tooltip can be transformed
 * by passing a `propertyTransform` function to the tooltip element which applies to each property in the rendering loop:
 * ```
 * <eox-map [...]>
 *   <eox-map-tooltip
 *     .propertyTransform=${({key, value}, feature) => key.includes("COLOR") ? { key: key.toLowerCase(), value }}
 *   ></eox-map-tooltip>
 * </eox-map>
 * ```
 *
 * The first argument are `key` and `value` of the current feature property; this object needs to be
 * returned in order to render the property in the list.
 * Additionally, the entire feature is passed as a second argument, for cases of more advanced property
 * transformation in which needs access to the entire feature.
 */
export const TooltipWithPropertyTransform = TooltipWithPropertyTransformStory;

/**
 * Select interactions offer a `highlightById` method, with which vector features can be programmatically selected via their id property.
 * It expects an array with a list of ids to be selected.
 * Optionally, passing a second argument allows to set the [`fitOptions`](https://openlayers.org/en/latest/apidoc/module-ol_View.html#~FitOptions),
 * adding view animation to the selection.
 */
export const HighlightFeaturesAndAnimate = HighlightFeaturesAndAnimateStory;

/**
 * Sync the views of two maps using the `sync` attribute (e.g. `sync="eox-map#a"`).
 */
export const MapSync = MapSyncStory;

/**
 * To compare two maps, wrap them in an `<eox-map-compare>` element and assign them to the slot `first` and `second`.
 * Also use the `sync` attribute so both move their view together.
 *
 * `eox-map-compare` also takes a `value` property (0 - 100) which determines the position of the comparison slider;
 * and an `enabled` attribute, which can be either `"first"` (only left map visible), `"second"` (only second map visible)
 * or `undefined` (default, both visible).
 */
export const ABCompare = ABCompareStory;

export const ConfigObject = ConfigObjectStory;

/**
 * The projection of the view can be changed via the `projection`-attribute.
 * Out-of-the-box the projections EPSG:3857 (default) and EPSG:4326 (geographic coordinates)
 * are included, additional projections can be used by registering them via the `registerProjection` or
 * `registerProjectionFromCode` helper functions beforehand.
 */
export const Projection = ProjectionStory;

/**
 * With the convenience functions `transform` and `transformExtent` it is possible to transform coordinates
 * and extents from any projection to EPSG.4326 (default) or any other projection.
 * Basically, these methods are the `ol/proj` [transform](https://openlayers.org/en/latest/apidoc/module-ol_proj.html#.transform)
 * and [transformExtent](https://openlayers.org/en/latest/apidoc/module-ol_proj.html#.transformExtent) functions,
 * with the small adaptation that the destination defaults to EPSG:4326 if not defined.
 */
export const ProjectionTransform = ProjectionTransformStory;

/**
 * changing the properties `zoom`, `center` or `zoomExtent` will trigger animations, if the
 * `animationOptions`-property is set.
 * animation options for `zoom` or `center`: https://openlayers.org/en/latest/apidoc/module-ol_View.html#~AnimationOptions
 * animation options for `zoomExtent`: https://openlayers.org/en/latest/apidoc/module-ol_View.html#~FitOptions
 */
export const Animations = AnimationsStory;

/**
 * By setting the `prevent-scroll` attribute or by setting `preventScroll` property to `true` (either on the element or within the config object),
 * the map doesnt mouse-scroll (on desktop) or drag-touch (on tab/mobile). Pressing the platform modifier key (ctrl/cmd) will enable scrolling.
 * Useful for maps embedded in scrollable websites.
 */
export const PreventScroll = PreventScrollStory;
