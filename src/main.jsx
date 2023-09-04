import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Store from './pages/Store.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import store from './app/store.jsx';
import Admin from './pages/Admin.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import AllProducts from './components/AllProducts.jsx';
import Cart from './pages/Cart.jsx';
import Success from './pages/Success.jsx';
import Cancel from './pages/Cancel.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/uploadproduct' element={<Admin />} />
      <Route path='/productdetails/:id' element={<ProductDetails/>}/>
      <Route path='/productcategory' element={<AllProducts />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/success' element={<Success />} />
      <Route path='/cancel' element={<Cancel/>}/>
  </Route>
)
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
