import Layout from "./Components/Layout";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import AllUsers from "./Pages/Users";
import Products from "./Pages/Products";
import Categories from "./Pages/Categories";
import Modal_Outlet from "./Pages/Modal_Outlet";
import ControlPage from "./Pages/Control";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WriteMessage from "./Pages/WriteMessage";
import Messages from "./Pages/Messages";


function App() {
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
          <Route path="/messages" element={<Messages />} />
          <Route path="/write-message" element={<WriteMessage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
