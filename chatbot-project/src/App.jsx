import { useState, useEffect, useRef} from 'react' // this is from node modules only useState feature
import { ChatInput } from './components/ChatInput' // Vite adds .js or .jsx automatically we dont have to add
// named export - Using curly barckets {} like this { ChatInput } this is called a named export
// default export -, We can just type a name   ChatMessages    without curly brackets {}
import ChatMessages from "./components/ChatMessages";
import './App.css'

      
function App() {
      const [chatMessages, setChatMessages] = useState([{
        message: 'hello chatbot',
        sender: 'user',
        id: 'id1'
      }, {
        message: 'Hello! How can I help you?',
        sender: 'robot',
        id: 'id2'
      }, {
        message: 'can you get me todays date?',
        sender: 'user',
        id: 'id3'
      }, {
        message: 'Today is September 27',
        sender: 'robot',
        id: 'id4'
      }]);
      // const [chatMessages, setChatMessages] = array;
      // const chatMessages = array[0];
      // const setChatMessages = array[1];

      return (
        <div className="app-container">
          <ChatMessages
            chatMessages={chatMessages}
          />
          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        </div>
      );
    }


export default App
