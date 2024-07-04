import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import useConversation from "../../zustand/useConversation";
import SidebarTop from "./SidebarTop";
import useGlobalData from "../../zustand/useGlobalData";
import ProfilePage from "./ProfilePage";

const Sidebar = ({ currentSection, isDrawerOpen }) => {
	return (
		<div className={`bg-[#FFFFFF] border-slate-500 p-4 ${currentSection !== "sidebar" ? "hidden md:flex" : "flex"} flex-col drop-shadow rounded-xl h-full`}>
			{isDrawerOpen ? (
				<ProfilePage />
			) : (
				<div className="flex flex-col h-full">
					<SidebarTop />
					<div className="flex justify-between py-2">
						<div className="px-[4px] py-[2px] rounded-lg bg-gray-200 border border-solid border-black cursor-pointer">Friends</div>
						<div className="px-[4px] py-[2px] rounded-lg bg-gray-200 border border-solid border-black cursor-pointer">Add Friends</div>
						<div className="px-[4px] py-[2px] rounded-lg bg-gray-200 border border-solid border-black cursor-pointer">Requests</div>
					</div>
					<SearchInput />
					<div className="divider px-3"></div>
					<div className="flex-grow overflow-auto">
						<Conversations />
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