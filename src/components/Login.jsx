import * as React from "react";
import { withRouter } from "react-router";
import { CustomContainer } from "./CustomContainer";

let Login = () => (
  <CustomContainer>
    <div>
      <span className="notfound__item">Nie znaleziono książek spełniających zadane kryteria</span>
      <br />
      <span className="notfound__item">Kliknij gdziekolwiek, aby powrócić do wyszukiwania</span>
    </div>
  </CustomContainer>
);

Login = withRouter(Login);

export default Login;
