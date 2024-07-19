import Conversations from "./Conversations";
import FriendRequests from "./FriendRequests";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import useConversation from "../../zustand/useConversation";
import SidebarTop from "./SidebarTop";
import useGlobalData from "../../zustand/useGlobalData";
import ProfilePage from "./ProfilePage";
import AddFriends from "./AddFriends";

const Sidebar = ({ currentSection }) => {
	const { isDrowerOpen, setIsDrowerOpen, selectedTab, setSelectedTab } = useGlobalData((state) => ({
        selectedTab: state.selectedTab,
        setSelectedTab: state.setSelectedTab,
		isDrowerOpen: state.isDrowerOpen,
		setIsDrowerOpen: state.setIsDrowerOpen
    }));
	return (
		<div className={`bg-[#FFFFFF] border-slate-500 p-4 ${currentSection !== "sidebar" ? "hidden md:flex" : "flex"} flex-col drop-shadow rounded-xl h-full`}>
			{isDrowerOpen ? (
				<ProfilePage />
			) : (
				<div className="flex flex-col h-full">
					<SidebarTop />
					<div className="flex justify-between py-2">
						<div
							className={`px-[4px] py-[2px] rounded-lg border border-solid border-black cursor-pointer ${selectedTab === 'friends' ? 'bg-blue-500' : 'bg-gray-200'}`}
							onClick={() => setSelectedTab('friends')}
						>
							Friends
						</div>
						<div
							className={`px-[4px] py-[2px] rounded-lg border border-solid border-black cursor-pointer ${selectedTab === 'addFriends' ? 'bg-blue-500' : 'bg-gray-200'}`}
							onClick={() => setSelectedTab('addFriends')}
						>
							Add Friends
						</div>
						<div
							className={`px-[4px] py-[2px] rounded-lg  border border-solid border-black cursor-pointer ${selectedTab === 'requests' ? 'bg-blue-500' : 'bg-gray-200'}`}
							onClick={() => setSelectedTab('requests')}
						>
							Requests
						</div>
					</div>
					<SearchInput />
					<div className="divider px-3"></div>
					<div className="flex-grow overflow-auto">
						{selectedTab === 'friends' && <Conversations />}
						{selectedTab === 'addFriends' && <AddFriends />}
						{selectedTab === 'requests' && <FriendRequests />}
					</div>
					<div className="mt-4">
						<LogoutButton />
					</div>
				</div>
			)}
		</div>
	);
};

export default Sidebar;