/**
 * Whether a schema has feature/feature format or not
 */
export const isSelection = (schema) =>
  ["feature", "features"].some((f) => schema?.format === f);

/**
 * Whether a schema has ploygon/polygons format or not
 */
export const isPolygon = (schema) =>
  ["polygon", "polygons"].some((p) => schema?.format === p);

/**
 * Whether a schema has point/points format or not
 */
export const isPoint = (schema) =>
  ["point", "points"].some((p) => schema?.format === p);

/**
 * Whether a schema has bbox/bboxes format or not
 */
export const isBox = (schema) =>
  ["bounding-boxes", "bounding-box"].some((p) => schema?.format === p);

/**
 * Whether a schema expects multiple values not
 */
export const isMulti = (schema) =>
  ["bounding-boxes", "polygons", "features", "points"].some(
    (m) => schema?.format === m,
  );

/**
 * Whether a schema is supported by the spatial editor
 **/
export const isSupported = (schema) =>
  isSelection(schema) || isPolygon(schema) || isBox(schema) || isPoint(schema);

/**
 * Set multiple attributes to an element
 *
 * @param {Element} element - The DOM element to set attributes on
 * @param {{[key: string]: any}} attributes - The attributes to set on the element
 */
export function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}

/**
 * Check if a value satisfies a given type
 * supported types: "string", "number", "boolean", "array", "object"
 *
 * @param {*} val
 * @param {string} type
 * @returns {boolean}
 */
export const satisfiesType = (val, type) => {
  if (!val || !type) {
    return false;
  }

  switch (type) {
    case "string":
      return typeof val === "string";

    case "number":
      return !isNaN(val);

    case "boolean":
      return typeof val === "boolean";

    case "array":
      return Array.isArray(val);

    case "object":
      return typeof val === "object" && !!Object.keys(val).length;
  }
  return false;
};
