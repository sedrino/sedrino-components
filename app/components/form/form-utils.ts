/**
 * Utility functions and types for form components
 */

// Define primitive types that our form components can work with
export type PrimitiveValueType = string | number | boolean | null | undefined;

/**
 * Converts a primitive value to a safe string representation
 * 
 * @param value - Any primitive value to convert
 * @returns A string representation that preserves the value type
 */
export function valueToString(value: PrimitiveValueType): string {
  if (value === "") return "__empty__";
  if (value === undefined) return "__undefined__";
  if (value === null) return "__null__";
  if (typeof value === "number" && isNaN(value)) return "__NaN__";
  if (value === Infinity) return "__Infinity__";
  if (value === -Infinity) return "__-Infinity__";
  if (value === false) return "__false__";
  if (value === true) return "__true__";
  return String(value);
}

/**
 * Converts a string representation back to its original primitive value
 * 
 * @param str - String representation of a primitive value
 * @returns The original primitive value
 */
export function stringToValue(str: string): PrimitiveValueType {
  if (str === "__empty__") return "";
  if (str === "__undefined__") return undefined;
  if (str === "__null__") return null;
  if (str === "__NaN__") return NaN;
  if (str === "__Infinity__") return Infinity;
  if (str === "__-Infinity__") return -Infinity;
  if (str === "__false__") return false;
  if (str === "__true__") return true;
  
  // Try to parse as number if it looks like one
  if (/^-?\d+(\.\d+)?$/.test(str)) {
    return parseFloat(str);
  }
  
  return str;
}

/**
 * Creates value conversion maps for a collection of values
 * 
 * @param values - Array of primitive values to create conversion maps for
 * @returns Object containing maps for bidirectional conversion
 */
export function createValueMaps<T extends PrimitiveValueType>(values: T[]) {
  const valueToStringMap = new Map<T, string>();
  const stringToValueMap = new Map<string, T>();

  values.forEach((value) => {
    const strValue = valueToString(value);
    valueToStringMap.set(value, strValue);
    stringToValueMap.set(strValue, value);
  });

  return {
    valueToString: valueToStringMap,
    stringToValue: stringToValueMap
  };
}

/**
 * Creates value conversion maps from option objects
 * 
 * @param options - Array of option objects with value property
 * @returns Object containing maps for bidirectional conversion
 */
export function createValueMapsFromOptions<T extends PrimitiveValueType>(
  options: Array<{ value: T } & Record<string, any>>
) {
  return createValueMaps(options.map(option => option.value));
}