import { connect } from "react-redux";

import createSortOrderMarker from "./scripts/createSortOrderMarker";

import { headings, nonSortableColumns } from "../../../../config";
import { sort } from "js/redux/actions";
import { Header } from "styles/style";
import { AppDispatch, RootStateType } from "components";

interface Props {
    columnSortBy: number | undefined;
    isSortDescending: true | false;
    onSort:Function;
   
}
interface SortParams {
        isSortDescending: boolean,
        columnSortBy: number,
      };


const PersonsTableSortArea = (props:Props) => {
  const { columnSortBy,isSortDescending, onSort } = props;
  
  const handleSort = (e:  React.MouseEvent<HTMLTableCellElement>) => {
    const {target} = e;
    const targetColumn = (target as HTMLTableCellElement).cellIndex;
    const columnNotExcludedFromSorting = nonSortableColumns === undefined || !nonSortableColumns.has(targetColumn);

    if (columnNotExcludedFromSorting) {
      const isDescending = columnSortBy === targetColumn && !isSortDescending;
      const data = {
        isSortDescending: isDescending,
        columnSortBy: targetColumn,
      };

      onSort(data);
    }
  };
  return (
    <Header.Wrapper onClick={handleSort}>
      <tr>
        {headings.map((item, index) => (
          <Header.Section role="button" aria-label ={`Sort by ${item}`} key={item} focusable={!nonSortableColumns.has(index)}>   {item + createSortOrderMarker(index, isSortDescending, columnSortBy)} </Header.Section>
        ))}
      </tr>
    </Header.Wrapper>
  );
};

const mapStateToProps = (state:RootStateType) => ({
  columnSortBy: state.columnSortBy,
  isSortDescending: state.isSortDescending,
  
});

const mapDispatchToProps = (dispatch:AppDispatch) => ({
  onSort: (sortParams:SortParams) => dispatch(sort(sortParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTableSortArea);

