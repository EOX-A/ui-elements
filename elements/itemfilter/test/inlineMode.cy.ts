import "../src/main";
import testItems from "./testItems.json";

describe("Item Filter", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.mount(`<eox-itemfilter>
      <h4 slot="filterstitle">Filter</h4>
      <h4 slot="resultstitle">Results</h4>
    </eox-itemfilter>`).as(
      "eox-itemfilter"
    ).then((eoxItemFilter: any) => {
      eoxItemFilter[0].config = {
        titleProperty: "title",
        filterProperties: [{ key: "themes" }],
        aggregateResults: "themes",
        enableSearch: true,
        enableHighlighting: true,
        fuseConfig: {
          keys: ["title", "description", "themes"],
        },
        // onSelect: (item: any) => {
        //   console.log(item);
        // },
        // matchAllWhenEmpty: true,
        // exclusiveFilters: true,
      };
      eoxItemFilter[0].apply(testItems); 
    });
  });

  it("loads the itemfilter", () => {
    cy.get("eox-itemfilter").should(($el) => {
      const EOxItemFilter = <EOxItemFilter>$el[0];
      EOxItemFilter.style.height = "100px";
      EOxItemFilter.style.border = "1px solid grey";
      EOxItemFilter.config = {
        titleProperty: "title",
        filterProperties: [{ key: "themes" }, { key: "code" }],
        enableSearch: true,
        showResults: false,
        inlineMode: true,
      };
      EOxItemFilter.apply(testItems);
    });
  });
});
