import Layout from "./Components/Layout";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./Pages/Home";
import AllUsers from "./Pages/Users";
import Products from "./Pages/Products";
import Categories from "./Pages/Categories";
import BestSellings from "./Pages/BestSellings";
import Modal_Outlet from "./Pages/Modal_Outlet";
import ControlPage from "./Pages/Control";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<AllUsers />} />
          <Route path='/products' element={<Products />} >
            <Route path=':action' element={<Modal_Outlet type="products" />} />
          </Route>
          <Route path='/categories' element={<Categories />} >
            <Route path=':action' element={<Modal_Outlet type="category" />} />
          </Route>
          <Route path='/best-sellings' element={<BestSellings />} >
          </Route>
          <Route path='/control-panel' element={<ControlPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
