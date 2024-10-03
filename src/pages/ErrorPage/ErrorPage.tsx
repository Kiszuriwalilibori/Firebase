import { AlertTitle } from "@material-ui/lab";
import { connect } from "react-redux";

import { withLinkToPersons } from "HOCs";
import { RootStateType } from "components/AppProvider";
import { Container, Alert } from "./style";

interface Props {
    errorMessage?: string;
}
const ErrorPage = (props: Props) => {
    const { errorMessage } = props;
    if (!errorMessage) return null;

    return (
        <Container>
            <Alert severity="error">
                <AlertTitle>Uwaga!!!</AlertTitle>
                {errorMessage}
            </Alert>
        </Container>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    message: state.errorMessage,
});

export default connect(mapStateToProps, null)(withLinkToPersons(ErrorPage));
