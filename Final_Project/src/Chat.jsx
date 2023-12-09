import React, { useReducer, useEffect, useState } from 'react';
import { fetchMessages, fetchAddMessage, fetchUsers } from './services';
import reducer, { initialState } from './reducer'; 
import './Chat.css';

function Chat() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        checkForMessages();
    }, []);

    function checkForMessages() {
        fetchUsers()
          .then(data => {
            dispatch({ type: 'UPDATE_USERS', users: data.users || [] });
          })
          .catch(err => {
            dispatch({ type: 'REPORT_ERROR', error: err.error || 'Error fetching users' });
          });
    
        fetchMessages()
          .then(data => {
            dispatch({ type: 'UPDATE_MESSAGES', messages: data.messagesList || [] });
            scrollToBottom();
          })
          .catch(err => {
            dispatch({ type: 'REPORT_ERROR', error: err.error || 'Error fetching messages' });
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
            <h2>Chat with Friends</h2>
            <p>Connect and share with your friends about your latest gaming adventures!</p>
            {state.error && <div className="error">{state.error}</div>}
            <div className="users-list">
                <h3>All Users:</h3>
                <ul>
                    {state.users.map(user => (
                        <li key={user.username}>
                            <div className={`user ${user.online ? "active" : ""}`}>
                                <span>{user.username.charAt(0)}</span>
                                <p>{user.username}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="messages">
                <ol>
                    {state.messages.map(message => (
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
