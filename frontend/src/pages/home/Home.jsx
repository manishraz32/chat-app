import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex h-[450px] sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-[#EFF6FC] p-8 gap-4'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;