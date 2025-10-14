import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import '../App.css';

const COLORS = {
    movies: '#8884d8',    // Purple
    food: '#82ca9d',      // Green
    travel: '#ffc658',    // Yellow
    groceries: '#ff7300', // Orange
    clothes: '#ff6b81',   // Pink
    deals: '#4facfe'      // Blue
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = outerRadius * 1.2; // Increased radius to push labels further out
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const value = (percent * 100).toFixed(0);

    // Only show label if the percentage is greater than 3%
    if (percent < 0.03) return null;

    return (
        <text
            x={x}
            y={y}
            fill="#333333"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize="12"
        >
            {`${name} ${value}%`}
        </text>
    );
};

const SpendingChart = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [purchases, setPurchases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get('http://localhost:5000/purchases');
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching purchases:', error);
            }
        };

        fetchPurchases();
    }, []);

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
    }, [purchases]);

    // Filtered Purchases based on selected time frame
    const filteredPurchases = useMemo(() => {
        const now = new Date();
        return purchases.filter(purchase => {
            const purchaseDate = new Date(purchase.timestamp);
            switch (timeFrame) {
                case 'daily':
                    return purchaseDate.toDateString() === now.toDateString();
                case 'monthly':
                    return purchaseDate.getMonth() === now.getMonth() &&
                        purchaseDate.getFullYear() === now.getFullYear();
                case 'yearly':
                    return purchaseDate.getFullYear() === now.getFullYear();
                default:
                    return true;
            }
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
                    <button onClick={() => navigate('/')}>Back to Dashboard</button>
                </nav>
            </header>

            <div className="time-frame-filter">
                <label>Select Time Frame: </label>
                <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>

            <div className="chart-container">
                <div>
                    <h2>Spending Distribution ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})</h2>
                    <ResponsiveContainer width={500} height={400}>
                        <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={130}
                                label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell - ${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h2>Spending Comparison ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})</h2>
                    <ResponsiveContainer width={500} height={400}>
                        <BarChart data={pieChartData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
                            <YAxis />
                            <Tooltip />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="value">
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell - ${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Update the line charts */}
                {calculateSpendingAnalysis.map(categoryData => (
                    <div key={categoryData.category}>
                        <h2>{categoryData.category.charAt(0).toUpperCase() + categoryData.category.slice(1)} Spending</h2>
                        <ResponsiveContainer width={600} height={400}>
                            <LineChart data={categoryData.data} margin={{ top: 20, right: 30, left: 30, bottom: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} interval={0} />
                                <YAxis />
                                <Tooltip />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="price" stroke={COLORS[categoryData.category]}
                                    name={categoryData.category.charAt(0).toUpperCase() + categoryData.category.slice(1)} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ))}
            </div>

            {/* Spending Summary Table */}
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
                            <td><strong>${pieChartData.reduce((total, item) => total + item.value, 0).toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default SpendingChart;