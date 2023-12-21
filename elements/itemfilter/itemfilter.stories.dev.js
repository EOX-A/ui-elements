import { html } from "lit";
import { EOxItemFilter } from "./src/main";
import "./src/main";
import "./src/autocomplete";
import "./src/selectionlist";
import "./src/chips";
import "../map/main";
import items from "./test/testItems.json";

export default {
  title: "Elements/eox-itemfilter",
  tags: ["autodocs"],
  component: "eox-itemfilter",
  render: (args) => {
    const eoxItemFilter = new EOxItemFilter();
    eoxItemFilter.config = args;
    eoxItemFilter.apply(items);
    return eoxItemFilter;
  },
};

export const Autocomplete = {
  render: () => html`
    <eox-autocomplete
      .items=${[
        { id: "a", title: "Autobus" },
        { id: "b", title: "Bicycle" },
        { id: "c", title: "Catalog" },
      ]}
      @items-selected=${(evt) => {
        console.log(evt.detail);
      }}
    ></eox-autocomplete>
  `,
};

export const AutocompleteUnstyled = {
  render: () => html`
    <eox-autocomplete
      unstyled
      .items=${[
        { id: "a", title: "Autobus" },
        { id: "b", title: "Bicycle" },
        { id: "c", title: "Catalog" },
      ]}
      @items-selected=${(evt) => {
        console.log(evt.detail);
      }}
    ></eox-autocomplete>
  `,
};

export const AutocompleteMultiple = {
  render: () => html`
    <eox-autocomplete
      multiple
      .items=${[
        { id: "a", title: "Autobus" },
        { id: "b", title: "Bicycle" },
        { id: "c", title: "Catalog" },
      ]}
      @items-selected=${(evt) => {
        console.log(evt.detail);
      }}
    ></eox-autocomplete>
  `,
};

export const AutocompleteMultipleUnstyled = {
  render: () => html`
    <eox-autocomplete
      multiple
      unstyled
      .items=${[
        { id: "a", title: "Autobus" },
        { id: "b", title: "Bicycle" },
        { id: "c", title: "Catalog" },
      ]}
      @items-selected=${(evt) => {
        console.log(evt.detail);
      }}
    ></eox-autocomplete>
  `,
};

export const Chips = {
  render: () => html`
    <eox-itemfilter-chips
      .items=${[
        { id: "a", title: "Autobus" },
        { id: "b", title: "Bicycle" },
        { id: "c", title: "Catalog" },
      ]}
      @items-selected=${(evt) => {
        console.log(evt.detail);
      }}
    ></eox-itemfilter-chips>
  `,
};

export const ChipsUnstyled = {
  render: () => html`
    <eox-itemfilter-chips
      .items=${[
        { id: "a", title: "Autobus" },
        { id: "b", title: "Bicycle" },
        { id: "c", title: "Catalog" },
      ]}
      unstyled
      @items-selected=${(evt) => {
        console.log(evt.detail);
      }}
    ></eox-itemfilter-chips>
  `,
};

export const SelectionList = {
  render: () => html`
    <eox-selectionlist
      .items=${[
        { id: "a", title: "Autobus" },
        { id: "b", title: "Bicycle" },
        { id: "c", title: "Catalog" },
      ]}
      @items-selected=${(evt) => {
        console.log(evt.detail);
      }}
    ></eox-selectionlist>
  `,
};

export const SelectionListMultiple = {
  render: () => html`
    <eox-selectionlist
      multiple
      .items=${[
        { id: "a", title: "Autobus" },
        { id: "b", title: "Bicycle" },
        { id: "c", title: "Catalog" },
      ]}
      .selectedItems=${[{ id: "b", title: "Bicycle" }]}
      @items-selected=${(evt) => {
        console.log(evt.detail);
      }}
    ></eox-selectionlist>
  `,
};
