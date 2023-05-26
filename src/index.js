import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
  <ProSidebarProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ProSidebarProvider>,
  document.getElementById("root")
);
reportWebVitals();
