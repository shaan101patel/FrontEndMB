import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import TicketBooking from './pages/TicketBooking';
import Checkout from './pages/Checkout';
import Confirmation from './register/confirmation';
import OrderSummary from './pages/OrderSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/booking" element={<TicketBooking />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/admin" element={<AdminMain />} />

      </Routes>
    </Router>
  );
}

export default App;
