import isEqual from "lodash/isEqual";
import nth from "lodash/nth";

export default function checkDuplicates(source, pattern, column) {
  const comparator = item => isEqual(nth(item, column), nth(pattern, column));
  const result = source.filter(comparator);
  return !(result.length > 0);
}
