import React, { useState } from 'react';
import { PlusCircle, ShoppingBag } from 'lucide-react';
import '../App.css'

const clothesData = [
    {
        id: 1,
        name: 'T-Shirt',
        description: 'Comfortable cotton crew neck t-shirt',
        price: 19.99,
        icon: '👕'
    },
    {
        id: 2,
        name: 'Jeans',
        description: 'Classic blue denim straight-leg jeans',
        price: 49.99,
        icon: '👖'
    },
    {
        id: 3,
        name: 'Hoodie',
        description: 'Warm and cozy pullover hoodie',
        price: 39.50,
        icon: '🧥'
    },
];

const Clothes = ({ onBuy }) => {
    const [customClothing, setCustomClothing] = useState({
        name: '',
        description: '',
        price: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomClothing(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCustomBuy = () => {
        if (customClothing.name && customClothing.description && customClothing.price) {
            onBuy({
                name: customClothing.name,
                description: customClothing.description,
                price: parseFloat(customClothing.price)
            });

            // Reset form after buying
            setCustomClothing({
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
            <h2><ShoppingBag size={24} /> Clothes</h2>

            {/* Custom Clothing Input */}
            <div className="custom-input-section">
                <h3><PlusCircle size={20} /> Buy a Custom Clothing Item</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Clothing Name"
                    value={customClothing.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Clothing Description"
                    value={customClothing.description}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={customClothing.price}
                    onChange={handleInputChange}
                />
                <button
                    className="buy-btn"
                    onClick={handleCustomBuy}
                >
                    <PlusCircle size={16} /> Buy Custom Clothing
                </button>
            </div>

            {/* Existing Clothes List */}
            <h3>Available Clothes</h3>
            <div className="item-list">
                {clothesData.map((clothing) => (
                    <div key={clothing.id} className="item-card">
                        <h3>{clothing.icon} {clothing.name}</h3>
                        <p>{clothing.description}</p>
                        <p>Price: ${clothing.price}</p>
                        <button
                            className="buy-btn"
                            onClick={() => onBuy(clothing)}
                        >
                            <ShoppingBag size={16} /> Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clothes;