import { AlertTitle } from "@material-ui/lab";
import { connect } from "react-redux";

import { withLinkToPersons } from "HOCs";
import { RootStateType } from "components/AppProvider";
import { Container, NewAlert } from "./style";

interface Props {
    errorMessage?: string;
}
const Error = (props: Props) => {
    const { errorMessage: message } = props;
    if (!message) return null;

    return (
        <Container>
            <NewAlert severity="error">
                <AlertTitle>Uwaga!!!</AlertTitle>
                {message}
            </NewAlert>
        </Container>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    message: state.errorMessage,
});

export default connect(mapStateToProps, null)(withLinkToPersons(Error));
