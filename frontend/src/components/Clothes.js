import React, { useState } from 'react';

const clothesData = [
    {
        id: 1,
        name: 'T-Shirt',
        description: 'Comfortable cotton crew neck t-shirt',
        price: 19.99
    },
    {
        id: 2,
        name: 'Jeans',
        description: 'Classic blue denim straight-leg jeans',
        price: 49.99
    },
    {
        id: 3,
        name: 'Hoodie',
        description: 'Warm and cozy pullover hoodie',
        price: 39.50
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
        <div>
            <h2>Clothes</h2>

            {/* Custom Clothing Input */}
            <div>
                <h3>Buy a Custom Clothing Item</h3>
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
                <button onClick={handleCustomBuy}>Buy Custom Clothing</button>
            </div>

            {/* Existing Clothes List */}
            <h3>Available Clothes</h3>
            {clothesData.map((clothing) => (
                <div key={clothing.id}>
                    <h3>{clothing.name}</h3>
                    <p>{clothing.description}</p>
                    <p>Price: ${clothing.price}</p>
                    <button onClick={() => onBuy(clothing)}>Buy</button>
                </div>
            ))}
        </div>
    );
};

export default Clothes;