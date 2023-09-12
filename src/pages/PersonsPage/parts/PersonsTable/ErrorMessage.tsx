import { ErrorMsg } from "./styles";

interface Props {
    errors: any;
}

const ErrorMessage = (props: Props) => {
    const { errors } = props;
    return (
        <ErrorMsg>{JSON.stringify(errors, null, 2).substring(1, JSON.stringify(errors, null, 2).length - 1)}</ErrorMsg>
    );
};

export default ErrorMessage;
