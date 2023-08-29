import PropTypes from "prop-types";

import { connect } from "react-redux";

import createSortOrderMarker from "./scripts/createSortOrderMarker";

import { headings, nonSortableColumns } from "../../../../config";
import { sort } from "js/redux/actions";
import { Header } from "styles/style";



const PersonsTableSortArea = props => {
  const { columnSortBy,isSortDescending, onSort } = props;
  
  const handleSort = e => {
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

const mapStateToProps = state => ({
  columnSortBy: state.columnSortBy,
  isSortDescending: state.isSortDescending,
  
});

const mapDispatchToProps = dispatch => ({
  onSort: data => dispatch(sort(data)),
});
//PersonsTableSortArea = connect(mapStateToProps, mapDispatchToProps)(PersonsTableSortArea);

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTableSortArea);

PersonsTableSortArea.propTypes = {
  columnSortBy: PropTypes.number,
  isSortDescending: PropTypes.oneOf([true, false, null]),
  onSort: PropTypes.func,
};
