import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
const setupAxios = () => {
  //axios.defaults.baseURL = 'https://bolo-api.checkapp.one/'
  // axios.defaults.baseURL = "http://localhost:8000";
  // axios.defaults.baseURL = "https://happy-sombrero-ray.cyclic.app/"; //->latest deployed
  axios.defaults.baseURL = "https://printsigns.onrender.com/"; //->latest deployed

  axios.defaults.headers = {
    "Cache-Control": "no-cache,no-store",
    Pragma: "no-cache",
    Expires: "0",
  };
};
setupAxios();
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>
);
