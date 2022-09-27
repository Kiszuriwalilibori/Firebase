const ErrorMessage = props => {
  const { errors } = props;

  return <span className="AddPersonForm__error-message">{JSON.stringify(errors, null, 2).substring(1, JSON.stringify(errors, null, 2).length - 1)}</span>;
};

export default ErrorMessage;
