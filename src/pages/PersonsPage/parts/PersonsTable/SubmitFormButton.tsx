import { useSelector } from "react-redux";
import { selectIsLogged } from "js/redux/selectors";

import { Input } from "styles/style";

const SubmitFormButton = () => {
    const isLogged = useSelector(selectIsLogged);

    return (
        <Input.Btn type="submit" id="SubmitButton" disabled={!isLogged}>
            <span>Submit</span>
        </Input.Btn>
    );
};

export default SubmitFormButton;
