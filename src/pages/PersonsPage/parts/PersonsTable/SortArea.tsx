import PropTypes from "prop-types";

import { connect } from "react-redux";

import createSortOrderMarker from "./scripts/createSortOrderMarker";

import { headings, nonSortableColumns } from "../../../../config";
import { sort } from "js/redux/actions";
import { Header } from "styles/style";
import { AppDispatch, RootStateType } from "components/AppProvider";

interface Props {
    columnSortBy: number | undefined;
    isSortDescending: true | false;
    onSort:Function;
   
}



const PersonsTableSortArea = (props:Props) => {
  const { columnSortBy,isSortDescending, onSort } = props;
  
  const handleSort = (e: { target: { cellIndex: any }}) => {
    const targetColumn = e.target.cellIndex;
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
          <Header.Section key={item} focusable={!nonSortableColumns.has(index)}>   {item + createSortOrderMarker(index, isSortDescending, columnSortBy)} </Header.Section>
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
  onSort: (data:any) => dispatch(sort(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTableSortArea);

