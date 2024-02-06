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
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      document.addEventListener(
        "load",
        function () {
          // loaded
          setLoading(false);
        },
        false
      );
    }
    // const mainElement = document.getElementsByClassName("mainElement")
    // mainElement.onload = (event) => {
    //   setLoading(false);
    // };
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
            <Main className="mainElement"/>
          </div>
        )}
      </NavProvider>
    </div>
  );
};

export default App;
