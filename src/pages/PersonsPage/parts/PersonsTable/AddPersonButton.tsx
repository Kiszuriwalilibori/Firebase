import { useSelector } from "react-redux";

import { RootStateType } from "components";
import { selectIsLogged } from "js/redux/selectors";
import { connect } from "react-redux";

import { Input } from "styles/style";
interface Props {
    isDisabled: Boolean;
}
const AddPersonButton = (props: Props) => {
    const isLogged = useSelector(selectIsLogged);

    const { isDisabled } = props;
    console.log();
    return (
        <Input.Btn type="submit" id="SubmitButton" disabled={/*isDisabled ||*/ !isLogged}>
            <span>Submit</span>
        </Input.Btn>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    isDisabled: state.submitDisabled,
});

export default connect(mapStateToProps, null)(AddPersonButton);
// todo  ten guzik rzeczywiście jest zablokowany, ale nie ma wyglądu zablokowangeo, do pilnej
