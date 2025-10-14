import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock LLM response generation with dynamic suggestions
const generateLLMResponse = (userQuery, purchases, recentQueries) => {
    // const query = userQuery.toLowerCase();

    // Spending analysis helper functions
    const calculateTotalSpending = () => {
        return purchases.reduce((total, purchase) => total + purchase.price, 0);
    };

    const calculateCategorySpending = () => {
        return purchases.reduce((acc, purchase) => {
            acc[purchase.category] = (acc[purchase.category] || 0) + purchase.price;
            return acc;
        }, {});
    };

    const totalSpending = calculateTotalSpending();
    const categorySpending = calculateCategorySpending();

    // Generate a unique suggestion
    const generateUniqueSuggestion = () => {
        const highSpendCategories = Object.entries(categorySpending)
            .filter(([_, amount]) => amount > totalSpending * 0.2)
            .map(([category]) => category);

        return `Here's what I suggest:
- Focus on saving in these high-spend categories: ${highSpendCategories.join(", ")}
- Consider setting aside ${(totalSpending * 0.1).toFixed(2)} this month as savings
- Explore cashback offers on your frequently purchased items`;
    };

    // Avoid repetitive answers
    const lastResponse = recentQueries.slice(-1)[0];
    const uniqueSuggestion = generateUniqueSuggestion();

    if (lastResponse && lastResponse.includes(uniqueSuggestion)) {
        return `It looks like you're asking about similar topics. Have you thought about setting a specific goal for savings or exploring investment options? Let me know how I can assist further!`;
    }

    return uniqueSuggestion;
};

const FinancialLLMChat = ({ purchases }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! I'm Gemini, your financial assistant. Ask me about your spending or savings strategies."
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [recentQueries, setRecentQueries] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        // Add user message
        const userMessage = { role: 'user', content: inputMessage };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);

        // Generate LLM response
        const llmResponse = generateLLMResponse(inputMessage, purchases, recentQueries);
        const assistantMessage = { role: 'assistant', content: llmResponse };

        // Update messages and recent queries
        setMessages([...updatedMessages, assistantMessage]);
        setRecentQueries([...recentQueries, llmResponse]);
        setInputMessage('');
    };

    return (
        <div className="financial-llm-chat">
            <header>
                <h1>Gemini Financial Assistant</h1>
                <nav>
                    <button onClick={() => navigate('/')}>Back to Dashboard</button>
                </nav>
            </header>

            <div className="chat-container">
                <div className="messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.role}`}
                        >
                            {message.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="input-area">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask a financial question..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>

            <style jsx>{`
                .financial-llm-chat {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .chat-container {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    height: 500px;
                    display: flex;
                    flex-direction: column;
                }
                .messages {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: 20px;
                }
                .message {
                    margin-bottom: 10px;
                    padding: 10px;
                    border-radius: 5px;
                }
                .message.user {
                    background-color: #e6f2ff;
                    text-align: right;
                }
                .message.assistant {
                    background-color: #f0f0f0;
                }
                .input-area {
                    display: flex;
                    padding: 10px;
                    border-top: 1px solid #ddd;
                }
                .input-area input {
                    flex-grow: 1;
                    margin-right: 10px;
                    padding: 10px;
                }
            `}</style>
        </div>
    );
};

export default FinancialLLMChat;
