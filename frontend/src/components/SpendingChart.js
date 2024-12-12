import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid
} from 'recharts';

const SpendingChart = ({ purchases }) => {
    const [timeFrame, setTimeFrame] = useState('monthly');

    // Calculation function for chart data
    const calculateSpendingAnalysis = useMemo(() => {
        const now = new Date();
        const categories = ['movies', 'food', 'travel', 'groceries', 'clothes'];

        // Calculate spending for daily, monthly, and yearly
        const timeFrames = ['daily', 'monthly', 'yearly'];

        const spendingAnalysis = timeFrames.map(timeFrame => {
            const categorySpending = categories.reduce((acc, category) => {
                const filteredPurchases = purchases.filter(purchase => {
                    const purchaseDate = new Date(purchase.timestamp);
                    const timeFrameMatch =
                        timeFrame === 'daily'
                            ? purchaseDate.toDateString() === now.toDateString()
                            : timeFrame === 'monthly'
                                ? purchaseDate.getMonth() === now.getMonth() &&
                                purchaseDate.getFullYear() === now.getFullYear()
                                : purchaseDate.getFullYear() === now.getFullYear();

                    return timeFrameMatch && purchase.category === category;
                });

                const totalSpending = filteredPurchases.reduce((total, purchase) => total + purchase.price, 0);
                return { ...acc, [category]: totalSpending };
            }, {});

            return {
                name: timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1),
                ...categorySpending
            };
        });

        return spendingAnalysis;
    }, [purchases]);

    // Filtered Purchases based on selected time frame
    const filteredPurchases = useMemo(() => {
        const now = new Date();
        return purchases.filter(purchase => {
            const purchaseDate = new Date(purchase.timestamp);
            return timeFrame === 'daily'
                ? purchaseDate.toDateString() === now.toDateString()
                : timeFrame === 'monthly'
                    ? purchaseDate.getMonth() === now.getMonth() &&
                    purchaseDate.getFullYear() === now.getFullYear()
                    : purchaseDate.getFullYear() === now.getFullYear();
        });
    }, [purchases, timeFrame]);

    // Prepare chart data based on filtered purchases
    const pieChartData = useMemo(() => {
        const categorySpending = filteredPurchases.reduce((acc, purchase) => {
            acc[purchase.category] = (acc[purchase.category] || 0) + purchase.price;
            return acc;
        }, {});

        return Object.entries(categorySpending).map(([name, value]) => ({
            name,
            value,
            fill: name === 'movies' ? '#8884d8' :
                name === 'food' ? '#82ca9d' :
                    name === 'travel' ? '#ffc658' :
                        name === 'groceries' ? '#ff7300' :
                            '#ff0000'
        }));
    }, [filteredPurchases]);

    return (
        <div className="spending-charts">
            <header>
                <h1>Spending Visualization</h1>
                <nav>
                    <Link to="/">Back to Dashboard</Link>
                </nav>
            </header>

            {/* Time Frame Filter */}
            <div className="time-frame-filter">
                <label>Select Time Frame: </label>
                <select
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                >
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="chart-container">
                {/* Line Chart for Spending Analysis */}
                <div>
                    <h2>Spending Analysis Across Time Frames</h2>
                    <LineChart width={600} height={400} data={calculateSpendingAnalysis}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="movies" stroke="#8884d8" />
                        <Line type="monotone" dataKey="food" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="travel" stroke="#ffc658" />
                        <Line type="monotone" dataKey="groceries" stroke="#ff7300" />
                        <Line type="monotone" dataKey="clothes" stroke="#ff0000" />
                    </LineChart>
                </div>

                {/* Pie Chart */}
                <div>
                    <h2>Spending Distribution ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})</h2>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                {/* Bar Chart */}
                <div>
                    <h2>Spending Comparison ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})</h2>
                    <BarChart width={400} height={400} data={pieChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" />
                    </BarChart>
                </div>
            </div>

            {/* Spending Summary */}
            <div className="spending-summary">
                <h2>Spending Summary ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Total Spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pieChartData.map((item) => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>${item.value.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td><strong>Total</strong></td>
                            <td>
                                <strong>
                                    ${pieChartData.reduce((total, item) => total + item.value, 0).toFixed(2)}
                                </strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SpendingChart;