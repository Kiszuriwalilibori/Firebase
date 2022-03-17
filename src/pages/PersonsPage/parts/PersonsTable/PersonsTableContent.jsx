import PropTypes from 'prop-types';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { showError } from '../../../../js/REDUX/actions';
import { Rows } from '../../../../styles/style';
import * as ROUTES from '../../../../js/routing/routes';
import ClearRoundedIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';
import { FirebaseContext } from '../../../../contexts/firebaseContext';
import IconButton from '@material-ui/core/IconButton';

const iconColor = '#FF0801;';
const iconHoverColor = 'rgba(247,0,0,0.34)';
const ClearIcon = withStyles({
    root: {
        color: iconColor,
        cursor: 'pointer',
    },
})(ClearRoundedIcon);

const MyIconButton = withStyles({
    root: {
        color: iconColor,
        transition: 'background-color 0.5s ease-in-out',
        '&:hover': { backgroundColor: iconHoverColor },
    },
})(IconButton);

let PersonsTableContent = props => {
    const { items, user, showError } = props;
    const firebase = React.useContext(FirebaseContext);
    const history = useHistory();
    if (!items || items.length === 0) {
        return null;
    }

    const removeItem = e => {
        const ref = e.currentTarget.dataset.item_firebase_ref;
        const itemRef = firebase.database.ref(`/items/${ref}`);
        if (itemRef) {
            try {
                itemRef.remove();
            } catch (err) {
                showError(err.message);
                history.push(ROUTES.ERROR);
            }
        } else {
            showError(
                'Podczas próby usunięcia użytkownika pojawił się problem. Wszystko wskazuje, że tego użytkownika nie ma już w bazie',
            );
            history.push(ROUTES.ERROR);
        }
    };

    return (
        <tbody>
            {items.map((row, index) => (
                <tr key={index}>
                    <Rows.MiddleAligned key={index}>
                        <Rows.Circle>{index + 1}</Rows.Circle>
                    </Rows.MiddleAligned>
                    <Rows.MiddleAligned key={index + row[1]}>{row[1]}</Rows.MiddleAligned>
                    <Rows.MiddleAligned key={index + row[2]}>
                        <Rows.EmailCell>
                            <span>{row[2]}</span>
                            {user && user.displayName === row[3] && (
                                <MyIconButton onClick={removeItem} data-item_firebase_ref={row[0]}>
                                    <ClearIcon />
                                </MyIconButton>
                            )}{' '}
                        </Rows.EmailCell>
                    </Rows.MiddleAligned>
                </tr>
            ))}
        </tbody>
    );
};

const mapStateToProps = state => ({
    items: state.items,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    showError: data => dispatch(showError(data)),
});

PersonsTableContent = connect(mapStateToProps, mapDispatchToProps)(PersonsTableContent);

export default PersonsTableContent;

PersonsTableContent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.array),
    user: PropTypes.object,
    showError: PropTypes.func,
};
