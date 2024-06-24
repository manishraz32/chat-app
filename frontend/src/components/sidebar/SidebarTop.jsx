import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import useGlobalData from '../../zustand/useGlobalData';


const SidebarTop = () => {
    const { setIsDrowerOpen } = useGlobalData();
    const isOnline = "online";
    const handleSettingClick = () => {
        setIsDrowerOpen(true);
    }
    return (
        <div class="flex justify-between h-20 p-2 bg-[#EFF6FC] rounded mb-4">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105561/126045782-vector-illustration-of-avatar-and-dummy-sign-collection-of-avatar-and-image-stock-symbol-for-web.jpg" alt="user avatar" />
                </div>
            </div>
            <div class="flex items-center">
                <IoSettingsOutline
                    class="cursor-pointer "
                    onClick={handleSettingClick}
                />
            </div>
        </div>
    )
}

export default SidebarTop