import { RootStateType } from "components";
import { connect } from "react-redux";

import { Input } from "styles/style";
import { User } from "types/index";
interface Props {
    isDisabled: Boolean;
    user: User;
}
const AddPersonButton = (props: Props) => {
    const { isDisabled, user } = props;
    return (
        <Input.Btn type="submit" id="SubmitButton" disabled={isDisabled || !user}>
            <span>Submit</span>
        </Input.Btn>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    isDisabled: state.submitDisabled,
    user: state.user,
});

export default connect(mapStateToProps, null)(AddPersonButton);
// todo  ten guzik rzeczywiście jest zablokowany, ale nie ma wyglądu zablokowangeo, do pilnej
