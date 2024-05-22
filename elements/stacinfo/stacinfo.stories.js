// Global import of eox-elements in .storybook/preview.js!
import { html } from "lit";

export default {
  title: "Elements/eox-stacinfo",
  tags: ["autodocs"],
  component: "eox-stacinfo",
  parameters: {
    componentSubtitle: "Automatically fetch & display properties of STAC files",
    layout: "fullscreen",
  },
  render: (args) => html`
    <eox-stacinfo
      for=${args.for}
      .header=${args.header}
      .tags="${args.tags}"
      .properties="${args.properties}"
      .featured=${args.featured}
      .footer=${args.footer}
      ?unstyled=${args.unstyled}
    ></eox-stacinfo>
  `,
};

/**
 * In its most basic form, the element fetches a STAC file and displays its properties.
 */
export const Basic = {
  args: {
    for: `${window.location.href.split("iframe.html")[0]}/collection.json`,
    header: ["title"],
    tags: ["tags"],
    properties: ["satellite", "sensor", "agency", "extent"],
    featured: ["description", "providers", "assets", "links"],
    footer: ["sci:citation"],
  },
};

/**
 * The rendered STAC properties can be whitelisted to show only certain properties (by setting the `properties` array). By default, title and description are always rendered at the top.
 */
export const PropertiesWhitelist = {
  args: {
    ...Basic.args,
    properties: [
      "title",
      "description",
      "osc:missions",
      "osc:project",
      "osc:region",
      "osc:status",
      "osc:themes",
      "osc:type",
    ],
  },
};

/**
 * If no `properties` whitelist is defined, all properties from the STAC JSON are rendered.
 */
export const AllProperties = {
  args: {
    ...Basic.args,
    // @ts-ignore
    properties: undefined,
    featured: undefined,
    footer: undefined,
  },
};

/**
 * If only one property is whitelisted, then it renders the content full-width and without the key.
 */
export const SingleProperty = {
  args: {
    ...Basic.args,
    header: [],
    subheader: [],
    properties: ["description"],
    featured: [],
    footer: [],
  },
};

/**
 * Individual STAC properties can be rendered in a more prominent way by using the `featured` property.
 */
export const FeaturedProperties = {
  args: {
    ...Basic.args,
    featured: ["description", "extent"],
    footer: undefined,
  },
};

/**
 * The footer allows to highlight one or more properties.
 */
export const Footer = {
  args: {
    ...Basic.args,
    featured: ["description", "extent"],
    footer: ["osc:project"],
  },
};

/**
 * Custom rendering of properties can be achieved using `slots`. Automatically generated slots are provided for properties, featured properties, featured summaries, header and footer.
 */
export const CustomSlotContent = {
  args: {
    ...Basic.args,
  },
  render: (args) => html`
    <eox-stacinfo
      id="slot"
      for=${args.for}
      .header=${args.header}
      .properties="${args.properties}"
      .featured=${args.featured}
      .footer=${args.footer}
      ?unstyled=${args.unstyled}
      style="width: 400px"
    >
      <div
        slot="agency"
        style="background: lightgrey; width: 100%; padding: 10px 20px; border-radius: 4px;"
      >
        <p>--> <strong>Agency:</strong> <span class="content"></span>!</p>
      </div>
    </eox-stacinfo>
    <script>
      const stacInfo = document.querySelector("eox-stacinfo#slot");
      stacInfo.addEventListener("loaded", () => {
        setTimeout(() => {
          const value = stacInfo.stacProperties["agency"];
          document.querySelector(".content").innerHTML = value.formatted;
        });
      });
    </script>
  `,
};

/**
 * By using the `unstyled` attribute, only the bare minimum styles are applied to the element.
 */
export const Unstyled = {
  args: {
    ...Footer.args,
    unstyled: true,
  },
};
