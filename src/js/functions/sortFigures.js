import lowerCase from "lodash/lowerCase";

export default function sortFigures(table, isDescending, key, func = lowerCase) {
  const comparatorDescending = (a, b) => {
    if (func(a[key]) > func(b[key])) {
      return -1;
    }
    if (func(b[key]) > func(a[key])) {
      return 1;
    }
    return 0;
  };

  const comparatorAscending = (a, b) => {
    if (func(a[key]) > func(b[key])) {
      return 1;
    }
    if (func(b[key]) > func(a[key])) {
      return -1;
    }
    return 0;
  };

  return isDescending ? [...table].sort(comparatorDescending) : [...table].sort(comparatorAscending);
}
