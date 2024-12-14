import React, { useState, useEffect } from 'react';
import { PlusCircle, ShoppingBasket } from 'lucide-react';
import '../App.css';

const Groceries = ({ onBuy }) => {
    const [groceryItems, setGroceryItems] = useState([]);
    const [customGrocery, setCustomGrocery] = useState({
        name: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        // Fetch grocery data from backend
        fetch('http://localhost:5000/groceries')  // Adjust the URL if necessary
            .then((response) => response.json())
            .then((data) => setGroceryItems(data))
            .catch((error) => console.error('Error fetching groceries:', error));
    }, []);

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
                {groceryItems.length > 0 ? (
                    groceryItems.map((grocery) => (
                        <div key={grocery._id} className="item-card">
                            <h3>{grocery.icon} {grocery.name}</h3> {/* Display icon along with name */}
                            <p>{grocery.description}</p>
                            <p>Price: ${grocery.price}</p>
                            <button
                                className="buy-btn"
                                onClick={() => onBuy(grocery)}
                            >
                                <ShoppingBasket size={16} /> Buy
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading groceries...</p>
                )}
            </div>
        </div>
    );
};

export default Groceries;
