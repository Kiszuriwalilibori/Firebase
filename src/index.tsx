import ReactDOM from "react-dom";

import { AppProvider, App } from "./components";
import breakWhenInternetExplorer from "js/functions/breakWhenInternertExplorer";

breakWhenInternetExplorer();

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,

  document.getElementById("root")
);
