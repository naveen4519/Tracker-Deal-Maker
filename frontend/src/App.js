import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SpendingChart from './components/SpendingChart';
import Movies from './components/Movies';
import Food from './components/Food';
import Travel from './components/Travel';
import Groceries from './components/Groceries';
import Clothes from './components/Clothes';

function App() {
  const [purchases, setPurchases] = useState([]);

  const addPurchase = (category, item) => {
    const newPurchase = {
      id: Date.now(),
      category,
      name: category === 'travel' ? item.location : item.name,
      price: item.price,
      timestamp: new Date()
    };

    setPurchases(prevPurchases => [...prevPurchases, newPurchase]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dashboard purchases={purchases} />}
        />
        <Route
          path="/spending-chart"
          element={<SpendingChart purchases={purchases} />}
        />
        <Route
          path="/movies"
          element={
            <Movies
              onBuy={(movie) => addPurchase('movies', movie)}
            />
          }
        />
        <Route
          path="/food"
          element={
            <Food
              onBuy={(food) => addPurchase('food', food)}
            />
          }
        />
        <Route
          path="/travel"
          element={
            <Travel
              onBuy={(travel) => addPurchase('travel', travel)}
            />
          }
        />
        <Route
          path="/groceries"
          element={
            <Groceries
              onBuy={(grocery) => addPurchase('groceries', grocery)}
            />
          }
        />
        <Route
          path="/clothes"
          element={
            <Clothes
              onBuy={(clothing) => addPurchase('clothes', clothing)}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;