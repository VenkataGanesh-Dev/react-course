import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";   // if the file is loaded without ./ , it is loded from node modules from react router package
import "./index.css";
import App from "./App.jsx";

// In this file, We setup React. We render our app component on the page.According to documentation We need to wrap this in a component called browser router < Browser Router >
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
);
