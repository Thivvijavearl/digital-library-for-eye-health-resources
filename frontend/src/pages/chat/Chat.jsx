import React, { useState, useEffect } from 'react';
import { BsChatDots } from 'react-icons/bs';
import './Chat.css';

const Chat = () => {
    const [inputText, setInputText] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const savedChatHistory = JSON.parse(localStorage.getItem('chatHistory'));
        if (savedChatHistory) {
            setChatHistory(savedChatHistory);
        }
    }, []);

    const sendMessage = () => {
        if (!inputText.trim() && !selectedOption) return;

        let userMessage = inputText.trim();
        if (selectedOption) {
            userMessage = selectedOption;
        }

        let botReply = "";

        switch (userMessage.toLowerCase()) {
            case "hi":
                botReply = "Hi! how can I help you";
                break;
            case "how to keep eyes healthy":
                botReply = "To keep your eyes healthy, make sure to eat a balanced diet rich in fruits and vegetables, protect your eyes from UV rays by wearing sunglasses, take breaks from screens to prevent digital eye strain, and get regular eye check-ups.";
                break;
            case "what are the common eye problems":
                botReply = "Some common eye problems include myopia (nearsightedness), hyperopia (farsightedness), astigmatism, presbyopia, dry eyes, and eye infections like conjunctivitis.";
                break;
            case "where can I buy glasses online":
                botReply = "There are many online optical stores where you can buy glasses, such as Warby Parker, Zenni Optical, GlassesUSA, and EyeBuyDirect.";
                break;
            case "eye health resources":
                botReply = "For reliable eye health resources, you can visit websites like the American Academy of Ophthalmology (aao.org), National Eye Institute (nei.nih.gov), and Prevent Blindness (preventblindness.org).";
                break;
            case "doubts with doctors":
                botReply = "If you have any doubts or concerns about your eye health, it's best to consult with an eye care professional, such as an optometrist or ophthalmologist. They can provide personalized advice and treatment options.";
                break;
            default:
                botReply = "I'm sorry, I don't understand. Could you please rephrase your question?";
        }

        const updatedChatHistory = [...chatHistory, { user: userMessage, bot: botReply, timestamp: new Date().toLocaleTimeString() }];
        setChatHistory(updatedChatHistory);
        localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));

        setInputText('');
        setSelectedOption('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">
                    <h2>Chat Box</h2>
                </div>
                <div className="chat-history">
                    {chatHistory.map((message, index) => (
                        <div key={index} className={`message ${message.bot ? 'bot' : 'user'}`}>
                            <div className="avatar">
                                {message.bot ? <img src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714953600&semt=ais" alt="Bot Avatar" /> : <img src="https://example.com/user-avatar.png" alt="User Avatar" />}
                            </div>
                            <div className="message-content">
                                <p>{message.bot ? 'Bot: ' + message.bot : 'You: ' + message.user}</p>
                                <span className="timestamp">{message.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={handleKeyPress}
                    />
                    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="">Select an option...</option>
                        <option value="hi">Hi</option>
                        <option value="how to keep eyes healthy">How to keep eyes healthy</option>
                        <option value="what are the common eye problems">What are the common eye problems</option>
                        <option value="where can I buy glasses online">Where can I buy glasses online</option>
                        <option value="eye health resources">Eye health resources</option>
                        <option value="doubts with doctors">Doubts with doctors</option>
                    </select>
                    <button onClick={sendMessage}>
                        <BsChatDots />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
