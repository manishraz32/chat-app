const Message = () => {

	return (
		<div className={`chat`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' />
				</div>
			</div>
			<div className={`chat-bubble text-white  pb-2`}>hello everyone</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>02-05-2024</div>
		</div>
	);
};
export default Message;