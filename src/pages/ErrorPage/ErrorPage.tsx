import * as React from "react";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

import { Alert, AlertTitle } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { withLinkToPersons } from "HOCs";
import { RootStateType } from "components/AppProvider";

const Container = withStyles({
  root: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba( 255,255,255,0.4)",
  },
})(Box); /// prawdopodobnie zaira nadmiary to co powyzej bo container jako mui centruje sam z siebie

const NewAlert = withStyles({
  root: {
    background: "#F7EFE2",
    color: "#F70025",
    fontWeight: "bold",
    border: "1px solid #F70025",
    margin: "40px auto",
    maxWidth: "300px",
    minWidth: "200px",
    boxShadow: "inset 0 0 2px #c46a62, 0 1px 1px rgba(0,0,0,0.14), 0 2px 2px rgba(0,0,0,0.14),0 0 4px rgba(0,0,0,0.14),0 0 8px rgba(0,0,0,0.14),0 0 10px rgba(0,0,0,0.14)",
  },
})(Alert);

interface Props{
  message: string;
}
const Error = (props:Props) => {
  const { message } = props;

  return (
    <Container>
      <NewAlert severity="error">
        <AlertTitle>Uwaga!!!</AlertTitle>
        {message}
      </NewAlert>
    </Container>
  );
};

const mapStateToProps = (state:RootStateType) => ({
  message: state.errorMessage,
});

export default connect(mapStateToProps, null)(withLinkToPersons(Error));

Error.propTypes = {
  message: PropTypes.string,
};

/**
 * todo pytanie czy Erorpage to nie jest z armatą na wróblla, czy nie wystarczyłby notistack
 */
