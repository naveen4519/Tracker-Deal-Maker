import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Movies from './components/Movies';
import Food from './components/Food';
import Travel from './components/Travel';

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  const handleBuy = (price) => {
    setTotalSpent(totalSpent + price); // Update the total spent
  };

  return (
    <Router>
      <Routes>
        {/* Pass the handleBuy function to Movies */}
        <Route path="/" element={<Dashboard totalSpent={totalSpent} />} />
        <Route path="/movies" element={<Movies onBuy={handleBuy} />} />
        <Route path="/food" element={<Food onBuy={handleBuy} />} />
        <Route path="/travel" element={<Travel onBuy={handleBuy} />} />
      </Routes>
    </Router>
  );
}

export default App;
