import React, { useState } from 'react';

const groceriesData = [
    {
        id: 1,
        name: 'Milk',
        description: 'Fresh whole milk, 1 gallon',
        price: 3.50
    },
    {
        id: 2,
        name: 'Bread',
        description: 'Whole wheat bread, freshly baked',
        price: 2.75
    },
    {
        id: 3,
        name: 'Eggs',
        description: 'Free-range large eggs, dozen',
        price: 4.25
    },
];

const Groceries = ({ onBuy }) => {
    const [customGrocery, setCustomGrocery] = useState({
        name: '',
        description: '',
        price: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomGrocery(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCustomBuy = () => {
        if (customGrocery.name && customGrocery.description && customGrocery.price) {
            onBuy({
                name: customGrocery.name,
                description: customGrocery.description,
                price: parseFloat(customGrocery.price)
            });

            // Reset form after buying
            setCustomGrocery({
                name: '',
                description: '',
                price: ''
            });
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div>
            <h2>Groceries</h2>

            {/* Custom Grocery Input */}
            <div>
                <h3>Buy a Custom Grocery Item</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Grocery Name"
                    value={customGrocery.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Grocery Description"
                    value={customGrocery.description}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={customGrocery.price}
                    onChange={handleInputChange}
                />
                <button onClick={handleCustomBuy}>Buy Custom Grocery</button>
            </div>

            {/* Existing Groceries List */}
            <h3>Available Groceries</h3>
            {groceriesData.map((grocery) => (
                <div key={grocery.id}>
                    <h3>{grocery.name}</h3>
                    <p>{grocery.description}</p>
                    <p>Price: ${grocery.price}</p>
                    <button onClick={() => onBuy(grocery)}>Buy</button>
                </div>
            ))}
        </div>
    );
};

export default Groceries;