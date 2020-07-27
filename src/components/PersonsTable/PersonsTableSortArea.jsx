import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { headings } from "../../js/FIXTURES/fixtures";
import { sort } from "../../js/ACTIONS/actions";
import { header_ } from "../../styles/style";

function _PersonsTableSortArea(props) {
  if (props) {
    const {
      columnSortBy,
      nonSortableColumns,
      isSortDescending,
      onSort,
    } = props;

    const isCurrentColumnSorted = (x) => columnSortBy === x;
    const arrow = isSortDescending ? "\u2191" : "\u2193";
    const handleSort = (e) => {
      const targetColumn = e.target.cellIndex;
      const columnNotExcludedFromSorting =
        nonSortableColumns === undefined ||
        !nonSortableColumns.has(targetColumn);

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
      <header_.wrapper onClick={handleSort}>
        <tr>
          {headings.map((item, index) => (
            <header_.section key={item}>
              {" "}
              {isCurrentColumnSorted(index) ? item + arrow : item}{" "}
            </header_.section>
          ))}
        </tr>
      </header_.wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  columnSortBy: state.columnSortBy,
  isSortDescending: state.isSortDescending,
  nonSortableColumns: state.nonSortableColumns,
});

const mapDispatchToProps = (dispatch) => ({
  onSort: (data) => dispatch(sort(data)),
});

const PersonsTableSortArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PersonsTableSortArea);

export default PersonsTableSortArea;

PersonsTableSortArea.propTypes = {
  columnSortBy: PropTypes.number,
  isSortDescending: PropTypes.oneOf([true, false, null]),
};
