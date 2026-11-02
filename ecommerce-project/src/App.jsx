import { Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage.JSX";
import { CheckoutPage } from "./pages/Checkoutpage";
import "./App.css";

function App() {
  return (
    // <Routes> = tells React all the pages that are in our website
    <Routes>
      {/* <Route> = To Adds a page to our website , We give a 2 props   ; 1) is url path of this page  : URL path is last part of the URL   (/ means , if the URL path ends with slash or empty ,it"s going to display) 2) The 2nd prop is Which element or component to display    */}

      {/*We just tell React ,Which pages we want in our website and then what to display for each page
      NOw We have multiple pages in our website and all the pages use one HTML file (index.html) is shared in our pages and this reduces the code repetition,,, 
      BY the way this is single page application(SPA) = We only have one html file and We use reactto create multiple pages */}
      {/* Shortcut: Here we are using the index and path="/"  are same and We can use selfclosing if nothing is inside a shortcut :  <Route /> */}
      <Route index element={<HomePage />} />

      {/*<Route path="/" element={<HomePage />}></Route>*/}
      <Route path="checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
