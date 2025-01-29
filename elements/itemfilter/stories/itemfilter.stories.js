// Global import of eox-elements in .storybook/preview.js!

import {
  AutoSpreadStory,
  CardDisplayStory,
  CSSVariablesStory,
  ExternalStory,
  InlineModeStory,
  NestedPropertyStory,
  PreSetFilterStory,
  PrimaryStory,
  ResultActionStory,
} from "./index.js";

export default {
  title: "Elements/eox-itemfilter",
  tags: ["autodocs"],
  component: "eox-itemfilter",
};

/**
 * A basic example for an item filter configuration.
 */
export const Primary = PrimaryStory();

/**
 * Using `inlineMode`, the itemfilter is rendered in a single input field.
 */
export const InlineMode = InlineModeStory();

/**
 * By using `state` inside the `filterProperties', it is possible to start the itemfilter.
 * with a pre-defined state.
 */
export const PreSetFilter = PreSetFilterStory();

/**
 * By using dots (`.`) a nested property can be used as key.
 */
export const NestedProperty = NestedPropertyStory();

/**
 * Example showcasing how to use an external API endpoint
 */
export const External = ExternalStory();

/**
 * When using the config option `autoSpreadSingle`, then result aggregations that have only one item.
 * get spread to the root level
 */
export const AutoSpread = AutoSpreadStory();

/**
 * When using `result-type` property with value `cards`, the results are not rendered in a list,
 * but in a responsive card grid
 */
export const CardDisplay = CardDisplayStory();

/**
 * CSS variables can be used to modify the styling and layout of itemfilter: e.g. the `--form-flex-direction`
 * variable set to `row` instead of `column` (default)
 */
export const CSSVariables = CSSVariablesStory();

/**
 * The `result-action` event is triggered when a result action is clicked. The icon can be configered with the
 * `resultActionIcon` property.
 */
export const ResultAction = ResultActionStory();
