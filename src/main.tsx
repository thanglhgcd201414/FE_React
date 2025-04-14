import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./stylesheet/index.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import { persistor, store } from "./lib/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Spin } from "antd";

AOS.init();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
