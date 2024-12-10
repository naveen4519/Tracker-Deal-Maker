import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SpendingAnalysis = ({
    purchases,
    calculateSpending,
    calculateCategorySpending,
    getTotalSpending
}) => {
    const [timeFrame, setTimeFrame] = useState('monthly');

    const renderSpendingBreakdown = () => {
        return (
            <div>
                <h3>Spending Breakdown for {timeFrame}</h3>
                <p>Total Spending: ${getTotalSpending(timeFrame).toFixed(2)}</p>
                <p>Movies Spending: ${calculateCategorySpending(timeFrame, 'movies').toFixed(2)}</p>
                <p>Food Spending: ${calculateCategorySpending(timeFrame, 'food').toFixed(2)}</p>
                <p>Travel Spending: ${calculateCategorySpending(timeFrame, 'travel').toFixed(2)}</p>
            </div>
        );
    };

    const renderPurchaseHistory = () => {
        const filteredPurchases = calculateSpending(timeFrame);

        return (
            <div>
                <h3>Purchase History for {timeFrame}</h3>
                {filteredPurchases.length === 0 ? (
                    <p>No purchases in this time frame</p>
                ) : (
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
                            {filteredPurchases.map((purchase) => (
                                <tr key={purchase.id}>
                                    <td>{new Date(purchase.timestamp).toLocaleString()}</td>
                                    <td>{purchase.category}</td>
                                    <td>{purchase.name}</td>
                                    <td>${purchase.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    };

    return (
        <div>
            <header>
                <h1>Spending Analysis</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/movies">Movies</Link></li>
                        <li><Link to="/food">Food</Link></li>
                        <li><Link to="/travel">Travel</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <div>
                    <label>
                        Time Frame:
                        <select
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                        >
                            <option value="daily">Daily</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </label>
                </div>

                {renderSpendingBreakdown()}
                {renderPurchaseHistory()}
            </main>
        </div>
    );
};

export default SpendingAnalysis;