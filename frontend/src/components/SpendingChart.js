import React from 'react';
import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid
} from 'recharts';

const SpendingChart = ({ purchases, timeFrame }) => {
    // Calculation function for chart data
    const calculateCategorySpending = () => {
        const now = new Date();

        const filteredPurchases = purchases.filter(purchase => {
            const purchaseDate = new Date(purchase.timestamp);

            return timeFrame === 'daily'
                ? purchaseDate.toDateString() === now.toDateString()
                : timeFrame === 'monthly'
                    ? purchaseDate.getMonth() === now.getMonth() &&
                    purchaseDate.getFullYear() === now.getFullYear()
                    : purchaseDate.getFullYear() === now.getFullYear();
        });

        // Group purchases by category
        const categorySpending = filteredPurchases.reduce((acc, purchase) => {
            acc[purchase.category] = (acc[purchase.category] || 0) + purchase.price;
            return acc;
        }, {});

        // Convert to recharts format
        return Object.entries(categorySpending).map(([name, value]) => ({
            name,
            value,
            fill: name === 'movies' ? '#8884d8' :
                name === 'food' ? '#82ca9d' :
                    '#ffc658'
        }));
    };

    const spendingData = calculateCategorySpending();

    return (
        <div className="spending-charts">
            <h2>Spending Visualization ({timeFrame})</h2>

            <div className="chart-container">
                {/* Pie Chart */}
                <div>
                    <h3>Spending Distribution</h3>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={spendingData}
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
                    <h3>Spending Comparison</h3>
                    <BarChart width={400} height={400} data={spendingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default SpendingChart;