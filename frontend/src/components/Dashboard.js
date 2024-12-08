import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ totalSpent }) => {
  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/food">Food</Link></li>
            <li><Link to="/travel">Travel</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <p>Total Spent: ${totalSpent}</p>
      </main>
    </div>
  );
};

export default Dashboard;
