import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';
import '../App.css'

const COLORS = {
    movies: '#8884d8',
    food: '#82ca9d', 
    travel: '#ffc658',
    groceries: '#ff7300',
    clothes: '#ff0000'
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${name} ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const SpendingChart = ({ purchases }) => {
    const [timeFrame, setTimeFrame] = useState('monthly');

    // Calculation function for chart data with detailed breakdown
    const calculateSpendingAnalysis = useMemo(() => {
        const categories = ['movies', 'food', 'travel', 'groceries', 'clothes'];

        // Function to group purchases by category and date
        const groupPurchasesByCategory = (filteredPurchases) => {
            return categories.map(category => {
                const categoryPurchases = filteredPurchases
                    .filter(purchase => purchase.category === category)
                    .map(purchase => ({
                        date: new Date(purchase.timestamp).toLocaleDateString(),
                        price: purchase.price
                    }))
                    .sort((a, b) => new Date(a.date) - new Date(b.date));

                return {
                    category,
                    data: categoryPurchases
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
            color: COLORS[name] || ''
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
                {/* Pie Chart with Customized Label */}
                <div>
                    <h2>Spending Distribution ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})</h2>
                    <ResponsiveContainer width={400} height={400}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart - Restored to Original */}
                <div>
                    <h2>Spending Comparison ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})</h2>
                    <ResponsiveContainer width={400} height={400}>
                        <BarChart data={pieChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Charts for Each Category */}
                {calculateSpendingAnalysis.map(categoryData => (
                    <div key={categoryData.category}>
                        <h2>{categoryData.category.charAt(0).toUpperCase() + categoryData.category.slice(1)} Spending</h2>
                        <ResponsiveContainer width={600} height={400}>
                            <LineChart data={categoryData.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke={COLORS[categoryData.category] || '#8884d8'}
                                    name={categoryData.category.charAt(0).toUpperCase() + categoryData.category.slice(1)}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ))}
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