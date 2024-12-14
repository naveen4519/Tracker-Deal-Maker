import React, { useState } from 'react';
import { PlusCircle, ShoppingBasket } from 'lucide-react';
import '../App.css'

const groceriesData = [
    {
        id: 1,
        name: 'Milk',
        description: 'Fresh whole milk, 1 gallon',
        price: 3.50,
        icon: '🥛'
    },
    {
        id: 2,
        name: 'Bread',
        description: 'Whole wheat bread, freshly baked',
        price: 2.75,
        icon: '🍞'
    },
    {
        id: 3,
        name: 'Eggs',
        description: 'Free-range large eggs, dozen',
        price: 4.25,
        icon: '🥚'
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
        <div className="category-page">
            <h2><ShoppingBasket size={24} /> Groceries</h2>

            {/* Custom Grocery Input */}
            <div className="custom-input-section">
                <h3><PlusCircle size={20} /> Buy a Custom Grocery Item</h3>
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
                <button 
                    className="buy-btn" 
                    onClick={handleCustomBuy}
                >
                    <PlusCircle size={16} /> Buy Custom Grocery
                </button>
            </div>

            {/* Existing Groceries List */}
            <h3>Available Groceries</h3>
            <div className="item-list">
                {groceriesData.map((grocery) => (
                    <div key={grocery.id} className="item-card">
                        <h3>{grocery.icon} {grocery.name}</h3>
                        <p>{grocery.description}</p>
                        <p>Price: ${grocery.price}</p>
                        <button 
                            className="buy-btn" 
                            onClick={() => onBuy(grocery)}
                        >
                            <ShoppingBasket size={16} /> Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Groceries;