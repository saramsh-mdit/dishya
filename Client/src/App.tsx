import { Routes } from "react-router-dom";
import NavBar from "./components/global/NavBar";
import Routers from "./router/Router";

const App = () => {
  return (
    <main>
      <NavBar />
      <Routers />
    </main>
  );
};

export default App;
