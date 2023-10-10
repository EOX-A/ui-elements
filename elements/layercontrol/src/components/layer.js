import { html } from "lit";
import { when } from "lit/directives/when.js";
import { live } from "lit/directives/live.js";
import { EOxLayerControlBase } from "./base";
import "./layerConfig";
import { radio } from "../../../../utils/styles/radio";
import { checkbox } from "../../../../utils/styles/checkbox";

/**
 * A single layer display
 *
 * @element eox-layercontrol-layer
 */
export class EOxLayerControlLayer extends EOxLayerControlBase {
  static properties = {
    ...super.properties,
    layer: { attribute: false },
  };

  constructor() {
    super();

    /**
     * The native OL layer
     * @type {import("ol/layer").Layer}
     * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_layer_Layer-Layer.html}
     */
    this.layer = null;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <style>
        ${this.styleBasic}
        ${!this.unstyled && this.styleEOX}
      </style>
      ${when(
        this.layer,
        () => html`
          <div class="layer">
            <label
              class="drag-handle ${this.layer.get("layerControlDisable")
                ? "disabled"
                : ""}"
            >
              <input
                type=${this.layer.get("layerControlExclusive")
                  ? "radio"
                  : "checkbox"}
                .checked=${live(this.layer.getVisible())}
                @click=${(
                  /** @type {{ target: { checked: boolean; }; }} */ evt
                ) => {
                  this.layer.setVisible(evt.target.checked);
                  if (
                    evt.target.checked &&
                    this.layer.get("layerControlExclusive")
                  ) {
                    /**
                     * @type NodeListOf<Element & {layer: any, requestUpdate: function}>
                     */
                    const siblings =
                      this.parentNode.parentNode.querySelectorAll(
                        "li > eox-layercontrol-layer"
                      );
                    siblings.forEach((sibling) => {
                      if (
                        sibling.layer !== this.layer &&
                        sibling.layer?.get("layerControlExclusive")
                      ) {
                        sibling.layer.setVisible(false);
                        sibling.requestUpdate();
                      }
                    });
                    this.dispatchEvent(
                      new CustomEvent("changed", { bubbles: true })
                    );
                  }
                }}
              />
              <span class="title">${this.layer.get(this.titleProperty)}</span>
            </label>
            <button class="tools">+</button>
          </div>
          <eox-layercontrol-layerconfig
            .layer=${this.layer}
            .unstyled=${this.unstyled}
            @changed=${() => this.requestUpdate()}
          ></eox-layercontrol-layerconfig>
        `
      )}
    `;
  }

  styleBasic = ``;

  styleEOX = `
    ${radio}
    ${checkbox}
    eox-layercontrol-layer {
      width: 100%;
    }
    .layer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
    }
    .tools {
      border: none;
      border-radius: 2px;
      background: none;
      display: flex;
      place-items: center;
      padding: 2px;
      margin: 0 4px;
      height: 16px;
      width: 16px;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23004170' viewBox='0 0 24 24'%3E%3Ctitle%3Edots-vertical%3C/title%3E%3Cpath d='M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z' /%3E%3C/svg%3E");
      cursor: pointer;
    }
    .tools:active {
      background: #0041703a;
    }
    label, span {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    [data-type] .title::before {
      width: 20px;
      min-width: 20px;
      height: 20px;
      margin-right: 6px;
    }
    [data-type=group] .title::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230041703a' viewBox='0 0 24 24'%3E%3Ctitle%3Efolder-outline%3C/title%3E%3Cpath d='M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z' /%3E%3C/svg%3E");
    }
    [data-type=group] > eox-layercontrol-layer-group > details[open] > summary > eox-layercontrol-layer > .layer > label > .title::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230041703a' viewBox='0 0 24 24'%3E%3Ctitle%3Efolder-open-outline%3C/title%3E%3Cpath d='M6.1,10L4,18V8H21A2,2 0 0,0 19,6H12L10,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H19C19.9,20 20.7,19.4 20.9,18.5L23.2,10H6.1M19,18H6L7.6,12H20.6L19,18Z' /%3E%3C/svg%3E");
    }
    [data-type=raster] .title::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230041703a' viewBox='0 0 24 24'%3E%3Ctitle%3Echeckerboard%3C/title%3E%3Cpath d='M2 2V22H22V2H2M20 12H16V16H20V20H16V16H12V20H8V16H4V12H8V8H4V4H8V8H12V4H16V8H20V12M16 8V12H12V8H16M12 12V16H8V12H12Z' /%3E%3C/svg%3E");
    }
    [data-type=vector] .title::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230041703a' viewBox='0 0 24 24'%3E%3Ctitle%3Eshape-outline%3C/title%3E%3Cpath d='M11,13.5V21.5H3V13.5H11M9,15.5H5V19.5H9V15.5M12,2L17.5,11H6.5L12,2M12,5.86L10.08,9H13.92L12,5.86M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13M17.5,15A2.5,2.5 0 0,0 15,17.5A2.5,2.5 0 0,0 17.5,20A2.5,2.5 0 0,0 20,17.5A2.5,2.5 0 0,0 17.5,15Z' /%3E%3C/svg%3E");
    }
    [data-type=draw] .title::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230041703a' viewBox='0 0 24 24'%3E%3Ctitle%3Evector-square-edit%3C/title%3E%3Cpath d='M22.7 14.4L21.7 15.4L19.6 13.3L20.6 12.3C20.8 12.1 21.2 12.1 21.4 12.3L22.7 13.6C22.9 13.8 22.9 14.1 22.7 14.4M13 19.9L19.1 13.8L21.2 15.9L15.1 22H13V19.9M11 19.9V19.1L11.6 18.5L12.1 18H8V16H6V8H8V6H16V8H18V12.1L19.1 11L19.3 10.8C19.5 10.6 19.8 10.4 20.1 10.3V8H22.1V2H16.1V4H8V2H2V8H4V16H2V22H8V20L11 19.9M18 4H20V6H18V4M4 4H6V6H4V4M6 20H4V18H6V20Z' /%3E%3C/svg%3E");
    }
  `;
}

customElements.define("eox-layercontrol-layer", EOxLayerControlLayer);
