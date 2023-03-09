import "./App.scss";
import Layout from "./Components/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AllUsers from "./Pages/Users";
import Products from "./Pages/Products";
import Categories from "./Pages/Categories";
import Modal_Outlet from "./Pages/Modal_Outlet";
import ControlPage from "./Pages/Control";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Messages from "./Pages/Messages";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import uzbek from './Lang/Uzbek.json'
import english from './Lang/English.json'
import russian from './Lang/Russian.json'
import useMyStore from "./Context";


function App() {

  let {currentLang} = useMyStore((state) => state)
  i18next.use(initReactI18next).init({
    lng: currentLang,
    debug: true,
    resources: {
      uz: { translation: uzbek },
      en: { translation: english },
      ru: { translation: russian }
    } 
  })

  return (
    <div className="App">
      <Layout>
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/products" element={<Products />}>
            <Route path=":action" element={<Modal_Outlet type="products" />} />
          </Route>
          <Route path="/category" element={<Categories />}>
            <Route path=":action" element={<Modal_Outlet type="category" />} />
          </Route>
          <Route path="/control-panel" element={<ControlPage />}>
            <Route path=":edit" element={<Modal_Outlet type="edit" />} />
            <Route path=":updete" element={<Modal_Outlet type="updete" />} />
          </Route>
          <Route path="/messages" element={<Messages />} >
            <Route path=":id" element={<Modal_Outlet type="message" />} />
          </Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
