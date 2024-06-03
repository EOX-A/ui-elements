// Global import of eox-elements in .storybook/preview.js!
import { html } from "lit";
import items from "./test/testItems.json";
import "./src-v2/main.js";
import "./src-v2/components/selector.js";

export default {
  title: "Elements/eox-itemfilter",
  tags: ["autodocs"],
  component: "eox-itemfilter",
  render: (args) =>
    html`<eox-itemfilter
      .config=${args.config}
      .items=${args.items}
    ></eox-itemfilter>`,
};

export const Primary = {
  args: {
    config: {
      titleProperty: "title",
      filterProperties: [
        {
          keys: ["title", "themes"],
          title: "Search",
          type: "text",
          expanded: true,
          // state: {
          //   title: "no2",
          //   themes: "no2",
          // },
        },
        {
          key: "themes",
          title: "Theme",
          type: "multiselect",
          // state: {
          //   air: true,
          //   agriculture: true,
          // },
        },
        {
          key: "timestamp",
          type: "range",
          format: "date",
          // state: {
          //   min: 1685232950,
          //   max: 1686454646,
          // },
        },
        {
          key: "geometry",
          type: "spatial",
          // state: {
          //   mode: "within",
          //   geometry: {
          //     type: "Polygon",
          //     coordinates: [
          //       [
          //         [-97.71428571428572, 38.00407795331557],
          //         [-102.00000000000001, -40.329636215359066],
          //         [81.85714285714282, -47.42214099287611],
          //         [50.57142857142855, 51.0574434128921],
          //         [-97.71428571428572, 38.00407795331557],
          //       ],
          //     ],
          //   },
          // },
        },
      ],
      aggregateResults: "themes",
      enableHighlighting: false,
      onSelect: (item) => {
        console.log(item);
      },
    },
    items,
  },
};

export const AutoSpread = {
  args: {
    config: {
      titleProperty: "title",
      filterProperties: [
        {
          keys: ["title", "themes"],
          title: "Search",
          type: "text",
          expanded: true,
        },
        {
          key: "themes",
          title: "Theme",
          type: "multiselect",
        },
        {
          key: "timestamp",
          type: "range",
          format: "date",
        },
        {
          key: "geometry",
          type: "spatial",
        },
      ],
      aggregateResults: "themes",
      autoSpreadSingle: true,
      enableHighlighting: true,
      onSelect: (item) => {
        console.log(item);
      },
    },
    items,
  },
};

export const MultiSelect = {
  args: {
    config: {
      titleProperty: "title",
      filterProperties: [
        {
          key: "themes",
          title: "Theme",
          type: "multiselect",
          expanded: true,
          state: {
            air: true,
            agriculture: true,
          },
        },
      ],
    },
    items,
  },
};

export const SortedMultiSelect = {
  args: {
    config: {
      titleProperty: "title",
      filterProperties: [
        {
          key: "themes",
          title: "Theme",
          type: "multiselect",
          expanded: true,
          sort: (a, b) => b.localeCompare(a),
          state: {
            air: true,
            agriculture: true,
          },
        },
      ],
    },
    items,
  },
};

export const InlineMode = {
  args: {
    config: {
      inlineMode: true,
      titleProperty: "title",
      filterProperties: [
        {
          key: "themes",
          id: "themes",
          title: "Theme",
          type: "multiselect",
          state: {
            air: null,
            agriculture: null,
          },
        },
        {
          key: "timestamp",
          id: "date",
          title: "Date",
          type: "range",
          format: "date",
          state: {
            min: 1685232950,
            max: 1686454646,
          },
        },
        {
          key: "geometry",
          id: "spatial",
          type: "spatial",
          title: "Spatial",
          state: {
            mode: "intersects",
          },
        },
        {
          key: "code",
          id: "code",
          title: "Code",
          type: "multiselect",
          // state: {
          //   air: true,
          //   agriculture: true,
          // },
        },
        {
          keys: ["title", "themes"],
          title: "Search",
          id: "search",
          type: "text",
          expanded: true,
          state: {
            title: "no2",
            themes: "no2",
          },
        },
      ],
      onFilter: (items) => console.log(items),
    },
    items,
  },
};

export const ItemFilter2 = {
  render: () => html`
    <eox-itemfilter-v2
      .items=${items}
      .config=${{
        inlineMode: false,
        titleProperty: "title",
        aggregateResults: "themes",
        enableHighlighting: true,
        autoSpreadSingle: true,
        filterProperties: [
          {
            keys: ["title", "themes"],
            title: "Search",
            type: "text",
            placeholder: "Type Something...",
            expanded: true,
          },
          {
            key: "themes",
            title: "Theme",
            type: "multiselect",
            expanded: true,
          },
        ],
      }}
    ></eox-itemfilter-v2>
  `,
};

export const Dropdown = {
  render: () => html`
    <eox-selector
      .suggestions="${[
        "Apple",
        "Banana",
        "Cherry",
        "Date",
        "Fig",
        "Grape",
        "Honeydew",
      ]}"
      .multiple="${true}"
      type="multiautocomplete"
    ></eox-selector>
  `,
};
