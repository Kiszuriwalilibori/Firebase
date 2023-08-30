import lowerCase from "lodash/lowerCase";

export function sortFigures(table:string[][], isDescending:boolean, key:number, func = lowerCase) {

  const comparatorDescending = (a:string[], b:string[]) => {
 
    if (func(a[key]) > func(b[key])) {
      return -1;
    }
    if (func(b[key]) > func(a[key])) {
      return 1;
    }
    return 0;
  };

  const comparatorAscending = (a:string[], b:string[]) => {
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

export default sortFigures;