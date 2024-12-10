import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SpendingChart from './SpendingChart';

const Dashboard = ({ purchases }) => {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Spending Calculation Functions
  const calculateSpending = (timeFrame, category = 'all') => {
    const now = new Date();
    const filteredPurchases = purchases.filter(purchase => {
      const purchaseDate = new Date(purchase.timestamp);
      
      // Time frame filtering
      const timeFrameMatch = 
        timeFrame === 'daily' 
          ? purchaseDate.toDateString() === now.toDateString()
          : timeFrame === 'monthly'
            ? purchaseDate.getMonth() === now.getMonth() && 
              purchaseDate.getFullYear() === now.getFullYear()
            : purchaseDate.getFullYear() === now.getFullYear();
      
      // Category filtering
      const categoryMatch = 
        category === 'all' || purchase.category === category;
      
      return timeFrameMatch && categoryMatch;
    });

    return filteredPurchases.reduce((total, purchase) => total + purchase.price, 0);
  };

  // Purchase History Filtering
  const filterPurchaseHistory = () => {
    const now = new Date();
    return purchases.filter(purchase => {
      const purchaseDate = new Date(purchase.timestamp);
      
      const timeFrameMatch = 
        timeFrame === 'daily' 
          ? purchaseDate.toDateString() === now.toDateString()
          : timeFrame === 'monthly'
            ? purchaseDate.getMonth() === now.getMonth() && 
              purchaseDate.getFullYear() === now.getFullYear()
            : purchaseDate.getFullYear() === now.getFullYear();
      
      const categoryMatch = 
        selectedCategory === 'all' || purchase.category === selectedCategory;
      
      return timeFrameMatch && categoryMatch;
    });
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Expense Tracker Dashboard</h1>
        <nav>
          <Link to="/movies">Movies</Link>
          <Link to="/food">Food</Link>
          <Link to="/travel">Travel</Link>
        </nav>
      </header>

      <main>
        <section className="spending-analysis">
          <h2>Spending Analysis</h2>
          
          <div className="filters">
            <select 
              value={timeFrame} 
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="movies">Movies</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
            </select>
          </div>

          <div className="spending-summary">
            <h3>Spending Summary ({timeFrame})</h3>
            <p>Total Spent: ${calculateSpending(timeFrame).toFixed(2)}</p>
            <p>Movies Spent: ${calculateSpending(timeFrame, 'movies').toFixed(2)}</p>
            <p>Food Spent: ${calculateSpending(timeFrame, 'food').toFixed(2)}</p>
            <p>Travel Spent: ${calculateSpending(timeFrame, 'travel').toFixed(2)}</p>
          </div>

          <div className="purchase-history">
            <h3>Purchase History</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {filterPurchaseHistory().map((purchase) => (
                  <tr key={purchase.id}>
                    <td>{new Date(purchase.timestamp).toLocaleString()}</td>
                    <td>{purchase.category}</td>
                    <td>{purchase.name}</td>
                    <td>${purchase.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="spending-chart">
          <SpendingChart 
            purchases={purchases} 
            timeFrame={timeFrame} 
          />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;