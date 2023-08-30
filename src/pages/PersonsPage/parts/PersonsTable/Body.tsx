import * as React from "react";
import ClearRoundedIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import uuid from "react-uuid";

import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { showError } from "js/redux/actions";
import { Rows } from "styles/style";
import { FirebaseContext } from "contexts/firebaseContext";
import { ErrorType, FirebaseError, User } from "types";

import * as ROUTES from "js/routes";
import { AppDispatch, RootStateType } from "components/AppProvider";

const iconColor = "#FF0801;";
const iconHoverColor = "rgba(247,0,0,0.34)";
const ClearIcon = withStyles({
  root: {
    color: iconColor,
    cursor: "pointer",
  },
})(ClearRoundedIcon);

const Button = withStyles({
  root: {
    color: iconColor,
    transition: "background-color 0.5s ease-in-out",
    "&:hover": { backgroundColor: iconHoverColor },
  },
})(IconButton);



interface Props {
    items: string[][];
    user: User;
    showError: (data: ErrorType) => void;
}

const PersonsTableBody = (props:Props) => {
  const { items, user, showError } = props;
  const firebase = React.useContext(FirebaseContext);
  const history = useHistory();
  if (!items || items.length === 0) {
    return null;
  }
 
  const removeItem: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ref = e.currentTarget.dataset.item_firebase_ref;
    const itemRef = firebase.database.ref(`/items/${ref}`);
    if (itemRef) {
      try {
        itemRef.remove();
      } catch (err:any) {
        const e =err as FirebaseError;
        showError({ errorMessage: e.message, isError:true});
        history.push(ROUTES.ERROR);
      }
    } else {
      showError({
                errorMessage:
                    "Podczas próby usunięcia użytkownika pojawił się problem. Wszystko wskazuje, że tego użytkownika nie ma już w bazie",
                isError: true,
            });
      history.push(ROUTES.ERROR);
    }
  };

  return (
    <tbody>
      {items.map((row, index) => (
        <tr key={uuid()}>
          <Rows.MiddleAligned key={uuid()}>
            <Rows.Circle>{index + 1}</Rows.Circle>
          </Rows.MiddleAligned>
          <Rows.MiddleAligned key={uuid()}>{row[1]}</Rows.MiddleAligned>
          <Rows.MiddleAligned key={uuid()}>
            <Rows.EmailCell>
              <span>{row[2]}</span>
              {user && user.displayName === row[3] && (
                <Button onClick={removeItem} data-item_firebase_ref={row[0]}>
                  <ClearIcon />
                </Button>
              )}{" "}
            </Rows.EmailCell>
          </Rows.MiddleAligned>
        </tr>
      ))}
    </tbody>
  );
};

const mapStateToProps = (state:RootStateType) => ({
  items: state.items,
  user: state.user as unknown as  User,
});

const mapDispatchToProps = (dispatch:AppDispatch) => ({
  showError: (data:ErrorType) => dispatch(showError(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonsTableBody);

