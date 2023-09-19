/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import "../assets/styles/index.css";

render(() => <App />, document.getElementById("app") as HTMLElement);
