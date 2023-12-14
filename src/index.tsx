import ReactDOM from "react-dom";

import { AppProvider, App } from "./components";
import breakWhenInternetExplorer from "functions/breakWhenInternertExplorer";

breakWhenInternetExplorer();

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,

    document.getElementById("root")
);
