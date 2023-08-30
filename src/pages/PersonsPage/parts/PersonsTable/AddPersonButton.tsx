import { RootStateType } from "components";
import { connect } from "react-redux";


import { Input } from "styles/style";
interface Props {
    isDisabled: Boolean;
}
const AddPersonButton = (props:Props) => {
  const { isDisabled } = props;
  return (
    <Input.Btn type="submit" id="SubmitButton" disabled={isDisabled}>
      <span>Submit</span>
    </Input.Btn>
  );
};

const mapStateToProps = (state:RootStateType) => ({
  isDisabled: state.submitDisabled,
});

export default connect(mapStateToProps, null)(AddPersonButton);
