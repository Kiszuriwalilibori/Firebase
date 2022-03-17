import _ from 'lodash';

//export const limitStatus = (source, limit) => !(source.length >= limit);

export function checkDuplicates(source, pattern, column) {
    const comparator = item => _.isEqual(_.nth(item, column), _.nth(pattern, column));
    const result = source.filter(comparator);
    return !(result.length > 0);
}

export const sortFigures = (table, is_descending, key, func = _.lowerCase) => {
    const comparator_descending = (a, b) => {
        if (func(a[key]) > func(b[key])) {
            return -1;
        }
        if (func(b[key]) > func(a[key])) {
            return 1;
        }
        return 0;
    };

    const comparator_ascending = (a, b) => {
        if (func(a[key]) > func(b[key])) {
            return 1;
        }
        if (func(b[key]) > func(a[key])) {
            return -1;
        }
        return 0;
    };

    return is_descending ? [...table].sort(comparator_descending) : [...table].sort(comparator_ascending);
};
