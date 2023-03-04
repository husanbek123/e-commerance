import Layout from './Components/Layout';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home';
import AllUsers from './Pages/Users';
import Products from './Pages/Products';
import Categories from './Pages/Categories';
import BestSellings from './Pages/BestSellings';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<AllUsers />} />
          <Route path='/products' element={<Products />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/best-sellings' element={<BestSellings />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
