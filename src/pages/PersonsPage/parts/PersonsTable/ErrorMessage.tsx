import { useMemo } from "react";
import { ErrorMsg } from "./styles";
import { FormikErrors } from "formik";

interface Props {
    errors: FormikErrors<{
        personEmail: string;
        personName: string;
    }>;
}

const ErrorMessage = (props: Props) => {
    const { errors } = props;

    const errorsDescription = useMemo(
        () => JSON.stringify(errors, null, 2).substring(1, JSON.stringify(errors, null, 2).length - 1),
        [JSON.stringify(errors)]
    );

    return <ErrorMsg>{errorsDescription}</ErrorMsg>;
};

export default ErrorMessage;
