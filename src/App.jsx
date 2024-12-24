import { Route, Routes, useLocation } from 'react-router-dom';
import CartDetails from './components/CartDetails';
import DetailsPage from './components/DetailsPage';
import { Footer } from './components/Footer';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import ViewProduct from './components/ViewProduct';
import { Home } from './Home';

function App() {
  const location = useLocation();

  const shouldHideHeader = location.pathname === '/login';
console.log(shouldHideHeader);
  return (
    <>
      <div>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/details" element={<CartDetails />} />
        <Route path="/order_details/:id" element={<DetailsPage />} />
      </Routes>
      {!shouldHideHeader && <Footer /> }
      </div>
    </>
  )
}

export default App
