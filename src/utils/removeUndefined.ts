/**
 * Creates a new object, omitting any properties from the input object that have `undefined` as their value.
 * @param obj The object to clean.
 * @returns A new object with undefined properties removed.
 */
export const removeUndefinedProps = <T extends object>(obj: T): T => {
    const newObj = {} as T;
    for (const key in obj) {
      if (obj[key] !== undefined) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
}