import React, { useState, useRef } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import useGlobalData from '../../zustand/useGlobalData';
import { MdModeEdit } from "react-icons/md";
import RightIcon from '../icons/RightIcon';
import { FaArrowAltCircleRight } from "react-icons/fa";
import useUpdateAboutText from '../../hooks/useUpdateAboutText';
import { useAuthContext } from '../../context/AuthContext';
import useUpdateFullName from '../../hooks/useUpdateFullName';
import User from '../../../../backend/models/user.model';
import useUpdateProfileImage from '../../hooks/useUpdateProfileImage';

const ProfilePage = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const { loading: ladingAboutText, updateAboutText } = useUpdateAboutText();
    const { loading: loadingProfilePic, updateProfilePic } = useUpdateProfileImage();
    const { updateFullName } = useUpdateFullName();
    const { setIsDrowerOpen } = useGlobalData();
    const [aboutText, setAboutText] = useState(authUser?.aboutText);
    const [fullName, setFullName] = useState(authUser?.fullName);
    const [profilePic, setProfilePic] = useState(null);
    const [isAboutEditAble, setIsAboutEditAble] = useState(false);
    const [isFullNameEditable, setIsFullNameEditable] = useState(false);

    const editElement = useRef(null);
    const fullNameElement = useRef(null);
    const profileInputRef = useRef(null);

    const handleArrowBackClick = () => {
        setIsDrowerOpen(false);
    }
    const isOnline = true;

    const handleInput = (event) => {
        setAboutText(event.target.innerText);
    };

    const handleEditAbout = () => {
        setIsAboutEditAble(true);
        // console.log(editElement);
        if (editElement.current) {
            setTimeout(() => {
                editElement.current.focus();
            }, 10);
        }
    }

    const handleEditOkClick = () => {
        console.log(aboutText);
        updateAboutText(aboutText)
        setIsAboutEditAble(false);
    }

    // fullName
    const handleEditFullName = () => {
        setIsFullNameEditable(true);
        if (fullName.current) {
            setTimeout(() => {
                fullName.current.focus();
            }, 10)
        }
    }

    const handleFullNameOkClick = () => {
        updateFullName(fullName);
        setIsFullNameEditable(false);
    }

    const handleImgChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const result = reader.result;
                setProfilePic(result);
                console.log("reader-result", result);
                await updateProfilePic(result); // Move this inside the onload callback
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="w-72 flex flex-col gap-2">
            <div className="flex gap-8 bg-[#008069] p-4 rounded">
                <div className="flex items-center">
                    <FaArrowLeft className="text-white cursor-pointer" onClick={handleArrowBackClick} />
                </div>
                <div className="text-white font-semibold text-xl">Profile</div>
            </div>
            <div className="py-10 flex justify-center bg-[#EFF6FC] rounded">
                <div className={`avatar ${isOnline ? "online" : ""} `}>
                    <div
                        className="w-12 h-12 rounded-full cursor-pointer"
                        onClick={() => profileInputRef.current.click()}
                    >
                        <img src={profilePic || authUser.profilePic} alt="user avatar" />
                    </div>
                </div>
                <input
                    type='file'
                    hidden
                    ref={profileInputRef}
                    onChange={(e) => handleImgChange(e)}
                />
            </div>
            <div className="p-4 flex flex-col gap-2 bg-[#EFF6FC] rounded">
                <h4 className="text-lg font-semibold">Your name</h4>
                <div className="flex justify-between">
                    <input
                        value={fullName}
                        className="w-[70%] border-none outline-none bg-[#EFF6FC]"
                        style={{
                            borderBottom: isFullNameEditable ? "1px solid red" : "",
                        }}
                        readOnly={!isFullNameEditable}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <div>
                        {
                            !isFullNameEditable ?
                                <MdModeEdit
                                    className="text-2xl cursor-pointer"
                                    onClick={() => handleEditFullName()}
                                />
                                :
                                <FaArrowAltCircleRight
                                    className="text-2xl cursor-pointer"
                                    onClick={() => handleFullNameOkClick()}
                                />
                        }
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2 bg-[#EFF6FC] rounded">
                <h4 className="text-lg font-semibold">About</h4>
                <div className="flex justify-between">
                    <input
                        value={aboutText}
                        className="w-[70%] border-none outline-none bg-[#EFF6FC]"
                        style={{
                            borderBottom: isAboutEditAble ? "1px solid red" : "",
                        }}
                        readOnly={!isAboutEditAble}
                        onChange={(e) => setAboutText(e.target.value)}
                    />
                    <div>
                        {
                            !isAboutEditAble ?
                                <MdModeEdit
                                    className="text-2xl cursor-pointer"
                                    onClick={() => handleEditAbout()}
                                />
                                :
                                <FaArrowAltCircleRight
                                    className="text-2xl cursor-pointer"
                                    onClick={() => handleEditOkClick()}
                                />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage