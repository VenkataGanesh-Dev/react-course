import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';



function ChatMessages({ chatMessages }) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
        containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);


    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
        {chatMessages.map((chatMessage) => {
            return (
            <ChatMessage
                message={chatMessage.message}
                sender={chatMessage.sender}
                key={chatMessage.id}
            />
            );
        })}
        </div>
    );
}
export default ChatMessages;  // This is a default export , it is useful if we want to export one thing from a file
