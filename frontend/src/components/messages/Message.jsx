import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
const Message = ({message}) => {
	const { authUser } = useAuthContext();
	const {selectedConversation} = useConversation();
	const {message: messageText,senderId} = message || {};
	const isSender = authUser?._id === senderId;

	const profilePic = isSender ? authUser?.profilePic :  selectedConversation?.profilePic;
	const chatPosition = isSender ? 'chat chat-end' : 'chat chat-start';
    const backgroundColor = isSender ? 'bg-blue-500' : '';
	const shouldShake = message.shouldShake ? "shake" : "";
	console.log("shake message ", message);
	return (
		<div className={`${chatPosition}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img 
						alt='profile-profilePic'
						src={profilePic}
					/>
				</div>
			</div>
			<div className={`chat-bubble min-w-[300px] ${backgroundColor} ${shouldShake} text-white pb-2 break-words`}>{ messageText }</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>02-05-2024</div>
		</div>
	);
};
export default Message;