/*
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
*/

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; // For handling user state
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import TicketBooking from './pages/TicketBooking';
import Checkout from './pages/Checkout';
import Confirmation from './register/Confirmation';
import OrderSummary from './pages/OrderSummary';
import AdminMain from './pages/AdminMain'; // Make sure this exists

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
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
