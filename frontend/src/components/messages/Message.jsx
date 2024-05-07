import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const formattedTime = extractTime(message.createdAt);
	const { message: messageText, senderId } = message || {};
	const isSender = authUser?._id === senderId;

	const profilePic = isSender ? authUser?.profilePic : selectedConversation?.profilePic;
	const chatPosition = isSender ? 'chat chat-end' : 'chat chat-start';
	const backgroundColor = isSender ? 'bg-blue-500' : '';
	const shouldShake = message.shouldShake ? "shake" : "";
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
			<div className={`chat-bubble min-w-28 ${backgroundColor} ${shouldShake} text-white pb-2 break-words`}>{messageText}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;