import "./app.css";
import { Nav } from "./nav";
import { Main } from "./pages";
import NavProvider from "./context/NavContext";
import { useEffect, useState } from "react";
import LoadingComponent from "./components/LoadingComponent";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    window.addEventListener(
      "load",
      function () {
        // loaded
        setLoading(false);
      },
      false
    );
  }, []);

  return (
    <div className="appContainer">
      <NavProvider>
        {loading && (
          <div className="loading">
            <LoadingComponent />
          </div>
        )}
        {!loading && (
          <div>
            <Nav />
            <Main />
          </div>
        )}
      </NavProvider>
    </div>
  );
};

export default App;
