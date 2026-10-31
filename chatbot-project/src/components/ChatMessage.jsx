import RobotProfileImage from '../assets/robot.png'; // RobotProfileImage  is ano {} that is   default export
import UserProfileImage from '../assets/user.png';  // vite gives us file path like this '/src/assets/user.png'
// ./assets/user.png tells that single(.) is searching in  inner components
// ../assets/user.png tells that double(..) is searching in  outer components
import './ChatMessage.css';


// we re not using thiS component In this file , To fix this at the front ,We are going to export this component so it can be used in other files
export function ChatMessage({ message, sender }) {
// const message = props.message;
// const sender = props.sender;
// const { message, sender } = props;

/*
if (sender === 'robot') {
    return (
    <div>
        <img src="robot.png" width="50" />
        {message}
    </div>
    );
}
*/

return (
    <div className={
    sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
    {sender === 'robot' && (  // {RobotProfileImage} insert the variable from import section
        <img src={RobotProfileImage} className="chat-message-profile" />
    )}
    <div className="chat-message-text">
        {message}
    </div>
    {sender === 'user' && ( 
        <img src={UserProfileImage}className="chat-message-profile" />
    )}
    </div>
);
}
