import { html, render } from "lit";
import { TemplateElement } from "../../../../utils/templateElement";

export class EOxMapTooltip extends TemplateElement {
  static get properties() {
    return {
      propertyTransform: { attribute: false, property: true, type: Function },
    };
  }

  constructor() {
    super();
    this.propertyTransform = (property, _feature) => property;
  }

  renderContent(feature) {
    render(
      this.hasTemplate("properties")
        ? html`${this.renderTemplate(
            "properties",
            feature.getProperties(),
            // `tooltip-${this.content.id}`
            "tooltip-1"
          )}`
        : html` <style>
              ul {
                margin: 0;
                padding: 15px 15px 15px 30px;
                background: #0008;
                border-radius: 15px;
                color: white;
                max-width: 250px;
                font-size: small;
              }
              span {
                font-weight: bold;
              }
            </style>
            <ul>
              ${Object.entries(feature.getProperties())
                .map(([key, value]) =>
                  this.propertyTransform({ key, value }, feature)
                )
                .filter((v) => v)
                .map(
                  ({ key, value }) =>
                    html`<li><span>${key}</span>: ${value}</li>`
                )}
            </ul>`,
      this.shadowRoot
    );
  }
}

customElements.define("eox-map-tooltip", EOxMapTooltip);
