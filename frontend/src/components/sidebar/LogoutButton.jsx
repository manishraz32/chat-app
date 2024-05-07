import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";


const LogoutButton = () => {
	const { loading, logout } = useLogout();

	const handleLogoutClick = async () => {
		await logout();
	}

	return (
		<div className='mt-auto py-2'>
			{!loading ? (
				<BiLogOut
					className='w-6 h-6  cursor-pointer text-sky-500'
					onClick={handleLogoutClick}
				/>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;