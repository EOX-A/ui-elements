import items from "../test/testItems.json";
import { html } from "lit";

/**
 * Generates a story configuration for the Result Action.
 *
 * @returns {Object} The story configuration with arguments for the component and a play function for interaction testing.
 */
function ResultAction() {
  return {
    render: (args) =>
      html`<eox-itemfilter
        id="result-action"
        .items=${args.items}
        .titleProperty=${args.titleProperty}
        .aggregateResults=${args.aggregateResults}
        .filterProperties=${args.filterProperties}
        .resultActionIcon=${args.resultActionIcon}
        @result-action=${(evt) => alert(`${evt.detail.title} clicked!`)}
      ></eox-itemfilter>`,
    args: {
      inlineMode: false,
      titleProperty: "title",
      aggregateResults: "themes",
      subTitleProperty: "description",
      resultActionIcon:
        '<svg style="width: 24px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>click me!</title><path fill="#004170" d="M11.5,11L17.88,16.37L17,16.55L16.36,16.67C15.73,16.8 15.37,17.5 15.65,18.07L15.92,18.65L17.28,21.59L15.86,22.25L14.5,19.32L14.24,18.74C13.97,18.15 13.22,17.97 12.72,18.38L12.21,18.78L11.5,19.35V11M10.76,8.69A0.76,0.76 0 0,0 10,9.45V20.9C10,21.32 10.34,21.66 10.76,21.66C10.95,21.66 11.11,21.6 11.24,21.5L13.15,19.95L14.81,23.57C14.94,23.84 15.21,24 15.5,24C15.61,24 15.72,24 15.83,23.92L18.59,22.64C18.97,22.46 19.15,22 18.95,21.63L17.28,18L19.69,17.55C19.85,17.5 20,17.43 20.12,17.29C20.39,16.97 20.35,16.5 20,16.21L11.26,8.86L11.25,8.87C11.12,8.76 10.95,8.69 10.76,8.69M15,10V8H20V10H15M13.83,4.76L16.66,1.93L18.07,3.34L15.24,6.17L13.83,4.76M10,0H12V5H10V0M3.93,14.66L6.76,11.83L8.17,13.24L5.34,16.07L3.93,14.66M3.93,3.34L5.34,1.93L8.17,4.76L6.76,6.17L3.93,3.34M7,10H2V8H7V10" /></svg>',
      filterProperties: [
        {
          keys: ["title", "themes"],
          title: "Search",
          type: "text",
          placeholder: "Type Something...",
          expanded: true,
          validation: {
            pattern: ".{0,10}",
            message: "Maximum 10 characters",
          },
        },
        {
          key: "code",
          title: "Codes",
          type: "multiselect",
          placeholder: "Search Codes",
        },
        {
          key: "themes",
          title: "Theme",
          type: "select",
          placeholder: "Select a theme",
          inline: false,
        },
        {
          key: "tags",
          title: "Tags",
          type: "multiselect",
          placeholder: "Select tags",
          inline: false,
        },
        {
          key: "timestamp",
          type: "range",
          format: "date",
        },
        {
          key: "correlation",
          title: "Correlation",
          type: "range",
          step: 0.1,
        },
        {
          key: "geometry",
          type: "spatial",
        },
      ],
      items,
    },
  };
}

export default ResultAction;
