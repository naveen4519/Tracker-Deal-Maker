import React, { useState, useEffect } from 'react';
import { PlusCircle, ShoppingBag } from 'lucide-react';
import '../App.css';

const Clothes = ({ onBuy }) => {
    const [clothes, setClothes] = useState([]);
    const [customClothing, setCustomClothing] = useState({
        name: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        // Fetch clothes data from backend
        fetch('http://localhost:5000/clothes')  // Adjust the URL if necessary
            .then((response) => response.json())
            .then((data) => setClothes(data))
            .catch((error) => console.error('Error fetching clothes:', error));
    }, []);

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
                {clothes.length > 0 ? (
                    clothes.map((clothing) => (
                        <div key={clothing._id} className="item-card">
                            <h3>{clothing.icon} {clothing.name}</h3> {/* Display icon along with name */}
                            <p>{clothing.description}</p>
                            <p>Price: ${clothing.price}</p>
                            <button
                                className="buy-btn"
                                onClick={() => onBuy(clothing)}
                            >
                                <ShoppingBag size={16} /> Buy
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading clothes...</p>
                )}
            </div>
        </div>
    );
};

export default Clothes;
