import React from 'react'

const FriendRequest = ({ id, name, profilePic, acceptRequest }) => {
    const isOnline = false;

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
                <div class="font-bold text-black text-base overflow-hidden text-ellipsis whitespace-nowrap max-w-[18ch]">
                    {name}
                </div>
                <div className="flex justify-between">
                    <button
                        class="w-[45%] py-[2px] text-center  bg-sky-500 rounded-lg text-lg font-semibold text-white"
                        onClick={acceptRequest}
                    >Confirm</button>
                    <button class="w-[45%] py-[2px] text-center  bg-gray-500 rounded-lg text-lg font-semibold text-white">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default FriendRequest