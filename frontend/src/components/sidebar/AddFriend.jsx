import React from 'react'
import useSendRequest from '../../hooks/useSendRequest';

const AddFriend = ({userId, fullName, isOnline, profilePic, handleAddFriendClick = () => {}}) => {
    const {sendRequest, loading} = useSendRequest();
    return (
        <div className="flex gap-2 items-center">
            <div className="h-full flex justify-center items-center">
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src={profilePic} alt="user avatar" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1 flex-1 pr-1 max-w-[228px]">
                <div className="font-bold text-black text-normal">{fullName}</div>
                <button 
                    className="w-full py-[2px] text-center  bg-sky-500 rounded-lg text-lg font-semibold text-white"
                    onClick = {() => handleAddFriendClick(userId)}
                >
                    Add Friend
                </button>
            </div>
        </div>
    )
}

export default AddFriend