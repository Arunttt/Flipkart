// import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import CartDetails from './components/CartDetails';
// import DetailsPage from './components/DetailsPage';
// import { Footer } from './components/Footer';
// import Header from './components/Header';
// import LoginPage from './components/LoginPage';
// import ViewProduct from './components/ViewProduct';
// import { Home } from './Home';
import App from './App';
import './index.css';
import store from './store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </StrictMode> */}
  </Provider>
);
