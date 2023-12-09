import React, { useReducer, useEffect, useState } from 'react';
import { fetchMessages, fetchAddMessage, fetchUsers } from './services';
import reducer, { initialState } from './reducer'; // Ensure these are correctly imported

function Chat() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { messages, users, error } = state;
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        checkForMessages();
    }, []);

    function checkForMessages() {
        fetchUsers()
            .then(data => {
                dispatch({ type: 'UPDATE_USERS', users: data.users });
                return fetchMessages();
            })
            .catch(err => {
                console.error(err);
                dispatch({ type: 'REPORT_ERROR', error: err?.error || 'Error fetching users' });
            })
            .then(data => {
                if (data) {
                    dispatch({ type: 'UPDATE_MESSAGES', messages: data.messagesList });
                    scrollToBottom();
                }
            })
            .catch(err => {
                console.error(err);
                dispatch({ type: 'REPORT_ERROR', error: err?.error || 'Error fetching messages' });
            });
    }

    function scrollToBottom() {
        const scrollDiv = document.querySelector(".messages");
        if (scrollDiv) {
            scrollDiv.scrollTop = scrollDiv.scrollHeight;
        }
    }

    function handleSendMessage() {
        if (!newMessage.trim()) return;
        fetchAddMessage(newMessage) 
            .then(() => {
                setNewMessage('');
                checkForMessages();
            })
            .catch(err => {
                console.error(err);
                dispatch({ type: 'REPORT_ERROR', error: err?.error || 'Error sending message' });
            });
    }

    return (
        <div className="chat-container">
            {error && <div className="error">{error}</div>}
            <div className="users-list">
                <h3>All Users:</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.username} className={user.online ? "active" : ""}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="messages">
                <ol>
                    {messages.map(message => (
                        <li key={message.id}>
                            <div className="message">
                                <span>{message.username.charAt(0)}</span>
                                <div>
                                    <p>{message.username}</p>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                    className="to-send"
                />
                <button onClick={handleSendMessage} className="send-btn">
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;
