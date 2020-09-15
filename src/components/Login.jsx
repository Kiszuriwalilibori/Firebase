import * as React from "react";
import { withRouter } from "react-router";
import { CustomContainer } from "./CustomContainer";

const UnconnectedLogin = () => (
  <CustomContainer>
    <div>
      <span className="notfound__item">
        Nie znaleziono książek spełniających zadane kryteria
      </span>
      <br />
      <span className="notfound__item">
        Kliknij gdziekolwiek, aby powrócić do wyszukiwania
      </span>
    </div>
  </CustomContainer>
);

const Login = withRouter(UnconnectedLogin);

export default Login;
