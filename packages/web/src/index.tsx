/* @refresh reload */
import { render } from "solid-js/web";
import "./index.scss";
import App from "./App";
import { SocketContext } from "./net/socket-contexts";

render(
  () => (
    <SocketContext.Provider value={SocketContext.defaultValue}>
      <App />
    </SocketContext.Provider>
  ),
  document.getElementById("root") as HTMLElement
);
