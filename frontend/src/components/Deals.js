import React, { useState, useEffect } from 'react';
import { Tag } from 'lucide-react';
import '../App.css';

const Deals = ({ onBuy }) => {
    const [dealItems, setDealItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [purchaseSuccessItemId, setPurchaseSuccessItemId] = useState(null);  // Track the purchased item ID

    useEffect(() => {
        // Fetch deals data from backend
        fetch('http://localhost:5000/deals')  // Adjust the URL if necessary
            .then((response) => response.json())
            .then((data) => {
                setDealItems(data);
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch((error) => {
                setError('Error fetching deals: ' + error.message);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter deals based on the search query
    const filteredDeals = dealItems.filter((deal) =>
        deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="category-page">
            <h2><Tag size={24} /> Deals and Offers</h2>

            {/* Search Input */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search Deals..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {/* Loading state */}
            {loading && <p>Loading deals...</p>}

            {/* Error state */}
            {error && <p>{error}</p>}

            {/* Filtered Deals List */}
            <h3>Available Deals</h3>
            <div className="item-list">
                {filteredDeals.length > 0 ? (
                    filteredDeals.map((deal) => (
                        <div key={deal._id} className="item-card">
                            <h3>{deal.icon} {deal.name}</h3>
                            <p>{deal.description}</p>
                            <div className="price-comparison">
                                <p><s>Actual Price: ${deal.actualPrice}</s></p>
                                <p>Offer Price: <strong>${deal.offerPrice}</strong></p>
                                <p className="discount">
                                    Save ${(deal.actualPrice - deal.offerPrice).toFixed(2)}
                                    ({Math.round((1 - deal.offerPrice / deal.actualPrice) * 100)}% OFF)
                                </p>
                            </div>
                            <button
                                className="buy-btn"
                                onClick={() => {
                                    onBuy({
                                        name: deal.name,
                                        description: deal.description,
                                        price: deal.offerPrice
                                    });

                                    // Set the purchased item ID for the success message
                                    setPurchaseSuccessItemId(deal._id);
                                    setTimeout(() => setPurchaseSuccessItemId(null), 500); // Hide after 0.5 seconds
                                }}
                            >
                                <Tag size={16} /> Buy Deal
                            </button>

                            {/* Display Success Message only for the purchased item */}
                            {purchaseSuccessItemId === deal._id && (
                                <div className="success-message">
                                    Successfully Purchased!
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No deals found for your search.</p>
                )}
            </div>
        </div>
    );
};

export default Deals;