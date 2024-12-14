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
import '../App.css'

const SpendingChart = ({ purchases }) => {
    const [timeFrame, setTimeFrame] = useState('monthly');

    // Calculation function for chart data with detailed breakdown
    const calculateSpendingAnalysis = useMemo(() => {
        // const now = new Date();
        const categories = ['movies', 'food', 'travel', 'groceries', 'clothes'];

        // Function to group purchases by category and date
        const groupPurchasesByCategory = (filteredPurchases) => {
            return categories.map(category => {
                const categoryPurchases = filteredPurchases
                    .filter(purchase => purchase.category === category)
                    .reduce((acc, purchase) => {
                        const date = new Date(purchase.timestamp);
                        const key = timeFrame === 'daily'
                            ? date.toLocaleDateString()
                            : timeFrame === 'monthly'
                                ? `${date.getFullYear()}-${date.getMonth() + 1}`
                                : date.getFullYear().toString();

                        acc[key] = (acc[key] || 0) + purchase.price;
                        return acc;
                    }, {});

                return {
                    category,
                    data: Object.entries(categoryPurchases).map(([name, value]) => ({
                        name,
                        value,
                        fill: category === 'movies' ? '#8884d8' :
                            category === 'food' ? '#82ca9d' :
                                category === 'travel' ? '#ffc658' :
                                    category === 'groceries' ? '#ff7300' :
                                        '#ff0000'
                    }))
                };
            });
        };

        return groupPurchasesByCategory(purchases);
    }, [purchases, timeFrame]);

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

                {/* Line Charts for Each Category */}
                {calculateSpendingAnalysis.map(categoryData => (
                    <div key={categoryData.category}>
                        <h2>{categoryData.category.charAt(0).toUpperCase() + categoryData.category.slice(1)} Spending</h2>
                        <LineChart width={600} height={400} data={categoryData.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={categoryData.data[0]?.fill || '#8884d8'}
                                name={categoryData.category.charAt(0).toUpperCase() + categoryData.category.slice(1)}
                            />
                        </LineChart>
                    </div>
                ))}

                {/* Pie Chart */}

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