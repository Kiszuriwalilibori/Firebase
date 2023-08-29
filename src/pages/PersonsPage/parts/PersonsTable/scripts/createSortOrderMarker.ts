export function createSortOrderMarker(index: number, isSortDescending: boolean, columnSortBy: number | undefined) {
    if (columnSortBy === undefined) return "";
    const isCurrentColumnSorted = (x: number) => columnSortBy === x;

    const arrow = isSortDescending ? "\u2191" : "\u2193";
    return isCurrentColumnSorted(index) ? " " + arrow : "";
}

export default createSortOrderMarker;
