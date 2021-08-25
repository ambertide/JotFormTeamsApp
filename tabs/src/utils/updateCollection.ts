import I from "immutable";

/**
 * Return the updated version of the original collection, where
 * the updated new collection's elements are updated by calculating
 * their keys in according to a resolver function.
 * @param originalCollection The original indexed collection.
 * @param newCollection Another collection.
 * @param keyResolver Function that returns the key of an element,
 * the keys within the indexed collection must be unique.
 * @return A new collection, consisting of the elements of the
 * newCollection in addition to elements from the originalCollection
 * whose keys do not appear in the newCollection.
 */
export default function updateCollection<T, V>(
  originalCollection: I.Collection.Indexed<T>,
  newCollection: I.Collection.Indexed<T>,
  keyResolver: (elem: T) => V
) {
  // Get the keys of the new collection.
  const newKeys = newCollection.map((element) => keyResolver(element)).toSet();
  // Preserve values whose keys do not appear in the newKeys
  const preservedValues = originalCollection.filter((elem) => !newKeys.has(keyResolver(elem)));
  // Join that with the new collection, effectively updating the old values
  // And adding any new ones while preserving old ones.
  return preservedValues.concat(newCollection);
}
