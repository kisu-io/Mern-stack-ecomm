import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Open Sans", "Roboto"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path='/' component={Home} />
      <Footer />
    </Router>
  );
}

export default App;
