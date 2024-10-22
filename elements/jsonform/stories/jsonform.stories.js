// Global import of eox-elements in .storybook/preview.js!
import { html } from "lit";
import {
  CatalogStory,
  CollectionStory,
  ExternalStory,
  MarkdownStory,
  PrimaryStory,
  UnStyledStory,
  BoundingBoxStory,
  PolygonStory,
  FeatureSelectionStory,
} from "./index.js";

export default {
  title: "Elements/eox-jsonform",
  tags: ["autodocs"],
  component: "eox-jsonform",
  render: (args) => html`
    <eox-jsonform
      .schema=${args.schema}
      .value=${args.value}
      .noShadow=${true}
      .unstyled=${args.unstyled}
    ></eox-jsonform>
  `,
};

/**
 * Basic JSON Form example
 */
export const Primary = PrimaryStory;

/**
 * JSON Form based on STAC Catalog config
 */
export const Catalog = CatalogStory;

/**
 * JSON Form based on STAC collection config
 */
export const Collection = CollectionStory;

/**
 * JSON Form based on External URL
 */
export const External = ExternalStory;

/**
 * JSON Form based on Markdown Editor config
 */
export const Markdown = MarkdownStory;

/**
 * JSON Form based on drawtools - Box
 */
export const BoundigBox = BoundingBoxStory;

/**
 * JSON Form based on drawtools - Polygon
 */
export const Polygons = PolygonStory;

/**
 * JSON Form based on drawtools - Feature Selection
 */
export const FeatureSelection = FeatureSelectionStory;
/**
 * Unstyled JSON Form
 */
export const Unstyled = UnStyledStory;
