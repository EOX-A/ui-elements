import Sortable from "sortablejs";
export { default as fetchCapabilities } from "./fetch-capabilities";
export { default as detectMapURLType } from "./detect-map-url-type";
export { default as isMapUrlValid } from "./is-map-url-valid";
export { default as cleanJSONInput } from "./clean-json-input";
export { default as isLayerJSONValid } from "./is-layer-json-valid";
export { default as updateUrl } from "./update-url";
export { getNestedStartVals, getStartVals } from "./get-start-vals";

/**
 *
 * @param {HTMLElement} element
 * @param {import("ol").Collection<import("ol/layer").Layer | import("ol/layer").Group>} collection
 * @param {string} idProperty
 * @param {import("lit").LitElement} that
 */
export const createSortable = (element, collection, idProperty, that) => {
  /**
   * @type {any[]}
   */
  let childNodes = [];
  /**
   * @type {HTMLElement}
   */
  let related = null;
  /** @type HTMLElement & {_sortable: import("sortablejs")}*/ (
    element
  )._sortable = Sortable.create(element, {
    handle: ".drag-handle",
    filter: ".drag-handle.disabled",
    swapThreshold: 0.5,
    animation: 150,
    easing: "cubic-bezier(1, 0, 0, 1)",
    onStart: (e) => {
      // https://github.com/SortableJS/Sortable/issues/546
      const node = e.item;
      // Remember the list of child nodes when drag started.
      childNodes = Array.prototype.slice.call(node.parentNode.childNodes);
      // Filter out the 'sortable-fallback' element used on mobile/old browsers.
      childNodes = childNodes.filter(
        (node) =>
          node.nodeType != Node.ELEMENT_NODE ||
          !node.classList.contains("sortable-fallback")
      );
    },
    onMove(e) {
      related = e.related;
    },
    onEnd: (e) => {
      // Undo DOM changes by re-adding all children in their original order.
      const node = e.item;
      const parentNode = node.parentNode;
      for (const childNode of childNodes) {
        parentNode.appendChild(childNode);
      }
      if (e.oldIndex == e.newIndex) return;
      // Then move the element using your own logic.
      // automatically dispatches "sort" event
      const layers = collection.getArray();
      const layer = layers.find(
        (l) =>
          l.get(idProperty) ===
          /** @type Element & {layer: import("ol/layer").Layer} */ (
            e.item.querySelector("eox-layercontrol-layer")
          ).layer.get(idProperty)
      );
      const relatedLayer = layers.find(
        (layer) => layer.get(idProperty) == related.dataset.layer
      );
      let draggedIndex;
      let dropIndex;
      for (draggedIndex = 0; draggedIndex < layers.length; draggedIndex++) {
        if (layers[draggedIndex] == layer) {
          collection.removeAt(draggedIndex);
          break;
        }
      }
      for (dropIndex = 0; dropIndex < layers.length; dropIndex++) {
        if (layers[dropIndex] === relatedLayer) {
          if (draggedIndex > dropIndex) collection.insertAt(dropIndex, layer);
          else collection.insertAt(dropIndex + 1, layer);
          break;
        }
      }
      that.requestUpdate();
    },
  });
};

/**
 * Initially check if all layers have an id and title,
 * fill in some backup in case they haven't
 *
 * @param {import("ol").Collection<import("ol/layer").Layer | import("ol/layer").Group>} collection
 * @param {string} idProperty
 * @param {string} titleProperty
 */
//
export function checkProperties(collection, idProperty, titleProperty) {
  const layerArray = collection.getArray();
  layerArray.forEach((layer) => {
    if (!layer.get(idProperty)) {
      //@ts-ignore
      layer.set(idProperty, layer.ol_uid);
    }
    if (!layer.get(titleProperty)) {
      //@ts-ignore
      layer.set(titleProperty, `layer ${layer.ol_uid}`);
    }
  });
}
/**
 * Filter all map layers by property
 *
 * @param {Array<import("ol/layer").Layer>} layers
 * @param {string} key
 * @param {any} value
 * @returns {Array<import("ol/layer").Layer>} found layers
 */
export const filterLayers = (layers, key, value) => {
  /**
   * @type {any[]}
   */
  let found = [];
  /**
   *
   * @param {any[]} searchLayers
   * @param {string} key
   * @param {any} value
   */
  const search = (searchLayers, key, value) => {
    found = [...found, ...searchLayers.filter((l) => l.get(key) === value)];
    const groups = searchLayers.filter((l) => l.getLayers);
    if (groups.length > 0) {
      groups.forEach((group) =>
        search(group.getLayers().getArray(), key, value)
      );
    }
    return found;
  };
  search(layers, key, value);
  return found;
};

/**
 * Trying to guess the layer type from certain properties.
 * The proper way would be to use instanceOf, but for this
 * we'd need OL as a dependency, which we're trying to avoid
 * @param {import("ol/layer").Layer | import("ol/layer").Group} layer
 * @param {import("ol").Map} map
 */
export const getLayerType = (layer, map) => {
  if (!layer || !map) {
    return undefined;
  }
  return /** @type {import("ol/layer").Group} */ (layer).getLayers
    ? "group"
    : map
        .getInteractions()
        .getArray()
        // @ts-ignore
        .filter((i) => i.freehand_ !== undefined)
        // @ts-ignore
        .map((i) => i.source_)
        // @ts-ignore
        ?.ol_uid?.includes(
          // @ts-ignore
          layer.getSource ? layer.getSource()?.ol_uid : undefined
        )
    ? "draw"
    : // @ts-ignore
    layer.declutter_ !== undefined
    ? "vector"
    : "raster";
};

/**
 * Returns whether zoom layer state be enabled or not for a particular layer
 * @param {import("ol/layer").Layer | import("ol/layer").Group} layer
 * @param {Boolean} showLayerZoomState
 * @returns {Boolean} state
 */
export const isLayerZoomStateRequired = (layer, showLayerZoomState) => {
  const minZoom = layer.get("minZoom");
  const maxZoom = layer.get("maxZoom");

  if (showLayerZoomState && (minZoom !== -Infinity || maxZoom !== Infinity))
    return true;
  else return false;
};

/**
 * Returns layer visibility state based on minZoom and maxZoon
 * with respective of current zoom level
 * @param {import("ol/layer").Layer | import("ol/layer").Group} layer
 * @param {import("ol").Map} map
 * @param {Boolean} showLayerZoomState
 * @returns {Boolean} state
 */
export const isLayerVisibleBasedOnZoomState = (
  layer,
  map,
  showLayerZoomState
) => {
  if (!layer || !map) return false;

  if (!isLayerZoomStateRequired(layer, showLayerZoomState)) return true;

  const minZoom = layer.get("minZoom");
  const maxZoom = layer.get("maxZoom");
  const zoom = map.getView().getZoom();

  return zoom > minZoom && zoom < maxZoom ? true : false;
};
