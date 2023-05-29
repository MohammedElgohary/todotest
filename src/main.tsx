import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import { RecoilRoot } from "recoil";

/***
 * Essential Styles
 */
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import "sweetalert2/src/sweetalert2.scss"; // SweetAlert2

import "./assets/sass/index.scss"; // OWN SASS

/***
 * App component
 */
import App from "./App";
import Loader from "./components/loader";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>
);
