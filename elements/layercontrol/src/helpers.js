import Sortable from "sortablejs";
import { getUid } from "ol/util";

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
      layer.set(idProperty, getUid(layer));
    }
    if (!layer.get(titleProperty)) {
      layer.set(titleProperty, `layer ${getUid(layer)}`);
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

/**
 * Update layer's URL using input values
 * @param {String} url
 * @param {Object} values
 * @param {import("ol/layer").Layer | false} layer
 */
export function updateUrl(url, values) {
  const searchParams = new URL(url).searchParams;

  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      Object.keys(value).forEach((k) => {
        searchParams.set(k, value[k]);
      });
    } else searchParams.set(key, value);
  });

  const urlWithPath = url.split("?")[0];
  const searchParamsStr = searchParams.toString();
  const newUrl = `${urlWithPath}?${searchParamsStr}`;

  return newUrl;
}

/**
 * Recursive function to retrieve startVal inside schema
 *
 * @param {{[key: string]: any}} schema
 * @param {{[key: string]: any}} queryParams
 */
export function getNestedStartVals(schema, queryParams) {
  let startVals = {};

  for (const key in schema) {
    const type = schema[key].type;
    if (type && type !== "object") {
      startVals[key] =
        type === "number" ? Number(queryParams[key]) : queryParams[key];
    } else if (typeof schema[key] === "object" && schema[key]?.properties) {
      const nestedStartVals = getNestedStartVals(
        schema[key].properties,
        queryParams
      );
      if (Object.keys(nestedStartVals).length > 0) {
        startVals[key] = nestedStartVals;
      }
    }
  }
  return startVals;
}

/**
 * Get startVals from Query Params
 *
 * @param {import("ol/layer").Layer} layer
 * @param {{[key: string]: any}} layerConfig
 */
export function getStartVals(layer, layerConfig) {
  if (!layer.getSource().getTileUrlFunction()) return null;

  const url = new URL(layer.getSource().getTileUrlFunction()([0, 0, 0]));
  const queryParams = Object.fromEntries(url.searchParams.entries());
  const startVals = getNestedStartVals(
    layerConfig.schema?.properties || layerConfig.schema,
    queryParams
  );

  return Object.keys(startVals).length ? startVals : null;
}
