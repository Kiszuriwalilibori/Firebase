import { connect } from "react-redux";

import createSortOrderMarker from "./scripts/createSortOrderMarker";

import { tableHeadings, nonSortableColumns } from "../../../../config";
import { sortPersons } from "js/redux/actions";
import { Header } from "styles/style";
import { AppDispatch, RootStateType } from "components";
import { HTMLClick } from "types/index";

interface Props {
    columnSortBy: number | undefined;
    isSortDescending: true | false;
    sortPersons: Function;
}
interface SortParams {
    isSortDescending: boolean;
    columnSortBy: number;
}

const PersonsTableSortArea = (props: Props) => {
    const { columnSortBy, isSortDescending, sortPersons } = props;

    const handleSort = (e: React.MouseEvent<HTMLTableCellElement>) => {
        const { target } = e;
        const targetColumn = (target as HTMLTableCellElement).cellIndex;
        const columnNotExcludedFromSorting = nonSortableColumns === undefined || !nonSortableColumns.has(targetColumn);

        if (columnNotExcludedFromSorting) {
            const isDescending = columnSortBy === targetColumn && !isSortDescending;
            const data = {
                isSortDescending: isDescending,
                columnSortBy: targetColumn,
            };
            sortPersons(data);
        }
    };
    return (
        <Header.Wrapper onClick={handleSort as HTMLClick}>
            <tr>
                {tableHeadings.map((item, index) => (
                    <Header.Section
                        role="button"
                        aria-label={`Sort by ${item}`}
                        key={item}
                        focusable={!nonSortableColumns.has(index)}
                    >
                        {" "}
                        {item + createSortOrderMarker(index, isSortDescending, columnSortBy)}{" "}
                    </Header.Section>
                ))}
            </tr>
        </Header.Wrapper>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    columnSortBy: state.columnSortBy,
    isSortDescending: state.isSortDescending,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    sortPersons: (sortParams: SortParams) => dispatch(sortPersons(sortParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTableSortArea);
