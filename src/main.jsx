// import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartDetails from './components/CartDetails';
import DetailsPage from './components/DetailsPage';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import ViewProduct from './components/ViewProduct';
import './index.css';
import Purchase from './Purchase';
import store from './store';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <StrictMode> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Purchase />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          {/* <Route path="/view/:id" element={<SearchProduct />} /> */}
        <Route path="/details" element={<CartDetails />} />      
        <Route path="/order_details/:id" element={<DetailsPage />} />            
        </Routes>
      </BrowserRouter>
    {/* </StrictMode> */}
  </Provider>
);
