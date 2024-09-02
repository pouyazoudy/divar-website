import Router from "./router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <Router />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
