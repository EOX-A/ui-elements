/**
 * Component demonstrating css variable override inside <style>
 */
import { html } from "lit";
import "@eox/map/main";
import "../src/main";
import { STORIES_LAYERS_ARRAY, STORIES_MAP_STYLE } from "../src/enums";

export const CSSVariableOverride = {
  render: () => html`
    <!-- Render eox-map component with ID "list" -->
    <eox-map
      id="css-var-override"
      style=${STORIES_MAP_STYLE}
      .layers=${STORIES_LAYERS_ARRAY}
    ></eox-map>
    <eox-drawtools
      for="eox-map#css-var-override"
      multiple-features
      show-list
    ></eox-drawtools>

    <!-- Style overrides -->
    <style>
      html,
      :host,
      :root {
        --secondary-color: #ffa55c;
        --bg-hover-transparency: 20%;
        --color: #ffa55c;
        --body-font-family: "Comic Sans MS", cursive;
      }
    </style>
  `,
};

export default CSSVariableOverride;
