/**
 * Returns a random integer in interval [min, man] (both included)
 * @param {integer} min
 * @param {integer} max
 */
export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}; // randomIntFromInterval

/**
 * Checks if given object owns the methods defined in a reference interface object.
 * @param {any} obj
 * @param {any} interfaceObj
 * @returns
 */
export const implementsInterface = (obj, interfaceObj) => {
  for (const method in interfaceObj) {
    if (!(method in obj) || typeof obj[method] !== "function") return false;
  }
  return true;
}; // implementsInterface

export const instantiateFromClassData = (obj) => {
  // Check if the object is in the { class, data } format
  if (obj && obj.class && obj.data) {
    /*
    // Retrieve the class constructor from the global scope
    const ClassConstructor = globalThis[obj.class];
    if (!ClassConstructor) {
      throw new Error(`Class ${obj.class} not found.`);
    }
    */
    // Process the data recursively to handle nested { class, data } structures
    const processedData = {};
    for (const [key, value] of Object.entries(obj.data)) {
      processedData[key] = processValue(value); // Recursively process each field in data
    }

    // Instantiate the class with processed data, passing it as a single argument object
    return Reflect.construct(obj.class, [processedData]);
  }

  // If it's not in { class, data } format, return as-is (e.g., primitive or other structures)
  return obj;
}; //instantiateFromClassData

// Helper function to handle recursive instantiation
const processValue = (value) => {
  if (Array.isArray(value)) {
    // Recursively instantiate each element in an array
    return value.map((item) => instantiateFromClassData(item));
  } else if (typeof value === "object" && value !== null) {
    // Recursively instantiate objects in { class, data } format
    return instantiateFromClassData(value);
  } else {
    // For primitive values, return them directly
    return value;
  }
}; // processValue
