import { connect } from "react-redux";

import createSortOrderMarker from "./scripts/createSortOrderMarker";

import { tableHeadings } from "../../../../config";
import { sortPersons } from "reduxware/actions";
import { Header } from "styles/style";
import { AppDispatch, RootStateType } from "components";
import { HTMLClick, SortParams } from "types/index";

const nonSortableColumns = new Set<number>([0]);

interface Props {
    sortPersons: (arg0: SortParams) => void;
    sortParams: SortParams;
}

const PersonsTableSortArea = (props: Props) => {
    const { sortPersons, sortParams } = props;

    const handleSort = (e: React.MouseEvent<HTMLTableCellElement>) => {
        const { target } = e;
        const targetColumn = (target as HTMLTableCellElement).cellIndex;
        const columnNotExcludedFromSorting = nonSortableColumns === undefined || !nonSortableColumns.has(targetColumn);

        if (columnNotExcludedFromSorting) {
            const data = {
                isDescending: sortParams.column === targetColumn && !sortParams.isDescending,
                column: targetColumn,
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
                        {item + createSortOrderMarker(index, sortParams.isDescending, sortParams.column)}{" "}
                    </Header.Section>
                ))}
            </tr>
        </Header.Wrapper>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    sortParams: state.sortParams,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    sortPersons: (sortParams: SortParams) => dispatch(sortPersons(sortParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTableSortArea);
